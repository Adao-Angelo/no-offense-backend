export const jwtConfig = () => {
  return {
    secret: process.env.JWT_SECRET as string,
    expiresIn: "1d",
  };
};
