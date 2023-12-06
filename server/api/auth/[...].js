import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'


export default NuxtAuthHandler({
  secret: 'gS2v4jn3Rc2qkV5u36vbaW6iYL1805YVIHh2VtiP8HVvXlbM0VKv6MRn4VOKg7A3',
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '../../management/login'
  },  
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({ token, user }) => {

      const isSignIn = user ? true : false;

      // Şu anki zamanı Unix zaman damgası olarak al
      const now = Math.floor(Date.now() / 1000);

      // Token bitiş zamanını 5
      const adjustedExpiration = token.bitis;

      if (isSignIn) {

        token.jwt = user ? user.access_token || '' : '';
        token.id = user ? user.id || '' : '';
        token.role = user ? user.role || '' : '';
        token.bitis = user ? user.exp || '' : '';


      } else if (now >= adjustedExpiration) {

        //tokenın süresi doldu yenileme yap

        try {
          const response = await $jsonPlaceholder("auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token.jwt }),
            cache: "no-cache",
          });

          token.jwt = response ? response.access_token || '' : '';
          token.id = response ? response.id || '' : '';
          token.role = response ? response.role || '' : '';
          token.bitis = response ? response.exp || '' : '';


          Promise.resolve(token);

        }
        catch (error) {

          return null

        }

      } else {

        console.log("token hala geçerli")
      }

      return Promise.resolve(token);
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({ session, token }) => {

      session.role = token.role;
      session.uid = token.id;
      session.token = token.jwt

      return Promise.resolve(session);
    },
  },
  providers: [
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "E-Mail", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const response = await $fetch(process.env.API_BASE_URL + "auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            cache: 'no-cache',
          });


          return response

        }
        catch (error) {
          console.log(error)

          if (error && error.data) {
            return null
          }

        }

      }
    })
  ],
})