//import cloudinaryLib from 'cloudinary'
import { v2 as cloudinary } from "cloudinary"; 

//const cloudinary = cloudinaryLib.v2

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
})

export default cloudinary
