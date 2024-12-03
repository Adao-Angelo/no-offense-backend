import { describe, expect, it } from "vitest";
import { jwtConfig } from "./jwt";

describe("jwt-config - Simple Test", () => {
  it("should return a valid jwt-config", () => {
    const result = jwtConfig();

    expect(result).toBeInstanceOf(Object);
    expect(result.expiresIn).toBeTypeOf("string");
  });
});
