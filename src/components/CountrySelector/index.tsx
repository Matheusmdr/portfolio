import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";

import BrazilFlag from "@/assets/svgs/br.svg";
import USAFlag from "@/assets/svgs/us.svg";

export function CountrySelector() {
  const router = useRouter();

  const handleChangeLocale = async (locale: string) => {
    await router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <Select
      defaultValue={router.locale ?? "default"}
      onValueChange={(value) => handleChangeLocale(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a language" className="flex gap-1" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en" className="flex items-center gap-1">
          <Image
            src={USAFlag as string}
            alt="United States Flag"
            className="h-4 w-6 rounded object-cover"
          />
        </SelectItem>
        <SelectItem value="pt-BR" className="flex gap-1">
          <Image
            src={BrazilFlag as string}
            alt="Brazil Flag"
            className="h-4 w-6 rounded object-cover"
          />
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
