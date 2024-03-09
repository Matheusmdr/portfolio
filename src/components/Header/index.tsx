import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="w-full py-4 fixed top-0 z-20 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-screen-2xl justify-between">
        <div></div>
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href={"#projects"}
              className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href={"#skills"}
              className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
            >
              Skills
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
                Contact Me
                <ArrowRight
                  size={15}
                  className="text-foreground/60 transition-colors hover:text-foreground/80 group-hover:text-foreground/80"
                />
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
