import {getToken} from '#auth'

export default defineEventHandler(async (event) => {



    let token = await getToken({ event })
 
    setCookie(event, 'token', token?.jwt, { httpOnly: true })

});
