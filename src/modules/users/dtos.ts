export interface CreateUserDTO {
  name: string;
  password: string;
  email: string;
  admin?: boolean;
}

export interface UpdateUserDTO {
  name?: string;
  password?: string;
  email?: string;
}
