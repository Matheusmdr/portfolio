import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type RouterOutputs } from "@/utils/api";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface ProjectItemProps {
  project: RouterOutputs["project"]["getAll"][number];
}

export function ProjectItem({ project }: ProjectItemProps) {
  const { locale } = useRouter();

  return (
    <Card key={project.id}>
      {project.pictureUrl && (
        <AspectRatio ratio={16 / 9} className="py-4">
          <Image
            src={project.pictureUrl}
            alt={project.name ?? ""}
            width={300}
            height={300}
            className="mx-auto w-11/12 rounded-lg object-cover"
          />
        </AspectRatio>
      )}
      <CardHeader>
        <CardTitle className="text-lg font-extrabold tracking-wide md:text-xl">
          {project.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-40">
        <CardDescription className="text-sm text-muted-foreground">
          {
            project.projectsDescriptions.find(
              (projectDescriptions) => projectDescriptions.language === locale,
            )?.description
          }
        </CardDescription>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.projectAbilities?.map((projectAbility) => (
            <p
              key={projectAbility.abilities.id}
              className="cursor-pointer text-xs text-accent-foreground/60 transition-colors hover:text-accent-foreground/80"
            >
              {projectAbility.abilities.name}
            </p>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-end gap-2">
        {project.projectUrl?.trim() && (
          <Link
            href={project.projectUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            <ExternalLink className="group flex items-center gap-2 text-sm font-medium text-accent-foreground/60 transition-colors hover:text-accent-foreground/80" />
          </Link>
        )}
        {project.projectRepository && (
          <Link
            href={project.projectRepository}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Github className="group flex items-center gap-2 text-sm font-medium text-accent-foreground/60 transition-colors hover:text-accent-foreground/80" />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
