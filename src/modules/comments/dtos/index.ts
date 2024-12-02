export interface CreateCommentDTO {
  userId: string;
  publicationId: string;
  text: string;
}

export interface CommentResponseDTO {
  id: string;
  userId: string;
  publicationId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
