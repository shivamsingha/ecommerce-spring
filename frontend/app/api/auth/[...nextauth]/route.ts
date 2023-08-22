import KeycloakProvider from "next-auth/providers/keycloak";
import NextAuth, { AuthOptions } from "next-auth";
import { type TokenSet } from "@auth/core/types";

export const authOptions: AuthOptions = {
  callbacks: {
    jwt: async ({ account, token, user }) => {
      // If the user is logging in, save the access token and refresh token in the JWT
      if (account) {
        return {
          ...account,
          user,
        };
      }
      // If the access token has not expired yet, return it
      if (Date.now() < (token.expires_at ?? 0) * 1000) {
        return token;
      }

      // If the access token has expired, try to refresh it
      try {
        const response = await fetch(
          `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
          {
            body: new URLSearchParams({
              client_secret: process.env.KEYCLOAK_CLIENT_SECRET || "",
              client_id: process.env.KEYCLOAK_CLIENT_ID || "",
              refresh_token: token.refresh_token || "",
              grant_type: "refresh_token",
            }),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
          },
        );

        const tokens: TokenSet = await response.json();

        if (!response.ok) throw tokens;

        return {
          ...token,
          expires_at: Math.floor(Date.now() / 1000 + (tokens.expires_in ?? 0)),
          refresh_token: tokens.refresh_token,
          access_token: tokens.access_token,
          user: user || token.user,
        };
      } catch (error) {
        // The error property will be used client-side to handle the refresh token error
        return { ...token, error: "RefreshAccessTokenError" as const };
      }
    },
    session: ({ session, token }) => ({
      ...session,
      access_token: token.access_token,
      error: token.error,
      user: token.user,
    }),
  },
  providers: [
    KeycloakProvider({
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
      clientId: process.env.KEYCLOAK_CLIENT_ID || "",
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
