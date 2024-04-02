/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";
import {
  loginAction,
  customerAction,
} from "../../../redux/actions/loginAction";
import { useDispatch } from "react-redux";
import CredentialsProvider from "next-auth/providers/credentials";
import { BASE_URL } from "../../../config";

const options = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        // const url = "https://ravendel.herokuapp.com/api/customers/login";
        const { email, password } = credentials;
        const url = `https://${BASE_URL}/apis/customers/login`;
        // const url = `http://localhost:8000/apis/customers/login`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Apollo-Require-Preflight': 'true',
          },
          body: JSON.stringify(credentials),
        });
        const user = await response.json();
        if (response.status === 200) {
          return user;
        } else {
          throw new Error("Invalid Email or Password");
        }
      },
    }),
  ],
  // pages: {
  //     signIn: '/auth/signin',
  //     error: '/auth/signin',
  // },
  callbacks: {
    async session({ user, session, token }) {
      // console.log("Session", { session, user })
      session.user.accessToken = token.accessToken;
      // session.user.refreshToken = token.refreshToken;
      // session.user.accessTokenExpires = token.accessTokenExpires;
      // session.user = token.user
      return session;
    },

    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          token: user,
          accessToken: user,
          refreshToken: user,
        };
      }
      return token;
    },
  },
  secret: 'jwtauthsecret',
};
export default (req, res) => NextAuth(req, res, options);
