import jwt from 'jsonwebtoken';
import { getToken } from '#auth'


export default defineEventHandler(async (event) => {

    const manager_token = getCookie(event, 'manager_token') || '';

    if (!manager_token) {
        const token = await getToken({ event })
        if (token) {
            setCookie(event, 'manager_token', token?.jwt)
        }
    } else {
        // Token'ı decode edip expire zamanını al
        const decodedToken = jwt.decode(manager_token);
        const currentTime = Date.now() / 1000; // Şu anki zamanı saniye cinsinden al

        if (decodedToken.exp < currentTime) {


            try {
                const response = await $jsonPlaceholder("auth/refresh", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({token: manager_token}),
                    cache: false,
                });

                console.log(response)

            }
            catch (error) {
                console.log(error)
                if (error && error.data) {
                    return null
                }

            }



            // Token süresi dolmuşsa burada yenileme işlemleri yap
            // TODO: Refresh token işlemleri
        }
    }
});
