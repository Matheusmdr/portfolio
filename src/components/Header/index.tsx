import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="w-full py-4">
      <nav className="mx-auto flex max-w-screen-2xl justify-between">
        <div></div>
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href={"#home"}
              className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href={"#about"}
              className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
            >
              Resume
            </Link>
          </li>
          <li>
            <Link
              href={"#work"}
              className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
            >
              Contact
            </Link>
          </li>
          <li>
            <Button size={"icon"} variant={"ghost"} className="group">
              <Github className="h-4 w-4 text-foreground/60 transition-colors hover:text-foreground/80 group-hover:text-foreground/80" />
            </Button>
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
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
          </li>
        </ul>
      </nav>
    </header>
  );
}
