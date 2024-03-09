import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectItemSkeleton() {
  return (
    <Card className="flex animate-shine flex-col justify-between">
      <AspectRatio ratio={16 / 9} className="rounded-t-lg">
        <Skeleton className="h-full w-full rounded-b-none" />
      </AspectRatio>
      <CardHeader>
        <Skeleton className="h-4 w-[250px]" />
      </CardHeader>
      <CardContent className="min-h-40">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="mt-3 h-4 w-[100px]" />
      </CardContent>
    </Card>
  );
}
