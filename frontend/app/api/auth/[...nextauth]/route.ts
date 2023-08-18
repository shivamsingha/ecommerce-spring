import KeycloakProvider from "next-auth/providers/keycloak";
import NextAuth, { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      token.accessToken;
      return {
        ...session,
        user: {
          ...session.user,
          refreshToken: token.refreshToken,
          accessToken: token.accessToken,
          role: token.role,
        },
      };
    },
  },
  providers: [
    KeycloakProvider({
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
      clientId: process.env.KEYCLOAK_CLIENT_ID || "",
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
