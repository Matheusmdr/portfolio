import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { ButtonAnimatedBorder } from "@/components/ButtonAnimatedBorder";
import { Background } from "@/components/Background";
import { ProjectsList } from "@/components/ProjectsList";
import { AbilitesList } from "@/components/AbilitiesList";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { type GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import { ExperiencesTabs } from "@/components/ExperiencesTabs";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <Layout>
      <Background>
        <section className="min-h-[32rem] lg:min-h-[65vh] space-y-6 px-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col justify-center gap-6">
            <div className="mx-auto">
              <Link
                href={"https://github.com/matheusmdr"}
                target="_blank"
                rel="noreferrer noopener"
              >
                <ButtonAnimatedBorder variant={"secondary"} className="bg-gradient-to-br from-background to-muted/90">
                  <span className="z-10 text-sm font-medium text-muted-foreground">
                    {t("About.follow-in-github")}
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
              {t.rich("About.description", {
                br: () => <br />,
              })}
            </p>
            <div className="mx-auto">
              <Link href={"#contact"}>
                <Button variant={"link"} className="gap-2 px-0" size={"lg"}>
                  {t("About.say-hi")} <MoveRight />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Background>
      <section
        id="projects"
        className="flex w-full justify-start space-y-6 bg-background px-8 pt-6 dark:bg-transparent md:pt-10"
      >
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 md:max-w-screen-xl">
          <h2 className="font-heading bg-opacity-50 bg-gradient-to-b from-muted-foreground to-foreground bg-clip-text text-center text-3xl font-extrabold leading-[1.1] text-transparent sm:text-3xl md:text-6xl">
            {t("Experiences.title")}
          </h2>
          <p className="text-center leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {t.rich("Experiences.description", {
              br: () => <br />,
            })}
          </p>
          <ExperiencesTabs />
        </div>
      </section>
      <section
        id="projects"
        className="flex w-full justify-center space-y-6 bg-background px-8  py-8 pb-8 pt-6 dark:bg-transparent md:py-12 md:pb-12 md:pt-10 lg:py-32"
      >
        <div className="flex w-full max-w-screen-2xl flex-col gap-6">
          <h2 className="font-heading bg-opacity-50 bg-gradient-to-b from-muted-foreground to-foreground bg-clip-text text-center text-3xl font-extrabold leading-[1.1] text-transparent sm:text-3xl md:text-6xl">
            {t("Projects.title")}
          </h2>
          <p className="mx-auto max-w-[85%] text-center leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {t.rich("Projects.description", {
              br: () => <br />,
            })}
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
            {t("Skills.title")}
          </h2>
          <p className="mx-auto max-w-[85%] text-center leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {t.rich("Skills.description", {
              br: () => <br />,
            })}
          </p>
          <AbilitesList />
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  };
};
