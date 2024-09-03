export const useBaseUrl = () => {


    if (process.env.NODE_ENV === 'production') {

        return 'v'


    } else {

        return 'http://localhost/laravel-api/public/api/';


    }

}