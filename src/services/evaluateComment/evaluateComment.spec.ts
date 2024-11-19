import { describe, it, expect, vi } from "vitest";
import { evaluateComment } from "./evaluateComment";

import { AppError } from "../../error";

vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      generateContent: vi.fn(),
    }),
  })),
}));

describe("evaluateComment", () => {
  const mockGenerateContent = vi.fn();
  const mockModel = { generateContent: mockGenerateContent };
  const mockGenAI = {
    getGenerativeModel: vi.fn().mockReturnValue(mockModel),
  };

  it("should return the evaluation result when the API call succeeds", async () => {
    const mockResponse = {
      response: {
        text: vi
          .fn()
          .mockReturnValue(
            "No, it is not offensive. The comment is appropriate."
          ),
      },
    };
    mockGenerateContent.mockResolvedValue(mockResponse);

    const result = await evaluateComment(
      "A beautiful mountain landscape at sunset.",
      "I love admiring the beauty of nature!",
      "What a stunning photo!"
    );

    expect(result).toBe("No, it is not offensive. The comment is appropriate.");
    expect(mockGenerateContent).toHaveBeenCalledWith(
      expect.stringContaining("Consider the following scenario")
    );
  });

  it("should throw an AppError when the API call fails", async () => {
    mockGenerateContent.mockRejectedValue(new Error("API Error"));

    await expect(
      evaluateComment(
        "A beautiful mountain landscape at sunset.",
        "I love admiring the beauty of nature!",
        "What a stunning photo!"
      )
    ).rejects.toThrow(AppError);

    expect(mockGenerateContent).toHaveBeenCalledWith(
      expect.stringContaining("Consider the following scenario")
    );
  });
});
