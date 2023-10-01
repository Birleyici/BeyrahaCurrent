import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';

export default defineEventHandler(async (event) => {

    const files = await readMultipartFormData(event);

    const req = getRequestURL(event)


    const vendorId = req.searchParams.get('vendorId')


    if (!files || files.length === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Image Not Found',
        });
    }

    const uploadedFilesPaths = []; // Yüklenen dosyaların yollarını bu dizide saklayacağız.

    try {
        for (let i = 0; i < files.length; i++) {
            if (files[i].name === 'file') {
                const originalFilename = files[i].filename.split('.').slice(0, -1).join('.'); // Dosya adını al (uzantı hariç)
                const fileExtension = files[i].filename.split('.').pop(); // Dosya uzantısını al
                const uniqueFilename = `${originalFilename}-${Date.now()}.${fileExtension}`; // Benzersiz dosya adını oluştur

                const data = files[i].data;

                // Dosyanın yazılacağı klasörün var olup olmadığını kontrol edelim.
                const dir = './assets/images/products/' + vendorId;
                if (!existsSync(dir)) {
                    mkdirSync(dir, { recursive: true }); // recursive: true ile alt klasörleri de oluşturur.
                }

                const filePath = dir + '/' + uniqueFilename;
                console.log(filePath)
                await writeFile(filePath, data);
                uploadedFilesPaths.push(filePath); // Dosyanın yolunu dizimize ekleyelim.
            }
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'File Upload Failed',
            details: error.message,
        });
    }

    return {
        message: 'success',
        uploadedFiles: uploadedFilesPaths, // Yüklenen dosyaların yollarını döndürelim.
    };
});
