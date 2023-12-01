export const useBaseUrl =  () => {


    if(process.env.NODE_ENV === 'production'){

        return 'http://birleyici.tech/api/';

    
        } else {
    
            return 'http://localhost/laravel-api/public/api/';

    
        }

}