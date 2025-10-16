import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;

describe("Number Generator Tests", () => {
  it("ensures simnet is well initialised", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("can generate random numbers", () => {
    const { result } = simnet.callPublicFn(
      "number-generator",
      "generate-lottery-numbers",
      [],
      deployer
    );
    expect(result).toBeOk(expect.any(Object));
  });
});