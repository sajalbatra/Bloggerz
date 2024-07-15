import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import client from "@/db"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'Username', type: 'text', placeholder: 'Enter the username..',required: true},
          email: { label: 'Email', type: 'email', placeholder: 'Enter the email..',required: true},
          password: { label: 'Password', type: 'password', placeholder: 'Enter the password',required: true},
         
        },
        async authorize(credentials: any) {
          console.log('Username:', credentials.username);
          console.log('Email:', credentials.email);
          console.log('Password:', credentials.password);
            return {
                id:""
            };
        },
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
    if (user) {
        token.uid = user.id;
    }
    return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
          session.user.id = token.uid
      }
      return session
  }
  
},


})

export { handler as GET, handler as POST }