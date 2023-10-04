import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/profile']

export default function middleware(req: NextRequest){
    // const token = (req.cookies as unknown as {[key: string]: string})['your-token-name'];

    // // Aquí debes verificar tu token. Esto es solo un ejemplo.
    // const user = verifyToken(token);

    // if(!user && protectedRoutes.includes(req.nextUrl.pathname)){
    //     const absoluteURL = new URL("/login", req.nextUrl.origin)

    //     return NextResponse.redirect(absoluteURL.toString())
    // }

    // return NextResponse.next();
}