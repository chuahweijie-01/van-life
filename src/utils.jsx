import { redirect } from "react-router-dom";

export async function requireAuth(request) {
    const isLoggedIn = localStorage.getItem("loggedIn")
    const pathname = new URL(request.url).pathname;
    if (!isLoggedIn) {
        const response = redirect(`/login?redirectTo=${pathname}`)
        response.body = true;
        throw response;
    }
}