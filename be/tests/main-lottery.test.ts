import { describe, it, expect } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const player = accounts.get("wallet_1")!;

describe("Main Lottery Tests", () => {
    it("Can create round and buy ticket", () => {
        // Create round
        const createResult = simnet.callPublicFn(
            'main-lottery',
            'create-round',
            [Cl.uint(1000)],
            deployer
        );
        expect(createResult.result).toBeOk(Cl.uint(1));
        
        // Buy ticket
        const buyResult = simnet.callPublicFn(
            'main-lottery',
            'buy-ticket',
            [
                Cl.list([
                    Cl.uint(5), Cl.uint(12), Cl.uint(23),
                    Cl.uint(34), Cl.uint(45), Cl.uint(56)
                ]),
                Cl.none()
            ],
            player
        );
        expect(buyResult.result).toBeOk(Cl.uint(0));
    });
});