import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-8">
      <div
        id="contact"
        className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-12 border-t border-t-border py-12 lg:flex-row lg:gap-0"
      >
        <h3 className="text-3xl font-bold">Contact</h3>
        <ul className="flex flex-col gap-4 lg:flex-row">
          <li>
            <Link
              href={"mailto:matheus.m.rocha@unesp.br"}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button
                variant={"outline"}
                className="flex w-full items-center gap-2 text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
              >
                <Mail />
                Email
              </Button>
            </Link>
          </li>
          <li>
            <Link
              href={
                "https://br.linkedin.com/in/matheus-magalh%C3%A3es-da-rocha"
              }
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button
                variant={"outline"}
                className="flex w-full items-center gap-2 text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
              >
                <Linkedin />
                LinkedIn
              </Button>
            </Link>
          </li>
          <li>
            <Link
              href={"https://github.com/matheusmdr"}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button
                variant={"outline"}
                className="flex w-full items-center gap-2 text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
              >
                <Github />
                Github
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
