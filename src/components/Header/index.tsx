import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTranslations } from "next-intl";
import { CountrySelector } from "../CountrySelector";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { CircleUserRound, FileCog, FolderGit2 } from "lucide-react";

const tabs = [
  {
    value: "projects",
    icon: <FolderGit2 size={18} className="text-foreground/60" />,
  },
  {
    value: "skills",
    icon: <FileCog size={18} className="text-foreground/60" />,
  },
  {
    value: "contact",
    icon: <CircleUserRound size={18} className="text-foreground/60" />,
  },
];

export function Header() {
  const t = useTranslations("Header");
  const [activeTab, setActiveTab] = useState(-1);
  const [openMenu, setOpenMenu] = useState(false);

  const handleSetActiveTab = (index: number) => {
    setTimeout(() => {
      setActiveTab(index);
    }, 100);
  };

  return (
    <header className="fixed top-0 z-20 w-full border-b border-border/40 bg-background/95 px-8 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto hidden max-w-screen-2xl justify-center lg:flex lg:justify-between">
        <div className="hidden basis-1/3 lg:block"></div>
        <div className="flex basis-1/3 justify-center">
          <ul
            className="flex w-fit items-center justify-center gap-2 rounded-full border border-border px-6 py-1 lg:gap-4"
            onMouseLeave={() => handleSetActiveTab(-1)}
          >
            {tabs.map((tab, index) => (
              <li key={tab.value} className="rounded-full ">
                <Link
                  href={"#" + tab.value}
                  className="group relative flex items-center"
                  onMouseEnter={() => handleSetActiveTab(index)}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {activeTab === index && (
                    <motion.span
                      layoutId="hoverButton"
                      className="absolute inset-0 z-10 border border-border bg-gradient-to-br  from-background to-muted mix-blend-difference"
                      transition={{
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.6,
                      }}
                      style={{ borderRadius: 9999 }}
                    />
                  )}
                  <span className="relative z-20  text-xs font-medium text-foreground/60 transition-colors group-hover:text-foreground/80 sm:text-sm lg:px-4 lg:py-2 lg:text-lg ">
                    {t(tab.value)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex basis-1/3 items-center justify-end gap-2">
          <ThemeToggle />
          <CountrySelector />
        </div>
      </nav>
      <nav className="mx-auto flex max-w-screen-2xl justify-between gap-4 lg:hidden">
        <Sheet open={openMenu} onOpenChange={setOpenMenu}>
          <SheetTrigger asChild>
            <Button className="flex items-center gap-2 rounded-full bg-gradient-to-br from-muted/90 to-muted/95 px-4 py-2 text-xs font-medium text-foreground">
              Menu
              <div className="flex flex-col gap-1">
                <span className="h-[1px] w-4 bg-foreground"></span>
                <span className="h-[1px] w-4 bg-foreground"></span>
                <span className="h-[1px] w-4 bg-foreground"></span>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <nav>
              <div className="flex flex-col gap-4">
                {tabs.map((tab) => (
                  <Link
                    key={tab.value}
                    href={"#" + tab.value}
                    className="z-20 flex w-fit items-center gap-4 text-lg font-medium text-foreground/60 transition-colors group-hover:text-foreground/80 lg:px-4 lg:py-2 "
                    onClick={() => setOpenMenu(false)}
                  >
                    {tab.icon}
                    {t(tab.value)}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <CountrySelector />
        </div>
      </nav>
    </header>
  );
}
