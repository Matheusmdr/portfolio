import { z } from "zod";
import { api, type RouterOutputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SwitchField } from "./Fields/SwitchField";
import { toast } from "@/components/ui/use-toast";
import { uploadFile } from "@/utils/supabaseStorage";
import { UploadImageField } from "./Fields/UploadImageField";

interface CreateAndEditAbilitieProps {
  data?: RouterOutputs["abilitie"]["get"];
}

const formSchema = z.object({
  isEnabled: z.boolean(),
  name: z.string().min(1),
  pictureFile: z.object({
    preview: z.string(),
    file: z.instanceof(File).optional(),
  }),
});

type FormData = z.infer<typeof formSchema>;

export function CreateAndEditAbilitie({ data }: CreateAndEditAbilitieProps) {
  const { mutate: create, isLoading: isLoadingCreate } =
    api.abilitie.create.useMutation();
  const { mutate: update, isLoading: isLoadingEdit } =
    api.abilitie.update.useMutation();



  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      isEnabled: data?.isEnabled ?? false,
      pictureFile: {
        preview: data?.pictureUrl ?? "",
        file: undefined,
      },
    },
  });

  const onSubmit = async (formData: FormData) => {
    console.log(formData);
    if (!!data) {
      try {
        let downloadUrl = data.pictureUrl ?? undefined;
        let picturePath = data.picturePath ?? undefined;
        if (!!formData.pictureFile.file) {
          const response = await uploadFile(formData.pictureFile.file);
          downloadUrl = response?.publicUrl;
          picturePath = response?.supabaseData.path;
        }
        update({
          id: data.id,
          pictureUrl: downloadUrl ?? "",
          picturePath: picturePath ?? "",
          ...formData,
        });
        toast({
          title: "Sucesso",
          description: "Habilidade editada com sucesso",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Erro",
          description: "Erro ao editar Habilidade",
          variant: "destructive",
        });
      }
    } else {
      try {
        let downloadUrl =  undefined;
        let picturePath = undefined;
        if (!!formData.pictureFile.file) {
          const response = await uploadFile(formData.pictureFile.file);
          downloadUrl = response?.publicUrl;
          picturePath = response?.supabaseData.path;
        }
        create({
          pictureUrl: downloadUrl ?? "",
          picturePath: picturePath ?? "",
          ...formData,
        });
        toast({
          title: "Sucesso",
          description: "Habilidade criada com sucesso",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Erro",
          description: "Erro ao criar Habilidade",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <SwitchField
          form={form}
          name="isEnabled"
          label="Status da Habilidade"
          description="Ative para aparecer na home"
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <UploadImageField label="Imagem" form={form} name="pictureFile" />
        <div>
          <Button type="submit" className="w-full" disabled={isLoadingCreate}>
            {data ? "Editar" : "Criar"}
            {(isLoadingCreate || isLoadingEdit) && (
              <Loader2 className="animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
