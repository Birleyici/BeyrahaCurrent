import {getToken} from '#auth'
import { decode } from 'next-auth/jwt';

export default defineEventHandler(async (event) => {

    let jwtEncodedToken = getCookie(event, 'next-auth.session-token') || 0

const token = await decode({
    token: jwtEncodedToken,
    secret: 'gS2v4jn3Rc2qkV5u36vbaW6iYL1805YVIHh2VtiP8HVvXlbM0VKv6MRn4VOKg7A3',
  });

console.log(token, "token in set manager token")

    setCookie(event, 'token', token?.jwt, { httpOnly: true })

});



