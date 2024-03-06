import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { UploadedImagePreview } from "./components/UploadedImageActions";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash, UploadCloud } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { deleteFile } from "@/utils/supabaseStorage";

type FormValue = {
  preview: string;
  file: File | undefined;
};

interface UploadImageFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  className?: string;
}
export function UploadImageField<T extends FieldValues>({
  form,
  name,
  label,
  className,
}: UploadImageFieldProps<T>) {
  const [preview, setPreview] = useState({ name: "", url: "", size: 0 });
  7;
  const formValue = form.watch(name) as FormValue;
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    disabled: !!preview.url,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const acceptedFile = acceptedFiles[0];
      form.setValue(name, {
        preview: acceptedFile ? URL.createObjectURL(acceptedFile) : "",
        file: acceptedFile ?? undefined,
      } as PathValue<T, Path<T>>);
      setPreview({
        name: acceptedFile?.name ?? "",
        url: acceptedFile ? URL.createObjectURL(acceptedFile) : "",
        size: acceptedFile?.size ?? 0,
      });
    },
  });

  const handleDeleteImage = async () => {
    if (formValue.preview.trim().includes("firebasestorage.googleapis.com")) {
      try {
        await deleteFile(formValue.preview);
        toast({
          title: "Imagem deletada",
          description: "A imagem foi deletada com sucesso.",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao deletar a imagem.",
          variant: "destructive",
        });
      }
    }
    form.resetField(name);
    setPreview({ name: "", url: "", size: 0 });
  };

  useEffect(() => {
    setPreview((prevState) => ({
      ...prevState,
      url: formValue?.preview ?? "",
    }));
  }, [form, formValue?.preview, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className={cn("flex flex-col", className)}>
          <FormLabel>{label}</FormLabel>
          <div
            className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-muted py-5"
            {...getRootProps()}
          >
            <Input {...getInputProps()} />
            <UploadCloud className="text-foreground" />
            <p>Arraste e solte sua imagem aqui ou</p>
            <div>
              <Button type="button">Clique para selecionar</Button>
            </div>
          </div>
          {!!preview.url && (
            <div className="flex items-center justify-between border-[1px] border-solid border-muted p-4">
              <UploadedImagePreview previewInfo={preview} />
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" variant={"destructive"}>
                      <Trash size={18} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Deletar imagem</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      Essa ação não pode ser desfeita. Tem certeza que deseja
                      deletar essa imagem?
                    </DialogDescription>
                    <DialogFooter>
                      <DialogClose>Cancelar</DialogClose>
                      <Button
                        variant={"destructive"}
                        onClick={handleDeleteImage}
                      >
                        Deletar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
