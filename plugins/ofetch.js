// import { ofetch } from 'ofetch'

// export default defineNuxtPlugin((_nuxtApp) => {
//     globalThis.$fetch = ofetch.create({
//         onRequest({ _request, options }) {

//             const token = useCookie("auth.token");

//             if (true) {
//                 options.headers = { Authorization: `Bearer ${token.value}` }
//             } else {
//                 console.log('Not authenticated')
//             }
//         },
//         onRequestError({ error }) {
//             console.error(error, 'onrequesterror')
//         },
//         onResponse: async ({ response }) => {
            
//             if(response.status === 401){
                
//                 await refreshToken()
            
//             }

//         },
//     })
// })

