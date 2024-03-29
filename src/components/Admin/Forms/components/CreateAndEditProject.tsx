import { z } from "zod";
import { api, type RouterOutputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { UploadImageField } from "./Fields/UploadImageField";
import { uploadFile } from "@/utils/supabaseStorage";
import { SwitchField } from "./Fields/SwitchField";
import { Checkbox } from "@/components/ui/checkbox";

interface CreateAndEditProjectProps {
  data?: RouterOutputs["project"]["get"];
}

const formSchema = z.object({
  isEnabled: z.boolean(),
  name: z.string().min(1),
  descriptionPtBR: z.string().min(1),
  descriptionEn: z.string().min(1),
  pictureFile: z.object({
    preview: z.string(),
    file: z.instanceof(File).optional(),
  }),
  tagsId: z.array(z.number()),
  projectUrl: z.string().optional(),
  projectRepository: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function CreateAndEditProject({ data }: CreateAndEditProjectProps) {
  const { mutate: create, isLoading: isLoadingCreate } =
    api.project.create.useMutation();
  const { mutate: update, isLoading: isLoadingEdit } =
    api.project.update.useMutation();
  const { data: abilities } = api.abilitie.getAll.useQuery();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isEnabled: data?.isEnabled ?? false,
      name: data?.name ?? "",
      descriptionPtBR:
        data?.projectsDescriptions.find(
          (projectDescriptions) => projectDescriptions.language === "pt-BR",
        )?.description ?? "",
      descriptionEn:
        data?.projectsDescriptions.find(
          (projectDescriptions) => projectDescriptions.language === "en",
        )?.description ?? "",
      pictureFile: {
        preview: data?.pictureUrl ?? "",
        file: undefined,
      },
      tagsId:
        data?.projectAbilities.map(
          (projectAbilities) => projectAbilities.abilities.id,
        ) ?? [],
      projectRepository: data?.projectRepository ?? "",
      projectUrl: data?.projectUrl ?? "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    if (!!data) {
      try {
        let downloadUrl = data.pictureUrl ?? undefined;
        let picturePath = data.picturePath ?? undefined;
        console.log(downloadUrl);
        if (formData.pictureFile.file) {
          const response = await uploadFile(formData.pictureFile.file);
          downloadUrl = response?.publicUrl;
          picturePath = response?.supabaseData.path;
        }
        update({
          id: data.id,
          pictureUrl: downloadUrl ?? "",
          picturePath: picturePath ?? "",
          descriptions: [
            { language: "pt-BR", description: formData.descriptionPtBR },
            { language: "en", description: formData.descriptionEn },
          ],
          ...formData,
        });
        toast({
          title: "Sucesso",
          description: "Projeto editado com sucesso",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Erro",
          description: "Erro ao editar projeto",
          variant: "destructive",
        });
      }
    } else {
      try {
        let downloadUrl = undefined;
        let picturePath = undefined;
        if (!!formData.pictureFile.file) {
          const response = await uploadFile(formData.pictureFile.file);
          downloadUrl = response?.publicUrl;
          picturePath = response?.supabaseData.path;
        }
        create({
          pictureUrl: downloadUrl ?? "",
          picturePath: picturePath ?? "",
          descriptions: [
            { language: "pt-BR", description: formData.descriptionPtBR },
            { language: "en", description: formData.descriptionEn },
          ],
          ...formData,
        });
        toast({
          title: "Sucesso",
          description: "Projeto criado com sucesso",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Erro",
          description: "Erro ao criar projeto",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <SwitchField form={form} name="isEnabled" label="Status do Projeto" />
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
        <fieldset className="flex gap-6">
          <FormField
            name="projectUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url do Projeto</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="projectRepository"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repositório do Projeto</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <FormField
          control={form.control}
          name="tagsId"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Habilidades</FormLabel>
                <FormDescription>
                  Selecione as habilidades do projeto
                </FormDescription>
              </div>
              {abilities?.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="tagsId"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="descriptionPtBR"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (pt-BR)</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="descriptionEn"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (en)</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <UploadImageField label="Imagem" form={form} name="pictureFile" />
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoadingCreate}>
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
