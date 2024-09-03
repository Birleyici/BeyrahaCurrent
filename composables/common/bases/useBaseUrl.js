export const useBaseUrl = () => {


    if (process.env.NODE_ENV === 'production') {

        return 'http://localhost/laravel-api/public/api/'


    } else {

        return 'http://localhost/laravel-api/public/api/';


    }

}