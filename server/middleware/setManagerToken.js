import {getToken} from '#auth'

export default defineEventHandler(async (event) => {
    console.log(getToken, "gettoken")

  try {
    let token = await getToken({ event })
    console.log(token, "burda")
  } catch (error) {
    console.log(error)
  }
    setCookie(event, 'token', token?.jwt, { httpOnly: true })

});
