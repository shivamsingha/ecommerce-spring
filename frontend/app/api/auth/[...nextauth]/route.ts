import KeycloakProvider from "next-auth/providers/keycloak";
import NextAuth, { AuthOptions, TokenSet } from "next-auth";

export const authOptions: AuthOptions = {
  callbacks: {
    jwt: async ({ account, token, user }) => {
      // If the user is logging in, save the access token and refresh token in the JWT
      if (account) {
        return {
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          user,
        };
      }

      // If the access token has not expired yet, return it
      if (Date.now() < token.expires_at * 1000) {
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
              refresh_token: token.refresh_token as string,
              grant_type: "refresh_token",
            }),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
          },
        );

        const tokens: TokenSet = await response.json();

        if (!response.ok) throw tokens;

        return {
          ...token, // Keep the previous token properties
          // many providers may only allow using a refresh token once.
          refresh_token: tokens.refresh_token ?? token.refresh_token,
          // Fall back to old refresh token
          access_token: tokens.access_token,
          expires_at: tokens.expires_at,
          user: user || token.user,
        };
      } catch (error) {
        // The error property will be used client-side to handle the refresh token error
        return { ...token, error: "RefreshAccessTokenError" as const };
      }
    },
    session: ({ session, token }) => ({
      ...session,
      ...token,
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
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
