import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"



    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if (!localFilePath) return { error: "File path is missing" }
            //upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            // file has been uploaded successfull
            //console.log("file is uploaded on cloudinary ", response.url);
            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
            }
            return response;
    
        } catch (error) {
            console.error("Cloudinary Upload Error:", error);
            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
            }
            return { error: "Upload failed", details: error.message };
        }
    }
   
export {uploadOnCloudinary} 
    