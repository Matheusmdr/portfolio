// Create Supabase client

import { toast } from "@/components/ui/use-toast";
import supabase from "@/lib/supabase";

export function getPublicUrl(filePath: string, bucketName: string) {
  const fileUrl = supabase.storage.from(bucketName).getPublicUrl(filePath)
    .data.publicUrl;
  return fileUrl;
}

export async function uploadFile(file: File) {
  const bucketName = "portfolio-bucket";
  const filePath = `public/${file.name}_${crypto.randomUUID()}`;
  const { data: supabaseData, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file);
  if (error) {
    toast({
      title: "Erro",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
  const publicUrl = getPublicUrl(filePath, bucketName);
  return { supabaseData, publicUrl };
}

export async function deleteFile(filePath: string) {
  const { data, error } = await supabase.storage
    .from("portfolio-bucket")
    .remove([filePath]);
  if (error) {
    toast({
      title: "Erro",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
  return data;
}
