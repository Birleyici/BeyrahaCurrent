export const useBaseUrl = () => {


    if (process.env.NODE_ENV === 'production') {

        return 'https://birleyici.tech/api/'


    } else {

        return 'http://localhost/laravel-api/public/api/';


    }

}