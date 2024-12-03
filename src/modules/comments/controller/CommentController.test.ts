import { describe, expect, it } from "vitest";
import { CommentService } from "../../../services/CommentService";
import { CommentController } from "./CommentController";

describe("CommentController", () => {
  it("should instantiate CommentController correctly", () => {
    const mockCommentService = {} as CommentService;
    const commentController = new CommentController(mockCommentService);

    expect(commentController).toBeInstanceOf(CommentController);
  });
});
