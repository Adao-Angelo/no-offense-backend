export interface CreatePublicationDTO {
  text: string;
  imageUrl?: string;
  userId: string;
  imageDescription?: string;
}

export interface PublicationResponseDTO {
  id: string;
  text: string;
  imageUrl: string | null;
  imageDescription: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
