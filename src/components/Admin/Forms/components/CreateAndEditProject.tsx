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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

interface CreateAndEditProjectProps {
  data?: RouterOutputs["project"]["get"];
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  pictureUrl: z.string(),
  tagsId: z.array(z.number()),
});

type FormData = z.infer<typeof formSchema>;

export function CreateAndEditProject({ data }: CreateAndEditProjectProps) {
  const { mutate: create, isLoading: isLoadingCreate } =
    api.project.create.useMutation();
  const { mutate: edit, isLoading: isLoadingEdit } =
    api.project.update.useMutation();
  const { data: abilities } = api.abilitie.getAll.useQuery();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      description: data?.description ?? "",
      pictureUrl: data?.pictureUrl ?? "",
      tagsId: data?.projectAbilities.map((projectAbilities) => projectAbilities.abilities.id) ?? [],
    },
  });

  const onSubmit = (formData: FormData) => {
    if (!!data) {
      try {
        edit({
          id: data.id,
          ...formData,
        });
        toast({
          title: "Sucesso",
          description: "Projeto editado com sucesso",
        })
      } catch (error) {
        console.log(error);
        toast({
          title: "Erro",
          description: "Erro ao editar projeto",
          variant: "destructive",
        });
      }
    }
    else{
      try {
        create(formData);
        toast({
          title: "Sucesso",
          description: "Projeto criado com sucesso",
        })
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
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">Sidebar</FormLabel>
            <FormDescription>
              Select the items you want to display in the sidebar.
            </FormDescription>
          </div>
          {abilities?.map((ability) => (
            <FormField
              key={ability.id}
              name="tagsId"
              control={form.control}
              render={({ field }) => (
                <FormItem
                  key={ability.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(`${ability.id}`)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, ability.id])
                          : field.onChange(
                              field.value?.filter(
                                (value) => value !== `${ability.id}`,
                              ),
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{ability.name}</FormLabel>
                </FormItem>
              )}
            />
          ))}
        </FormItem> */}
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
