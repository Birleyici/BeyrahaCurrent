import {getToken} from '#auth'
import { decode } from 'next-auth/jwt';

export default defineEventHandler(async (event) => {

    let jwtEncodedToken = getCookie(event, 'next-auth.session-token') || 0

const token = await decode({
    token: jwtEncodedToken,
    secret: process.env.NUXT_SECRET,
  });



    setCookie(event, 'token', token?.jwt, { httpOnly: true })

});



