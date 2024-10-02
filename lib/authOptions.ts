import {NextAuthOptions} from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions ={
    pages: {
        signIn: '/auth/sign-in',
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
              name: "Credentials",
              credentials: {
                username: { label: "Email", type: "email", placeholder: "youremail@gmail.com" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
          
                if (user) {
                  // Any object returned will be saved in `user` property of the JWT
                  return user
                } else {
                  // If you return null then an error will be displayed advising the user to check their details.
                  return null
          
                  // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
              }
            })
          
    ],





    callbacks: {
        async signIn({user, account, profile}) {
            //Custom logic when a user signs in
            console.log('User sign-n or sign-up', user);
            return true;
        },
        async session({session, token, user}){
            // Customize session token data
            if(session?.user){
                session.user.email = user.email;
            }
            return session;
        },
    }
}