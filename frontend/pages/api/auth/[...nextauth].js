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
        const url = `https://${BASE_URL}/api/customers/login`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const user = await response.json();
        // console.log("user", user);
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
  // secret: process.env.JWT_SECRET_KEY,
  secret: "jwtauthsecret",
};
const dataInitial = {
  address: {
    line_1: "305 W Spring Creek Pkwy, Suite 100 B, Plano, Texas 75023",
    line_2: "",
    country: "United States",
    city: "Plano",
    state: "TX",
    zip: "75023",
  },
  _id: "6595496c6c5b8f1c79cc1304",
  companyName: "WebMantra",
  email: "mailto:info@webmantra.net",
  websiteLink: "https://www.webmantra.net/",
  linkedinUrl: "https://www.linkedin.com/company/webmantra/about/",
  githubUrl: "",
  contactNo: "",
  whatsAppNo: "",
  noOfEmployees: null,
  cp_firstName: "Hetal",
  cp_lastName: "Gandhi",
  cp_contactNo: "",
  cp_email: "mailto:usa@webmantra.net",
  cp_whatsAppNo: "",
  technologies: [],
  projectinfo:
    "The Shade Store, GREEN GLOBE SOLUTION, Mobile App for On Site Engineers, WEB APPLICATION FOR EV CHARGING\n\n",
  addedBy: {
    date: 1704282476599,
    userId: "655ef3871fd22fe0511b2f96",
  },
  __v: 0,
  cp_fullName: "Hetal Gandhi",
};
export default (req, res) => NextAuth(req, res, options);
