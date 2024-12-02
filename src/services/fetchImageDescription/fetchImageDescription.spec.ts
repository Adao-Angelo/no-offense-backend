import { describe, expect, it, vi } from "vitest";
import { fetchImageDescription } from "./fetchImageDescription";

vi.mock("axios");

describe("fetchImageDescription", () => {
  it("should fetch image description correctly", async () => {
    const mockUrl =
      "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const mockDescription = "";

    const result = await fetchImageDescription(mockUrl);

    expect(result).toBe(typeof String);
  });
});
