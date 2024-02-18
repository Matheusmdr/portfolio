import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MdEditor, type Themes } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import TurndownService from "turndown";

interface MdEditorFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  className?: string;
}
export function MdEditorField<T extends FieldValues>({
  form,
  name,
  label,
  className,
}: MdEditorFieldProps<T>) {
  const { theme } = useTheme();
  const [mdTheme, setMdTheme] = useState<Themes>("light");
  const [text, setText] = useState<string>("");
  const htmlValue = form.getValues(name);
  console.log(htmlValue)
  const turndownService = useMemo(() => new TurndownService(), []);

  const setTheme = useCallback(() => {
    setMdTheme(theme as Themes);
  }, [theme]);

  const convertMarkdownToHtml = useCallback(() => {
    if (!htmlValue) {
      setText(" ");
    }
    if (htmlValue) {
      setText(turndownService.turndown(htmlValue));
    }
  }, [htmlValue, turndownService]);

  useEffect(() => {
    convertMarkdownToHtml();
  }, [convertMarkdownToHtml]);

  useEffect(() => {
    setTheme();
  }, [setTheme]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)}>
          <FormLabel>{label}</FormLabel>
          <MdEditor
            language="en-US"
            theme={mdTheme}
            modelValue={text}
            onChange={setText}
            onHtmlChanged={field.onChange}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
