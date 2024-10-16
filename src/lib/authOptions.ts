import {NextAuthOptions} from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from "next-auth/providers/facebook";
import { db } from './db';
import { compare } from 'bcrypt';
import { PrismaAdapter } from "@next-auth/prisma-adapter";


export const authOptions: NextAuthOptions ={
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/api/signin',
    },

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
          }),
        

          
          CredentialsProvider({
            name: "credentials",
            credentials: {
              email: { label: "Email", type: "email", placeholder: "youremail@gmail.com" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              // Fix the logic error: check if email or password is missing
              if (!credentials?.email || !credentials?.password) {
                return null;  // Invalid credentials
              }
          
              const existingUser = await db.user.findUnique({
                where: { email: credentials?.email }
              });
          
              // If the user is not found, return null (unauthorized)
              if (!existingUser) {
                return null;
              }
          
              // Ensure `compare` is imported and working correctly
              const passwordMatch = await compare(credentials.password, existingUser.password);
          
              // If the password doesn't match, return null (unauthorized)
              if (!passwordMatch) {
                return null;
              }
          
              // Return the user details after successful authentication
              return {
                id: existingUser.id + '',
                username: existingUser.username,
                email: existingUser.email,
              };
            }
            
          })
          
    ],


 


}