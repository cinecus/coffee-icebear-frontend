import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "Username" },
            password: {  label: "Password", type: "password",placeholder: "Password" }
          },
          async authorize(credentials, req) {
            // console.log('credentials', credentials)
            // Add logic here to look up the user from the credentials supplied
            const res = await fetch("https://www.mecallapi.com/api/login",{
                method:'POST',
                body:JSON.stringify(credentials),
                headers:{"Content-Type":"application/json"}
            })
            const data = await res.json()
            // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
      
            if (data.status == 'ok') {
              // Any object returned will be saved in `user` property of the JWT
              return data.user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ],callbacks:{
        async jwt({token,user,account}) {
          // console.log(user)
          if(account){
            token.accessToken = account.accessToken
            token.user = user
          }
          return token
        },
        async session({session,token,user}) {
          session.accessToken = token.accessToken
          // session.user = token.user
          return session
        }
      },
      pages:{
        signIn:'/auth/signin'
      }
})