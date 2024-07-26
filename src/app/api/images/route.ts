import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DELETE = async (req: Request) => {
    try {
        const body = await req.json();
        const imageUrl = body.imgUrl;

        const parts = imageUrl.split('/');
        const publicIdWithExtension = parts.pop();
        if (!publicIdWithExtension) {
            throw new Error('Invalid public ID');
        }
        const publicId = publicIdWithExtension.split('.')[0];
        const response = await cloudinary.uploader.destroy(publicId);

        // res.status(200).json({ message: 'Image deleted', response });
        return new Response("yow")
    } catch (error: any) {
        // res.status(500).json({ error: 'Failed to delete image', details: error.message });
        return new Response("nay");
    }

}
