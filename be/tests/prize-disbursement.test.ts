import { describe, it, expect } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;

describe("Prize Disbursement Tests", () => {
    // Test 1: Finalize Winners
    it("Admin can finalize winner counts", () => {
        const { result } = simnet.callPublicFn(
            'prize-disbursement',
            'finalize-round-winners',
            [
                Cl.uint(1),  // round-id
                Cl.uint(50), // 3-match winners
                Cl.uint(10), // 4-match winners
                Cl.uint(3),  // 5-match winners
                Cl.uint(1)   // 6-match winners
            ],
            deployer
        );
        
        expect(result).toBeOk(Cl.bool(true));
        
        // Check 6-match winner count
        const count = simnet.callReadOnlyFn(
            'prize-disbursement',
            'get-tier-winner-count',
            [Cl.uint(1), Cl.uint(6)],
            deployer
        );
        expect(count.result).toBeUint(1);
    });

    // Test 2: Calculate Prize
    it("Can calculate prize amounts correctly", () => {
        const totalPool = 100000000; // 100 STX
        
        // Set up winner counts first
        simnet.callPublicFn(
            'prize-disbursement',
            'finalize-round-winners',
            [
                Cl.uint(1),
                Cl.uint(0),
                Cl.uint(5), // 5 winners with 4 matches
                Cl.uint(0),
                Cl.uint(0)
            ],
            deployer
        );
        
        // Calculate 4-match prize
        // 5% of 100 STX = 5 STX
        // Split among 5 winners = 1 STX each
        const grossPrize = simnet.callReadOnlyFn(
            'prize-disbursement',
            'calculate-gross-prize',
            [Cl.uint(1), Cl.uint(4), Cl.uint(totalPool)],
            deployer
        );
        expect(grossPrize.result).toBeUint(1000000); // 1 STX
        
        // Net prize after 15% fee
        const netPrize = simnet.callReadOnlyFn(
            'prize-disbursement',
            'calculate-net-prize',
            [Cl.uint(1), Cl.uint(4), Cl.uint(totalPool)],
            deployer
        );
        expect(netPrize.result).toBeUint(850000); // 0.85 STX
    });

    // Test 3: Calculate Charity Share
    it("Calculates charity share correctly", () => {
        const totalPool = 100000000; // 100 STX
        
        // 1 six-match winner
        simnet.callPublicFn(
            'prize-disbursement',
            'finalize-round-winners',
            [
                Cl.uint(1),
                Cl.uint(0),
                Cl.uint(0),
                Cl.uint(0),
                Cl.uint(1) // 1 six-match winner
            ],
            deployer
        );
        
        // Charity pool: 10% of 100 = 10 STX
        // 1 winner: 10 STX per winner
        const charityShare = simnet.callReadOnlyFn(
            'prize-disbursement',
            'calculate-charity-share-per-winner',
            [Cl.uint(1), Cl.uint(totalPool)],
            deployer
        );
        expect(charityShare.result).toBeUint(10000000); // 10 STX
        
        // After 15% fee: 8.5 STX
        const netCharity = simnet.callReadOnlyFn(
            'prize-disbursement',
            'calculate-net-charity-per-winner',
            [Cl.uint(1), Cl.uint(totalPool)],
            deployer
        );
        expect(netCharity.result).toBeUint(8500000); // 8.5 STX
    });

    // Test 4: Multiple Six-Match Winners
    it("Charity split among multiple 6-match winners", () => {
        const totalPool = 100000000; // 100 STX
        
        // 3 six-match winners
        simnet.callPublicFn(
            'prize-disbursement',
            'finalize-round-winners',
            [
                Cl.uint(1),
                Cl.uint(0),
                Cl.uint(0),
                Cl.uint(0),
                Cl.uint(3) // 3 six-match winners
            ],
            deployer
        );
        
        // Charity pool: 10% of 100 = 10 STX
        // 3 winners: 3.33 STX per winner
        const charityShare = simnet.callReadOnlyFn(
            'prize-disbursement',
            'calculate-charity-share-per-winner',
            [Cl.uint(1), Cl.uint(totalPool)],
            deployer
        );
        
        // 10 STX / 3 = 3.333... STX
        const result = charityShare.result;
        // Should be approximately 3333333 (3.33 STX)
        expect(result).toBeUint(3333333);
    });
});