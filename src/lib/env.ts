interface IEnv {
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
  JWT_SECRET: string;
  NEXT_PUBLIC_API_URL: string;
}

export const env: IEnv = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || "localhost:4000",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "super-secret",
  JWT_SECRET: process.env.JWT_SECRET || "super-secret",
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "localhost:3000",
}