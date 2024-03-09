import { Badge } from "@/components/ui/badge";
import { CarouselItem } from "@/components/ui/carousel";
import { type RouterOutputs } from "@/utils/api";
import Image from "next/image";

interface AbilitieItemProps {
  abilitie: RouterOutputs["abilitie"]["getAll"][number];
}

export function AbilitieItem({ abilitie }: AbilitieItemProps) {
  return (
    <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5">
      <Badge
        variant="outline"
        className="relative inline-flex w-full cursor-pointer justify-center gap-2 overflow-hidden rounded-full p-px py-[1px]"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]" />
        <div className="inline-flex gap-1 h-full w-full items-center justify-center rounded-full bg-background px-4 py-1 text-xs font-medium text-gray-50 backdrop-blur-3xl">
          {abilitie.pictureUrl && (
            <Image
              src={abilitie.pictureUrl}
              alt={abilitie.name ?? ""}
              width={100}
              height={100}
              className="w-5"
            />
          )}
          <span className="p-0 text-xs text-primary/60 transition-colors hover:text-primary/80">
            {abilitie.name}
          </span>
        </div>
      </Badge>
    </CarouselItem>
  );
}
