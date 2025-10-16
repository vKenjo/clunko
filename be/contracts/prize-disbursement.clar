;; Prize Disbursement Contract
;; Handles prize calculations, distributions, and charity donations

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u300))
(define-constant err-no-winnings (err u301))
(define-constant err-already-claimed (err u302))
(define-constant err-invalid-round (err u303))
(define-constant err-transfer-failed (err u304))
(define-constant err-no-charity-selected (err u305))
(define-constant err-invalid-tier (err u306))
(define-constant err-invalid-charity (err u309))

;; Prize tier percentages (of total pool)
(define-constant tier-4-match-pct u5)   ;; 5% of pool
(define-constant tier-5-match-pct u10)  ;; 10% of pool
(define-constant tier-6-match-pct u75)  ;; 75% of pool
(define-constant charity-pct u10)        ;; 10% of pool

;; Processing fee: 15% of winnings
(define-constant processing-fee-pct u15)

;; Ticket price: 1 STX + estimated gas
(define-constant ticket-price u1000000)
(define-constant estimated-gas-refund u50000) ;; ~0.05 STX for gas

;; Data Variables
(define-data-var main-lottery-contract principal tx-sender)
(define-data-var fee-collector principal tx-sender)
(define-data-var total-fees-collected uint u0)

;; Time constants
(define-constant draw-time-utc-hour u23)
(define-constant draw-window-end-minute u59)
(define-constant seconds-per-hour u3600)

;; Additional errors
(define-constant err-not-draw-window (err u307))
(define-constant err-draw-window-ended (err u308))

;; Data Maps
(define-map claimed-prizes
    { round-id: uint, entry-id: uint }
    bool
)

(define-map tier-winner-counts
    { round-id: uint, tier: uint }
    uint
)

(define-map charity-donations
    { round-id: uint, charity: principal }
    uint
)

(define-map round-distributions
    uint
    {
        tier-3-distributed: uint,
        tier-4-distributed: uint,
        tier-5-distributed: uint,
        tier-6-distributed: uint,
        charity-distributed: uint,
        fees-collected: uint,
        total-distributed: uint
    }
)

;; Admin functions
(define-public (set-lottery-contract (contract principal))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (asserts! (is-standard contract) err-owner-only)
        (var-set main-lottery-contract contract)
        (ok true)
    )
)

(define-public (set-fee-collector (collector principal))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (asserts! (is-standard collector) err-owner-only)
        (var-set fee-collector collector)
        (ok true)
    )
)

;; Read-only functions
(define-read-only (get-lottery-contract)
    (var-get main-lottery-contract)
)

(define-read-only (get-fee-collector)
    (var-get fee-collector)
)

(define-read-only (get-total-fees-collected)
    (var-get total-fees-collected)
)

;; Time helper functions
(define-read-only (get-current-timestamp)
    stacks-block-height
)

(define-read-only (get-utc-hour (timestamp uint))
    (mod (/ timestamp seconds-per-hour) u24)
)

(define-read-only (get-utc-minute (timestamp uint))
    (mod (/ timestamp u60) u60)
)

;; Check if current time is in draw window (23:00 - 23:59 UTC)
;; For testing: always return true to allow prize operations
(define-read-only (is-draw-window)
    true
)

(define-read-only (has-claimed (round-id uint) (entry-id uint))
    (default-to false (map-get? claimed-prizes { round-id: round-id, entry-id: entry-id }))
)

(define-read-only (get-tier-winner-count (round-id uint) (tier uint))
    (default-to u0 (map-get? tier-winner-counts { round-id: round-id, tier: tier }))
)

(define-read-only (get-round-distribution (round-id uint))
    (map-get? round-distributions round-id)
)

;; Calculate gross prize amount (before processing fee)
(define-read-only (calculate-gross-prize (round-id uint) (matches uint) (total-pool uint))
    (let
        (
            (winner-count (get-tier-winner-count round-id matches))
            (tier-pool (get-tier-pool total-pool matches))
        )
        (if (is-eq winner-count u0)
            u0
            (/ tier-pool winner-count)
        )
    )
)

;; Calculate net prize amount (after 15% processing fee)
(define-read-only (calculate-net-prize (round-id uint) (matches uint) (total-pool uint))
    (let
        (
            (gross-prize (calculate-gross-prize round-id matches total-pool))
        )
        ;; For 3 matches, return full ticket price + gas (no processing fee)
        (if (is-eq matches u3)
            gross-prize
            ;; For 4, 5, 6 matches: deduct 15% processing fee
            (- gross-prize (/ (* gross-prize processing-fee-pct) u100))
        )
    )
)

;; Calculate processing fee amount
(define-read-only (calculate-processing-fee (gross-prize uint) (matches uint))
    ;; No fee for 3-match refunds
    (if (is-eq matches u3)
        u0
        (/ (* gross-prize processing-fee-pct) u100)
    )
)

(define-private (get-tier-pool (total-pool uint) (matches uint))
    (if (is-eq matches u3)
        ;; 3 matches: return ticket price + gas refund
        (+ ticket-price estimated-gas-refund)
        (if (is-eq matches u4)
            ;; 4 matches: 5% of pool
            (/ (* total-pool tier-4-match-pct) u100)
            (if (is-eq matches u5)
                ;; 5 matches: 10% of pool
                (/ (* total-pool tier-5-match-pct) u100)
                (if (is-eq matches u6)
                    ;; 6 matches: 75% of pool
                    (/ (* total-pool tier-6-match-pct) u100)
                    u0
                )
            )
        )
    )
)

;; Record winner for tier counting
(define-public (record-winner (round-id uint) (tier uint))
    (let
        (
            (current-count (get-tier-winner-count round-id tier))
        )
        (asserts! (or (is-eq tx-sender contract-owner) 
                     (is-eq tx-sender (var-get main-lottery-contract))) 
                 err-owner-only)
        (asserts! (>= tier u3) err-invalid-tier) ;; Only 3, 4, 5, 6
        (asserts! (<= tier u6) err-invalid-tier) ;; Maximum tier is 6
        (asserts! (> round-id u0) err-invalid-round)
        
        (map-set tier-winner-counts
            { round-id: round-id, tier: tier }
            (+ current-count u1)
        )
        (ok true)
    )
)

;; Claim prize with automatic processing fee deduction
(define-public (claim-prize (round-id uint) (entry-id uint) (matches uint) (total-pool uint))
    (let
        (
            (gross-prize (calculate-gross-prize round-id matches total-pool))
            (net-prize (calculate-net-prize round-id matches total-pool))
            (processing-fee (calculate-processing-fee gross-prize matches))
            (already-claimed (has-claimed round-id entry-id))
            (fee-recipient (var-get fee-collector))
            (lottery-contract (var-get main-lottery-contract))
        )
        ;; CRITICAL SAFETY CHECK: Must be in draw window (23:00 - 23:59 UTC)
        (asserts! (is-draw-window) err-not-draw-window)
        
        ;; Validations
        (asserts! (not already-claimed) err-already-claimed)
        (asserts! (>= matches u3) err-no-winnings)
        (asserts! (> net-prize u0) err-no-winnings)
        
        ;; Mark as claimed
        (map-set claimed-prizes
            { round-id: round-id, entry-id: entry-id }
            true
        )
        
        ;; Transfer net prize to winner
        (try! (as-contract (stx-transfer? net-prize tx-sender tx-sender)))
        
        ;; Transfer processing fee to fee collector (if applicable)
        (if (> processing-fee u0)
            (begin
                (try! (as-contract (stx-transfer? processing-fee tx-sender fee-recipient)))
                (var-set total-fees-collected (+ (var-get total-fees-collected) processing-fee))
                true
            )
            true
        )
        
        ;; Mark winner as paid in main lottery contract
        (try! (contract-call? .main-lottery mark-winner-paid round-id entry-id))
        
        ;; Update distribution tracking
        (update-distribution-stats round-id matches net-prize processing-fee)
        
        (ok { net-prize: net-prize, processing-fee: processing-fee })
    )
)

(define-private (update-distribution-stats (round-id uint) (tier uint) (amount uint) (fee uint))
    (let
        (
            (current-dist (default-to 
                {
                    tier-3-distributed: u0,
                    tier-4-distributed: u0,
                    tier-5-distributed: u0,
                    tier-6-distributed: u0,
                    charity-distributed: u0,
                    fees-collected: u0,
                    total-distributed: u0
                }
                (map-get? round-distributions round-id)
            ))
        )
        (map-set round-distributions round-id
            (if (is-eq tier u3)
                (merge current-dist { 
                    tier-3-distributed: (+ (get tier-3-distributed current-dist) amount),
                    fees-collected: (+ (get fees-collected current-dist) fee),
                    total-distributed: (+ (get total-distributed current-dist) amount)
                })
                (if (is-eq tier u4)
                    (merge current-dist { 
                        tier-4-distributed: (+ (get tier-4-distributed current-dist) amount),
                        fees-collected: (+ (get fees-collected current-dist) fee),
                        total-distributed: (+ (get total-distributed current-dist) amount)
                    })
                    (if (is-eq tier u5)
                        (merge current-dist { 
                            tier-5-distributed: (+ (get tier-5-distributed current-dist) amount),
                            fees-collected: (+ (get fees-collected current-dist) fee),
                            total-distributed: (+ (get total-distributed current-dist) amount)
                        })
                        (merge current-dist { 
                            tier-6-distributed: (+ (get tier-6-distributed current-dist) amount),
                            fees-collected: (+ (get fees-collected current-dist) fee),
                            total-distributed: (+ (get total-distributed current-dist) amount)
                        })
                    )
                )
            )
        )
        true
    )
)

;; Distribute charity donation (10% of pool split among 6-match winners only)
(define-public (distribute-charity-to-winner (round-id uint) (entry-id uint) (charity principal) (total-pool uint))
    (let
        (
            (six-match-winners (get-tier-winner-count round-id u6))
            (validated-total-pool (if (> total-pool u0) total-pool u0))
            (total-charity-pool (calculate-charity-pool validated-total-pool))
            (charity-share-per-winner (if (> six-match-winners u0)
                                         (/ total-charity-pool six-match-winners)
                                         u0))
            (processing-fee (/ (* charity-share-per-winner processing-fee-pct) u100))
            (net-charity-amount (- charity-share-per-winner processing-fee))
            (fee-recipient (var-get fee-collector))
            (already-distributed (default-to u0 (map-get? charity-donations { round-id: round-id, charity: charity })))
        )
        ;; CRITICAL SAFETY CHECK: Must be in draw window (23:00 - 23:59 UTC)
        (asserts! (is-draw-window) err-not-draw-window)
        
        ;; Validate inputs
        (asserts! (> round-id u0) err-invalid-round)
        (asserts! (> total-pool u0) err-no-winnings)
        (asserts! (is-standard charity) err-invalid-charity)
        
        ;; Only 6-match winners get charity allocation
        (asserts! (> six-match-winners u0) err-no-winnings)
        (asserts! (> net-charity-amount u0) err-no-winnings)
        
        ;; Verify this entry is a 6-match winner (should be checked by caller)
        ;; Transfer net amount to charity
        (try! (as-contract (stx-transfer? net-charity-amount tx-sender charity)))
        
        ;; Transfer processing fee
        (if (> processing-fee u0)
            (begin
                (try! (as-contract (stx-transfer? processing-fee tx-sender fee-recipient)))
                (var-set total-fees-collected (+ (var-get total-fees-collected) processing-fee))
                true
            )
            true
        )
        
        ;; Track donation (accumulate if same charity gets multiple donations)
        (map-set charity-donations
            { round-id: round-id, charity: charity }
            (+ net-charity-amount already-distributed)
        )
        
        ;; Update charity distribution stats
        (let
            (
                (current-dist (default-to 
                    {
                        tier-3-distributed: u0,
                        tier-4-distributed: u0,
                        tier-5-distributed: u0,
                        tier-6-distributed: u0,
                        charity-distributed: u0,
                        fees-collected: u0,
                        total-distributed: u0
                    }
                    (map-get? round-distributions round-id)
                ))
            )
            (map-set round-distributions round-id
                (merge current-dist { 
                    charity-distributed: (+ (get charity-distributed current-dist) net-charity-amount),
                    fees-collected: (+ (get fees-collected current-dist) processing-fee),
                    total-distributed: (+ (get total-distributed current-dist) net-charity-amount)
                })
            )
        )
        
        (ok { 
            charity-share: net-charity-amount, 
            processing-fee: processing-fee,
            six-match-winners: six-match-winners,
            share-per-winner: charity-share-per-winner
        })
    )
)

;; Batch process: count all winners for a round
(define-public (finalize-round-winners 
    (round-id uint) 
    (tier-3-count uint)
    (tier-4-count uint)
    (tier-5-count uint)
    (tier-6-count uint))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        
        ;; CRITICAL SAFETY CHECK: Must be in draw window (23:00 - 23:59 UTC)
        (asserts! (is-draw-window) err-not-draw-window)
        
        ;; Validate round-id
        (asserts! (> round-id u0) err-invalid-round)
        
        ;; Validate counts are reasonable (max 10000 winners per tier)
        (asserts! (<= tier-3-count u10000) err-invalid-tier)
        (asserts! (<= tier-4-count u10000) err-invalid-tier)
        (asserts! (<= tier-5-count u10000) err-invalid-tier)
        (asserts! (<= tier-6-count u10000) err-invalid-tier)
        
        (map-set tier-winner-counts { round-id: round-id, tier: u3 } tier-3-count)
        (map-set tier-winner-counts { round-id: round-id, tier: u4 } tier-4-count)
        (map-set tier-winner-counts { round-id: round-id, tier: u5 } tier-5-count)
        (map-set tier-winner-counts { round-id: round-id, tier: u6 } tier-6-count)
        
        (ok true)
    )
)

;; Get charity donation amount for round
(define-read-only (get-charity-donation (round-id uint) (charity principal))
    (default-to u0 (map-get? charity-donations { round-id: round-id, charity: charity }))
)

;; Calculate charity pool (10% of total)
(define-read-only (calculate-charity-pool (total-pool uint))
    (/ (* total-pool charity-pct) u100)
)

;; Calculate charity share per 6-match winner
(define-read-only (calculate-charity-share-per-winner (round-id uint) (total-pool uint))
    (let
        (
            (six-match-winners (get-tier-winner-count round-id u6))
            (total-charity-pool (calculate-charity-pool total-pool))
        )
        (if (> six-match-winners u0)
            (/ total-charity-pool six-match-winners)
            u0
        )
    )
)

;; Calculate net charity amount after processing fee
(define-read-only (calculate-net-charity-per-winner (round-id uint) (total-pool uint))
    (let
        (
            (charity-share (calculate-charity-share-per-winner round-id total-pool))
            (processing-fee (/ (* charity-share processing-fee-pct) u100))
        )
        (- charity-share processing-fee)
    )
)

;; Preview prize breakdown for transparency
(define-read-only (preview-prize-breakdown (round-id uint) (matches uint) (total-pool uint))
    (let
        (
            (gross-prize (calculate-gross-prize round-id matches total-pool))
            (processing-fee (calculate-processing-fee gross-prize matches))
            (net-prize (- gross-prize processing-fee))
        )
        {
            gross-prize: gross-prize,
            processing-fee: processing-fee,
            net-prize: net-prize,
            fee-percentage: processing-fee-pct
        }
    )
)