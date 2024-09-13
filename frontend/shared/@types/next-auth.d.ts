import { User } from "./User";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      access_token: string;
      name: string;
      email: string;
      refresh_token: string;
      uuid_code: string;
      loggedIn: boolean;
    };
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     name: string;
//     email: string;
//     access_token: string;
//     refresh_token: string;
//     uuid_code: string;
//     loggedIn: boolean;
//   }
// }
