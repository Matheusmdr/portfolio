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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { api } from "@/utils/api";
import { Github, Link2, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AutoScroll from "embla-carousel-auto-scroll";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Home() {
  const { data: projects } = api.project.getAll.useQuery();
  const { data: abilities } = api.abilitie.getAll.useQuery();

  return (
    <Layout>
      <section className="space-y-6 px-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 ">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col justify-center gap-6">
          <div className="mx-auto">
            <Link
              href={"https://github.com/matheusmdr"}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button
                variant={"secondary"}
                className="h-fit rounded-full py-1 text-muted-foreground/80"
              >
                Follow in Github
              </Button>
            </Link>
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
            <Link href={"#contact"}>
              <Button variant={"link"} className="gap-2 px-0" size={"lg"}>
                Say hi <MoveRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <div className="w-full max-w-screen-2xl  border-b border-border px-8" />
      <section
        id="projects"
        className="flex w-full justify-center space-y-6 bg-slate-50 px-8  py-8 pb-8 pt-6 dark:bg-transparent md:py-12 md:pb-12 md:pt-10 lg:py-32"
      >
        <div className="flex w-full max-w-screen-2xl flex-col gap-6">
          <h2 className="font-heading text-center text-3xl font-extrabold leading-[1.1] sm:text-3xl md:text-6xl">
            Featured projects
          </h2>
          <p className="mx-auto max-w-[85%] text-center leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Explore a diverse range of web and mobile projects in my portfolio,{" "}
            <br />
            highlighting professional expertise and dedication.
          </p>
          <div className="mx-auto grid w-full justify-center gap-6 sm:grid-cols-2 md:max-w-screen-xl lg:grid-cols-3">
            {projects?.map(
              (project) =>
                project?.pictureUrl?.trim() && (
                  <Card
                    key={project.id}
                    className="flex flex-col justify-between"
                  >
                    <AspectRatio ratio={16 / 9} className="rounded-t-lg">
                      <Image
                        src={project.pictureUrl}
                        alt={project.name ?? ""}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover rounded-t-lg"
                      />
                    </AspectRatio>
                    <CardHeader>
                      <CardTitle className="text-lg font-extrabold tracking-wide md:text-xl">
                        {project.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="min-h-40">
                      <CardDescription className="text-sm text-muted-foreground">
                        {project.description}
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
                          <Link2 className="group flex items-center gap-2 text-sm font-medium text-accent-foreground/60 transition-colors hover:text-accent-foreground/80" />
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
                ),
            )}
          </div>
        </div>
      </section>
      <section
        id="skills"
        className="flex w-full justify-center space-y-6 px-8 py-8 pb-8 pt-6 md:py-12 md:pb-12 md:pt-10 lg:py-32"
      >
        <div className="flex w-full max-w-screen-2xl flex-col gap-6">
          <h2 className="font-heading text-center text-3xl font-extrabold leading-[1.1] sm:text-3xl md:text-6xl">
            Skills Showcase
          </h2>
          <p className="mx-auto max-w-[85%] text-center leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Explore my portfolio&apos;s section dedicated to showcasing a
            comprehensive range of skills in modern technologies, <br />{" "}
            cultivated through extensive experience and continuous learning.
          </p>
          <div className="mx-auto flex w-full justify-center gap-4 space-y-4 pt-8 md:max-w-screen-xl">
            <Carousel
              opts={{
                loop: true,
                align: "center",
              }}
              plugins={[
                AutoScroll({
                  playOnInit: true,
                }),
              ]}
              className="max-w-screen-md"
            >
              <CarouselContent>
                {abilities?.map(
                  (abilitie) =>
                    abilitie?.pictureUrl?.trim() && (
                      <CarouselItem key={abilitie.id} className="basis-1/4">
                        <Card className="border-none">
                          <CardContent className="flex items-center justify-center gap-2">
                            <Image
                              src={abilitie.pictureUrl}
                              alt={abilitie.name ?? ""}
                              width={100}
                              height={100}
                              className="w-6"
                            />
                            <CardDescription className="p-0">
                              {abilitie.name}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ),
                )}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>
    </Layout>
  );
}
