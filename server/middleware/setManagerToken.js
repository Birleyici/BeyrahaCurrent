import { decode } from 'next-auth/jwt';

export default defineEventHandler(async (event) => {

    let jwtEncodedToken

    if(useRuntimeConfig().public.isDevelopment){

    jwtEncodedToken = getCookie(event, '__Secure-next-auth.session-token') || 0

    } else {

    jwtEncodedToken = getCookie(event, 'next-auth.session-token') || 0

    }


    const token = await decode({
        token: jwtEncodedToken,
        secret: 'gS2v4jn3Rc2qkV5u36vbaW6iYL1805YVIHh2VtiP8HVvXlbM0VKv6MRn4VOKg7A3',
    });

    setCookie(event, 'token', token?.jwt, { httpOnly: true })

});



