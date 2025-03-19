import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = "hJt&oYyhT^7uJWH2yeiLN@U8r%6t96BSkFuk7*ZOKU$H@tsH";

export async function middleware(req) {
    const token = req.cookies.get("token")?.value;

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET)
        );
        console.info("Token verified:", payload);
        return NextResponse.next(); // Allow access if valid
    } catch (error) {
        const errorLog = encodeURIComponent(`[${new Date().toISOString()}] ${error.message}`);
        return NextResponse.redirect(new URL(`/login?error=${errorLog}`, req.url));
    }
}

// Apply only to protected routes
export const config = {
    matcher: ["/"], // Adjust to match your protected pages
};
