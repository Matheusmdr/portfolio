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

interface CreateAndEditAbilitieProps {
  data?: RouterOutputs["abilitie"]["get"];
}

const formSchema = z.object({
  isEnabled: z.boolean(),
  name: z.string().min(1),
  pictureUrl: z.string(),
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
      pictureUrl: data?.pictureUrl ?? "",
      isEnabled: data?.isEnabled ?? false,
    },
  });

  const onSubmit = (formData: FormData) => {
    if (!!data) {
      try {
        update({
          id: data.id,
          ...formData,
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Erro",
          description: "Erro ao editar habilidade",
          variant: "destructive",
        });
      }
    }
    else{
      try {
        create(formData)
        toast({
          title: "Sucesso",
          description: "Habilidade criada com sucesso",
        })
      } catch (error) {
        console.log(error);
        toast({
          title: "Erro",
          description: "Erro ao criar habilidade",
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
