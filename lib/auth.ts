import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// 本番環境ではデータベースを使用してください
// これはデモ用のハードコードされたユーザー情報です
const users = [
  {
    id: "1",
    name: "管理者",
    email: "admin@company.com",
    password: "$2b$10$4W5ueBNpO.TVk.2jJGKNpuE4MagtiT5UQsarMOgDyKuYLsMwTfM2C", // password: "admin123"
  },
  {
    id: "2",
    name: "社員A",
    email: "user@company.com",
    password: "$2b$10$4W5ueBNpO.TVk.2jJGKNpuE4MagtiT5UQsarMOgDyKuYLsMwTfM2C", // password: "admin123"
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "メールアドレス", type: "email" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find((user) => user.email === credentials.email);

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
