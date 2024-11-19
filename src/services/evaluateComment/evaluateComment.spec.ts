import { describe, it, expect, vi } from "vitest";
import { evaluateComment } from "./evaluateComment";

vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      generateContent: vi.fn().mockResolvedValue({
        response: { text: () => "No, it is not offensive." },
      }),
    }),
  })),
}));

describe("evaluateComment - Simple Test", () => {
  it("should return a valid response", async () => {
    const imageDescription = "A beautiful mountain landscape at sunset.";
    const postDescription = "I love admiring the beauty of nature!";
    const comment = "What a stunning photo!";

    const result = await evaluateComment(
      imageDescription,
      postDescription,
      comment
    );

    expect(result).toMatch(/Yes, |No, /);
  });
});
