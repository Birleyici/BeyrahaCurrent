// export default defineNuxtRouteMiddleware(async (to, from) => {
//     const { data, pending, refresh, error } = await useJsonPlaceholderData('is-auth-admin')
    
//     if (to.fullPath.split('/')[1] == 'management') {

//         // Eğer kullanıcı yetkiliyse, herhangi bir işlem yapmadan fonksiyondan çık
//         if (data.value) {
//             return;
//         }

//         // Eğer kullanıcı zaten /management/login sayfasındaysa veya bu sayfadan geliyorsa, yönlendirme yapma
//         if (to.fullPath === '/management/login' || from.fullPath === '/management/login') {
//             return;
//         }

//         // Kullanıcıyı /management/login sayfasına yönlendir
//         return navigateTo('/management/login');

//     } else {
//         return;
//     }

// });
