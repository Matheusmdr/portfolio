import Image from "next/image";
import {filesize} from "filesize";

interface UploadedImagePreviewProps {
  previewInfo?: {
    url: string;
    name: string;
    size: number;
  };
}

export function UploadedImagePreview({ previewInfo }: UploadedImagePreviewProps) {
  const size = filesize(previewInfo?.size ?? 0, {separator: ","});  

  return (
    <div className="flex gap-4">
      {previewInfo?.url && (
        <Image
          src={previewInfo?.url}
          alt="image"
          width={200}
          height={150}
          className="h-36 w-36 object-cover transition-all duration-500 group-hover:scale-110 rounded-md"
        />
      )}
      <div>
        {previewInfo?.name.trim() && <p className="font-bold text-base">{previewInfo?.name}</p>}
        {size !== "0 B" && <span className="text-sm">{size}</span>}
      </div>
    </div>
  );
}
