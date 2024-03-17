import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: JSX.Element | undefined;
};

export function ExperiencesTabs() {
  const t = useTranslations("Home.Experiences");
  const propsTabs = [
    {
      title: t("fuel-tab.title"),
      value: "fuel-agency",
      content: (
        <Card className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted/40 p-4 text-xl font-bold text-white md:text-4xl">
          <CardHeader>
            <CardTitle className="text-lg text-primary md:text-xl lg:text-2xl">
              {t("fuel-tab.place")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-base text-primary lg:text-lg">
              {t("fuel-tab.subtitle2")}{" "}
              <span className="text-sm text-muted-foreground">
                {t("fuel-tab.date2")}
              </span>
            </h3>
            <CardDescription className="text-xs lg:text-sm">
              {t("fuel-tab.description2")}
            </CardDescription>
          </CardContent>
          <CardContent>
            <h3 className="text-base text-primary lg:text-lg">
              {t("fuel-tab.subtitle")}{" "}
              <span className="text-sm text-muted-foreground">
                {t("fuel-tab.date")}
              </span>
            </h3>
            <CardDescription className="text-xs lg:text-sm">
              {t("fuel-tab.description")}
            </CardDescription>
          </CardContent>
        </Card>
      ),
    },
    {
      title: t("t2r-tab.title"),
      value: "t2r",
      content: (
        <Card className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted/40 p-4 font-bold text-white">
          <CardHeader>
            <CardTitle className="text-lg text-primary md:text-xl lg:text-2xl">
              {t("t2r-tab.place")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-base text-primary lg:text-lg">
              {t("t2r-tab.subtitle")}{" "}
              <span className="text-sm text-muted-foreground">
                {t("t2r-tab.date")}
              </span>
            </h3>
            <CardDescription className="text-xs lg:text-sm">
              {t("t2r-tab.description")}
            </CardDescription>
          </CardContent>
        </Card>
      ),
    },
  ];
  const [active, setActive] = useState<Tab>(propsTabs[0]!);
  const [tabs, setTabs] = useState<Tab[]>(propsTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propsTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]!);
    setTabs(newTabs);
    setActive(newTabs[0]!);
  };

  const [hovering, setHovering] = useState(false);
  const isActive = (tab: string) => {
    return tab === tabs[0]?.value;
  };

  const restartTabs = useCallback(() => {
    setTabs(propsTabs);
    setActive(propsTabs[0]!);
    console.log("oi");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  useEffect(() => {
    restartTabs();
  }, [restartTabs]);

  return (
    <div className="relative mx-auto flex min-h-[650px] w-full flex-col items-start justify-start [perspective:1000px] lg:min-h-[400px]">
      <div
        className={cn(
          "no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-center overflow-auto [perspective:1000px] sm:overflow-visible",
        )}
      >
        {propsTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative rounded-full px-4 py-2", "text-xs lg:text-lg")}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 rounded-full bg-gradient-to-br from-muted/80 to-muted/40 border border-border",
                )}
              />
            )}
            <span className="relative block text-primary">{tab.title}</span>
          </button>
        ))}
      </div>
      <div className="relative h-full w-full">
        {tabs.map((tab, idx) => (
          <motion.div
            key={tab.value}
            layoutId={tab.value}
            style={{
              scale: 1 - idx * 0.1,
              top: hovering ? idx * -50 : 0,
              zIndex: -idx,
              opacity: idx < 3 ? 1 - idx * 0.1 : 0,
            }}
            animate={{
              y: isActive(tab.value) ? [0, 40, 0] : 0,
            }}
            className={cn("absolute left-0 top-0 h-full w-full", "pt-10 lg:pt-16")}
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}