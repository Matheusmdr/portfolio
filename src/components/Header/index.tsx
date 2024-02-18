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
            <Link href={"#home"}>Projects</Link>
          </li>
          <li>
            <Link href={"#about"}>Resume</Link>
          </li>
          <li>
            <Link href={"#work"}>Contact</Link>
          </li>
          <li>
            <Button size={"icon"} variant={"ghost"}>
              <Github className="h-4 w-4" />
            </Button>
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <Button variant={"outline"} className="gap-2">
              Contact Me
              <ArrowRight size={15} />
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
