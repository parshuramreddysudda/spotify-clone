import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"


async function refreshAccessToken(token) {
   
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.accessToken);
      
        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("wotking token is "+token.accessToken)
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
                console.log
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires:account.expires_at * 1000,

                }
            }
            //retrun previous token if not expired

            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            //if access token expires refresh now
            console.log("TOKEN EXPIRED",account,token);

            return await refreshAccessToken(token)


        },

        async session({session,token}){
            session.user.accessToken=token.accessToken;
            session.user.refreshToken=token.refreshToken;
            session.user.username=token.username;

            return session;
        }
    }
})