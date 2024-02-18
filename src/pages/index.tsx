import { Layout } from "@/components/Layout";
import { H1 } from "@/components/Text/components/H1";
import { Paragraph } from "@/components/Text/components/Paragraph";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <section>
        <div className="flex max-w-screen-2xl flex-col gap-6">
          <span className="text-base font-normal">Hello I’m</span>
          <H1 variant={"gradient"} size={"heading"}>
            Joe Martinez
          </H1>
          <Paragraph className="font-normal">
            I&apos;m a software engineer based in Toronto, Canada and also a
            communication and journalism student. I enjoy creating things that
            live on the internet, whether that be websites, applications, or
            anything in between. I have been freelancing for a year now while
            studying at the university and I&apos;ve manage to gain a decent
            amount of experience and valuable knowledge from all different kinds
            of fields throughout my projects/work.
          </Paragraph>
          <div>
            <Button variant={"link"} className="gap-2 px-0" size={"lg"}>
              Say hi <MoveRight />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
