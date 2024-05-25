export const useBaseUrl = () => {


    if (process.env.NODE_ENV === 'production') {

        return 'https://birleyici.online/public/api/'


    } else {

        return 'http://localhost/laravel-api/public/api/';


    }

}