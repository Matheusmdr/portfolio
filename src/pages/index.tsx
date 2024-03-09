import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { ButtonAnimatedBorder } from "@/components/ButtonAnimatedBorder";
import { Background } from "@/components/Background";
import { ProjectsList } from "@/components/ProjectsList";
import { AbilitesList } from "@/components/AbilitiesList";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export default function Home() {
  return (
    <Layout>
      <Background>
        <section className="min-h-[65vh] space-y-6 px-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col justify-center gap-6">
            <div className="mx-auto">
              <Link
                href={"https://github.com/matheusmdr"}
                target="_blank"
                rel="noreferrer noopener"
              >
                <ButtonAnimatedBorder variant={"secondary"}>
                  <span className="z-10 text-sm font-medium text-muted-foreground">
                    Follow in Github
                  </span>
                </ButtonAnimatedBorder>
              </Link>
            </div>
            <TypewriterEffect
              words={[
                {
                  text: "Matheus",
                  className:
                    "bg-opacity-50 bg-gradient-to-b from-muted-foreground to-foreground bg-clip-text text-center text-3xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl",
                },
                {
                  text: "Rocha",
                  className:
                    "bg-opacity-50 bg-gradient-to-b from-muted-foreground to-foreground bg-clip-text text-center text-3xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl",
                },
              ]}
            />
            <p className="max-w-4xl text-center font-normal leading-7 text-muted-foreground">
              Bachelor of Computer Science from the College of Science and
              Technology (FCT - UNESP). <br /> I work in the field using
              technologies such as React.js, Next.js, Typescript, Tailwindcss,
              ShadcnUI, RadixUI, NodeJs, TRPC, and Prisma ORM. Currently, I am
              seeking to improve my skills in mobile development with React
              Native and Expo.
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
      </Background>
      <section
        id="projects"
        className="flex w-full justify-center space-y-6 bg-background px-8  py-8 pb-8 pt-6 dark:bg-transparent md:py-12 md:pb-12 md:pt-10 lg:py-32"
      >
        <div className="flex w-full max-w-screen-2xl flex-col gap-6">
          <h2 className="font-heading bg-opacity-50 bg-gradient-to-b from-muted-foreground to-foreground bg-clip-text text-center text-3xl font-extrabold leading-[1.1] text-transparent sm:text-3xl md:text-6xl">
            Featured projects
          </h2>
          <p className="mx-auto max-w-[85%] text-center leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Explore a diverse range of web and mobile projects in my portfolio,{" "}
            <br />
            highlighting professional expertise and dedication.
          </p>
          <ProjectsList />
        </div>
      </section>

      <section
        id="skills"
        className="flex w-full justify-center space-y-6 px-8 py-8 pb-8 pt-6 md:py-12 md:pb-12 md:pt-10 lg:py-32"
      >
        <div className="flex w-full max-w-screen-2xl flex-col gap-6">
          <h2 className="font-heading bg-opacity-50 bg-gradient-to-b from-muted-foreground to-foreground bg-clip-text text-center text-3xl font-extrabold leading-[1.1] text-transparent sm:text-3xl md:text-6xl">
            Skills Showcase
          </h2>
          <p className="mx-auto max-w-[85%] text-center leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Explore my portfolio&apos;s section dedicated to showcasing a
            comprehensive range of skills in modern technologies, <br />{" "}
            cultivated through extensive experience and continuous learning.
          </p>
          <AbilitesList />
        </div>
      </section>
    </Layout>
  );
}
