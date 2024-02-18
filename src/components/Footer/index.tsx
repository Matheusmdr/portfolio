import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto flex w-full max-w-screen-2xl justify-between border-t-[1px] border-t-[#111111] py-12 dark:border-t-white">
        <h3 className="text-3xl font-bold">Contact</h3>
        <ul className="flex gap-4">
          <li>
            <Button variant={"outline"} className="flex w-full gap-2">
              <Mail />
              Email
            </Button>
          </li>
          <li>
            <Button variant={"outline"} className="flex w-full gap-2">
              <Linkedin />
              LinkedIn
            </Button>
          </li>
          <li>
            <Button variant={"outline"} className="flex w-full gap-2">
              <Github />
              Github
            </Button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
