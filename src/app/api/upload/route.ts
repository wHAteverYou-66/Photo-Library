import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { url, publicId, tags = [], filter } = await request.json();

    if (!url) {
      return new Response(JSON.stringify({ error: "Missing image URL" }), {
        status: 400,
      });
    }

    const uploadOptions: UploadApiOptions = {};

    if (typeof publicId === "string") {
      uploadOptions.public_id = publicId;
      uploadOptions.invalidate = true;
    } else {
      uploadOptions.tags = [
        String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG),
        ...tags,
      ];
      uploadOptions.folder = String(
        process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_FOLDER
      );
    }

  if (typeof filter === "string") {
      switch (filter) {
        case "grayscale":
          uploadOptions.eager = [{ effect: "grayscale" }];
          break;
        case "sepia":
          uploadOptions.eager = [{ effect: "sepia" }];
          break;
        case "cartoonify":
          uploadOptions.eager = [{ effect: "cartoonify" }];
          break;
        case "vignette":
          uploadOptions.eager = [{ effect: "vignette" }];
          break;
        case "pixelate":
          uploadOptions.eager = [{ effect: "pixelate" }];
          break;
        case "sizzle":
          uploadOptions.eager = [{ effect: "art:sizzle" }];
          break;
        case "frost":
          uploadOptions.eager = [{ effect: "art:frost" }];
          break;
        default:
          break;
      }
  } 


    const results = await cloudinary.uploader.upload(url, uploadOptions);

    return Response.json({
  data: {
    ...results,
    transformedUrl: results.eager?.[0]?.secure_url || results.secure_url,
  },
});

  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Upload failed" }),
      { status: 500 }
    );
  }
}
