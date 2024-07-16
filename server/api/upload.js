import { defineEventHandler, readBody, getQuery } from 'h3';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: 'AKIAWLDWQFPDVBAVF6FR',
    secretAccessKey: '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',
    region: 'eu-central-1'
});

export default defineEventHandler(async (event) => {


    const files = await readMultipartFormData(event);
    const req = getRequestURL(event);
    const vendorId = req.searchParams.get('vendorId');

    

    if (!files || files.length === 0) {
        throw new Error('Image Not Found');
    }

    const uploadedFilesPaths = [];

    try {
        for (const file of files) {
            const fileExtension = file.filename.split('.').pop().toLowerCase();
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'jfif'];


            if (!allowedExtensions.includes(fileExtension)) {
                throw new Error('Invalid File Format');
            }

            const uniqueFilename = `${Date.now()}.${fileExtension}`;

            // S3'e dosya yükleme
            const s3Params = {
                Bucket: 'beyraha',
                Key: `images/products/${vendorId}/${uniqueFilename}`,
                Body: file.data,
                ContentType: file.type
            };

            const uploadResult = await s3.upload(s3Params).promise();
            uploadedFilesPaths.push(uploadResult.Location);
        }
    } catch (error) {
        console.error(error, "error in upload handler");
        throw new Error('File Upload Failed');
    }


    function removeBaseUrls(urls) {
        return urls.map(url => {
          return url.replace('https://beyraha.s3.eu-central-1.amazonaws.com/images', '');
        });
      }

      let imagesPaths = removeBaseUrls(uploadedFilesPaths);


    return {
        message: 'success',
        uploadedFiles: imagesPaths,
    };
});
