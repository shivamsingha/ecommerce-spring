import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    /** OAuth2 Access Token */
    access_token?: string;
    user?: {
      id?: string;
    } & DefaultSession["user"];
    error?: "RefreshAccessTokenError";
  }
}

import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OAuth2 Refresh Token */
    refresh_token?: string;
    /** OAuth2 Access Token */
    access_token?: string;
    /** Access Token expiry time */
    expires_at?: number;
    /** OpenID ID Token */
    idToken?: string;
    user?: {
      id?: string;
    } & DefaultSession["user"];
    error?: "RefreshAccessTokenError";
  }
}
