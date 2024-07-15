import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import client from "@/db"

interface Credentials {
  username: string;
  email: string;
  password: string;
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Enter the username..', required: true },
        email: { label: 'Email', type: 'email', placeholder: 'Enter the email..', required: true },
        password: { label: 'Password', type: 'password', placeholder: 'Enter the password', required: true },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        console.log('Username:', credentials.username);
        console.log('Email:', credentials.email);
        console.log('Password:', credentials.password);

        try {
          const alreaduser= await client.user.findUnique({
            where:{
               email:credentials.email,
            }
          })
          if(alreaduser){
            return { id: alreaduser.id.toString(), name: alreaduser.name, email: alreaduser.email };

          }
          else{
            const user = await client.user.create({
              data: {
                name: credentials.username,
                email: credentials.email,
                password: credentials.password,
              },
            });
  
            return { id: user.id.toString(), name: user.name, email: user.email };
          }
        } catch (error) {
          console.error('Error creating user:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
};

const handler = (req: any, res: any) => NextAuth(req, res, options);

export { handler as GET, handler as POST };
