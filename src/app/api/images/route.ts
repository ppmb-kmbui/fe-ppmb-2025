import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
    const { publicId } = req.body;

    console.log(publicId, "test")

    // try {
    //     await cloudinary.v2.uploader.destroy(publicId);
    //     res.status(200).json({ message: 'Image deleted successfully' });
    // } catch (error) {
    //     console.error('Error deleting image:', error);
    //     res.status(500).json({ message: 'Failed to delete image', error });
    // }
}
