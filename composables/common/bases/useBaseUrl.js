export const useBaseUrl = () => {


    if (process.env.NODE_ENV === 'production') {

        return 'https://birleyici.online/api/'


    } else {

        return 'http://192.168.226.244/laravel-api/public/api/';


    }

}