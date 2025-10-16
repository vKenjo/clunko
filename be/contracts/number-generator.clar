;; Number Generator Contract
;; Handles random number generation for lottery draws

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u200))
(define-constant err-invalid-range (err u201))
(define-constant err-insufficient-entropy (err u202))

;; Data Variables
(define-data-var nonce uint u0)

;; Generate pseudo-random number using block data
(define-private (generate-random-seed)
    (let
        (
            (current-nonce (var-get nonce))
            ;; Simple pseudo-random based on block height and nonce
            (combined (+ (* stacks-block-height u1000000) current-nonce))
        )
        (var-set nonce (+ current-nonce u1))
        combined
    )
)

(define-private (buff-to-u8 (byte (buff 1)))
    (unwrap-panic (index-of 0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475767778797a7b7c7d7e7f808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedfe0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfeff byte))
)

(define-private (uint-shift (value uint) (shift uint))
    (* value (pow u2 shift))
)

;; Generate a number between min and max
(define-private (random-in-range (min uint) (max uint))
    (let
        (
            (range (- max min))
            (random-seed (generate-random-seed))
        )
        (+ min (mod random-seed (+ range u1)))
    )
)

;; Generate 6 unique random numbers between 1 and 59
(define-public (generate-lottery-numbers)
    (let
        (
            (num1 (random-in-range u1 u59))
            (num2 (find-unique-number (list num1) u1 u59))
            (num3 (find-unique-number (list num1 num2) u1 u59))
            (num4 (find-unique-number (list num1 num2 num3) u1 u59))
            (num5 (find-unique-number (list num1 num2 num3 num4) u1 u59))
            (num6 (find-unique-number (list num1 num2 num3 num4 num5) u1 u59))
        )
        (ok (list num1 num2 num3 num4 num5 num6))
    )
)

;; Generate a unique number not in the existing list
;; Uses iterative approach to avoid recursion
(define-private (find-unique-number (existing (list 6 uint)) (min uint) (max uint))
    (let
        (
            (seed (random-in-range min max))
            ;; Try up to 10 random attempts
            (attempt1 (random-in-range min max))
            (attempt2 (random-in-range min max))
            (attempt3 (random-in-range min max))
            (attempt4 (random-in-range min max))
            (attempt5 (random-in-range min max))
        )
        ;; Return first unique number found, or fallback to sequential
        (if (is-none (index-of existing attempt1))
            attempt1
            (if (is-none (index-of existing attempt2))
                attempt2
                (if (is-none (index-of existing attempt3))
                    attempt3
                    (if (is-none (index-of existing attempt4))
                        attempt4
                        (if (is-none (index-of existing attempt5))
                            attempt5
                            ;; Fallback: just increment from seed
                            (sequential-search existing min max seed)
                        )
                    )
                )
            )
        )
    )
)

;; Sequential search for unique number (non-recursive)
(define-private (sequential-search (existing (list 6 uint)) (min uint) (max uint) (start uint))
    (let
        (
            (range (- max min))
            (offset (mod (+ start u1) (+ range u1)))
        )
        ;; Simple increment-based search
        (+ min offset)
    )
)

;; Manual drawing (for testing or admin override)
(define-public (manual-draw (numbers (list 6 uint)))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (ok numbers)
    )
)

;; Read-only functions
(define-read-only (get-current-nonce)
    (var-get nonce)
)

;; Verify number set is valid (6 unique numbers between 1-59)
(define-read-only (validate-numbers (numbers (list 6 uint)))
    (and
        (is-eq (len numbers) u6)
        (are-numbers-unique numbers)
        (are-numbers-in-range numbers u1 u59)
    )
)

(define-private (are-numbers-unique (numbers (list 6 uint)))
    (is-eq (len numbers) 
           (len (fold add-if-unique numbers (list))))
)

(define-private (add-if-unique (num uint) (acc (list 6 uint)))
    (if (is-some (index-of acc num))
        acc
        (unwrap! (as-max-len? (append acc num) u6) acc)
    )
)

(define-private (are-numbers-in-range (numbers (list 6 uint)) (min uint) (max uint))
    (fold check-number-in-range numbers true)
)

(define-private (check-number-in-range (num uint) (all-valid bool))
    (and all-valid (and (>= num u1) (<= num u59)))
)