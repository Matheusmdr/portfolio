import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { MoveRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { data: projects } = api.project.getAll.useQuery();
  const { data: abilities } = api.abilitie.getAll.useQuery();

  return (
    <Layout>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col justify-center gap-6">
          <div className="mx-auto">
            <Button
              variant={"secondary"}
              className="h-fit rounded-full py-1 text-muted-foreground/80"
            >
              Follow in Github
            </Button>
          </div>
          <h1 className="text-center text-3xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
            Matheus Rocha
          </h1>
          <p className="max-w-4xl text-center font-normal leading-7 text-muted-foreground">
            Bachelor of Computer Science from the College of Science and
            Technology (FCT - UNESP). <br /> I work in the field using
            technologies such as React.js, Next.js, Typescript, Tailwindcss,
            ShadcnUI, RadixUI, NodeJs, TRPC, and Prisma ORM. Currently, I am
            seeking to improve my skills in mobile development with React Native
            and Expo.
          </p>
          <div className="mx-auto">
            <Button variant={"link"} className="gap-2 px-0" size={"lg"}>
              Say hi <MoveRight />
            </Button>
          </div>
        </div>
      </section>
      <section className="flex w-full justify-center space-y-6 bg-slate-50 py-8  pb-8 pt-6 dark:bg-transparent md:py-12 md:pb-12 md:pt-10 lg:py-32">
        <div className="flex w-full max-w-screen-2xl flex-col gap-6">
          <h2 className="text-center text-5xl font-extrabold">
            Featured projects
          </h2>
          <p className="mx-auto max-w-[85%] text-center leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Explore a diverse range of web and mobile projects in my portfolio,{" "}
            <br />
            highlighting professional expertise and dedication.
          </p>
          <div className="mx-auto grid w-full justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {projects?.map(
              (project) =>
                project?.pictureUrl?.trim() && (
                  <Card key={project.id}>
                    <CardHeader>
                      <Image
                        src={project.pictureUrl}
                        alt={project.name ?? ""}
                      />
                      <CardTitle>{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{project.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      {project.projectAbilities?.map((projectAbility) => (
                        <p key={projectAbility.abilities.id}>
                          {projectAbility.abilities.name}
                        </p>
                      ))}
                    </CardFooter>
                  </Card>
                ),
            )}
          </div>
        </div>
      </section>
      <section className="flex w-full justify-center space-y-6 bg-slate-50 py-8  pb-8 pt-6 dark:bg-transparent md:py-12 md:pb-12 md:pt-10 lg:py-32">
        <div className="flex w-full max-w-screen-2xl flex-col gap-6">
          <h2 className="text-center text-5xl font-extrabold">
            Skills Showcase
          </h2>
          <p className="mx-auto max-w-[85%] text-center leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Explore my portfolio&apos;s section dedicated to showcasing a
            comprehensive range of skills in modern technologies, <br />{" "}
            cultivated through extensive experience and continuous learning.
          </p>
          <div className="mx-auto grid w-full justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {abilities?.map(
              (abilitie) =>
                abilitie?.pictureUrl?.trim() && (
                  <Card key={abilitie.id}>
                    <CardHeader className="flex justify-center">
                      <Image
                        src={abilitie.pictureUrl}
                        alt={abilitie.name ?? ""}
                        width={100}
                        height={100}
                        className="mx-auto"
                      />
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <CardDescription>{abilitie.name}</CardDescription>
                    </CardContent>
                  </Card>
                ),
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
