import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req) {

    // // token exist if the user is logged in 

    // const token = await getToken({ req, secret: process.env.JWT_SECRET });

    // // Allow the requests if the following is true....
    // const { pathname } = req.nextUrl;

    // //    1) Its a request for next auth session & provider fetching
    // //    2) the token exist 


    // if (pathname.includes('/api/auth') || token) {
    //     return NextResponse.next();
    // }
    // // Redirect them to login page if nothing exist
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login');
    }

}