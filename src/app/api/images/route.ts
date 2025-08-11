import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const imageUrl = body.imgUrl;

    const parts = imageUrl.split("/");
    const publicIdWithExtension = parts.pop();
    if (!publicIdWithExtension) {
      throw new Error("Invalid public ID");
    }
    const publicId = publicIdWithExtension.split(".")[0];
    await cloudinary.uploader.destroy(publicId);

    return new Response(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting image");
    return new Response("An internal error occurred", { status: 500 });
  }
};
