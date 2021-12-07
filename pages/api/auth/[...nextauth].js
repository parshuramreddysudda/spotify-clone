import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"


async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.accessToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("Refreshed token", refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
        }

    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: "RefreshTokenError"
        }
    }
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID,
            clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],

    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }) {

            //initial login
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessToken: account.expires_at * 1000,

                }
            }

            //retrun previous token if not expired

            if (Date.now() < token.accessTokenExpires) {
                console.log("Existing token present")
                return token;
            }

            //if access token expires refresh now
            console.log("TOKEN EXPIRED");

            return await refreshAccessToken(token)


        },

        async sessionStorage({session,token}){
            session.user.accessToken=token.accessToken;
            session.user.refreshToken=token.refreshToken;
            session.user.username=token.username;

            return session;
        }
    }
})