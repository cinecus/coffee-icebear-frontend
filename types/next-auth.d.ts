import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
          /** The user's postal address. */
          fname: string
          avatar :string
        }
      }
}