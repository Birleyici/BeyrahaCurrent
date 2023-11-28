import {getToken} from '#auth'

export default defineEventHandler(async (event) => {
    console.log(event, "event")

    let token = await getToken({ event })
    console.log(token, "burda")
    setCookie(event, 'token', token?.jwt, { httpOnly: true })

});
