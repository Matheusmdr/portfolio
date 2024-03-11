import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { CountrySelector } from "../CountrySelector";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="w-full py-4 px-8 fixed top-0 z-20 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-screen-2xl justify-center lg:justify-between">
        <div className="hidden lg:block"></div>
        <ul className="flex items-center gap-2 lg:gap-4">
          <li>
            <Link
              href={"#projects"}
              className="flex items-center text-xs lg:text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
            >
              {t("projects")}
            </Link>
          </li>
          <li>
            <Link
              href={"#skills"}
              className="flex items-center text-xs lg:text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
            >
                {t("skills")}
            </Link>
          </li>
          <li>
            <Link
              href={"https://github.com/matheusmdr"}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button size={"icon"} variant={"ghost"} className="group">
                <Github className="h-4 w-4 text-foreground/60 transition-colors hover:text-foreground/80 group-hover:text-foreground/80" />
              </Button>
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li className="hidden lg:block">
            <Link
              href={"#contact"}
            >
              <Button
                variant={"outline"}
                className="group gap-2 text-foreground/60 transition-colors hover:text-foreground/80"
              >
                  {t("contact-me")}
                <ArrowRight
                  size={15}
                  className="text-foreground/60 transition-colors hover:text-foreground/80 group-hover:text-foreground/80"
                />
              </Button>
            </Link>
          </li>
          <li>
            <CountrySelector />
          </li>
        </ul>
      </nav>
    </header>
  );
}
