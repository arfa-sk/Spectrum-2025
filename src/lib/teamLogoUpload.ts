import { supabase } from "./supabaseClient";

export const MAX_TEAM_LOGO_INPUT_BYTES = 10 * 1024 * 1024; // 10 MB raw camera photos
export const MAX_TEAM_LOGO_UPLOAD_BYTES = 2 * 1024 * 1024; // 2 MB after compression

const ALLOWED_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);

export async function compressTeamLogo(file: File): Promise<File> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Please upload a PNG or JPEG image.");
  }

  const bitmap = await createImageBitmap(file);
  const maxSide = 800;
  let { width, height } = bitmap;

  if (width > maxSide || height > maxSide) {
    if (width >= height) {
      height = Math.round((height * maxSide) / width);
      width = maxSide;
    } else {
      width = Math.round((width * maxSide) / height);
      height = maxSide;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not process image. Please try a different file.");
  }

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let quality = 0.85;
  let blob: Blob | null = null;

  while (quality >= 0.45) {
    blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", quality);
    });

    if (blob && blob.size <= MAX_TEAM_LOGO_UPLOAD_BYTES) {
      break;
    }
    quality -= 0.1;
  }

  if (!blob || blob.size > MAX_TEAM_LOGO_UPLOAD_BYTES) {
    throw new Error("Image is still too large after compression. Please use a smaller photo.");
  }

  const baseName = file.name.replace(/\.[^.]+$/, "") || "team-logo";
  return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
}

export async function uploadTeamLogo(file: File): Promise<string> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Registration service is not configured. Please try again later.");
  }

  const compressed = await compressTeamLogo(file);
  const fileName = `${Date.now()}_${Math.random().toString(36).slice(2, 10)}.jpg`;

  const { data, error } = await supabase.storage.from("team_logos").upload(fileName, compressed, {
    contentType: "image/jpeg",
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("policy") || msg.includes("row-level security")) {
      throw new Error("Logo upload is blocked by storage settings. You can register without a logo.");
    }
    if (msg.includes("duplicate") || msg.includes("already exists")) {
      throw new Error("Logo upload conflict. Please try again.");
    }
    throw new Error("Could not upload team logo. Please try again or register without a logo.");
  }

  const { data: publicUrl } = supabase.storage.from("team_logos").getPublicUrl(data.path);
  return publicUrl.publicUrl;
}

export function formatLogoSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
