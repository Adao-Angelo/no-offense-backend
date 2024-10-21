export interface CreateUserDTO {
  name: string;
  password: string;
  email: string;
}

export interface UpdateUserDTO {
  name?: string;
  password?: string;
  email?: string;
}
