import { useTranslations } from "next-intl";
import { Tabs } from "../ui/animated-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ExperiencesTabs() {
  const t = useTranslations("Home.Experiences");

  const tabs = [
    {
      title: t("fuel-tab.title"),
      value: "fuel-agency",
      content: (
        <Card className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted p-4 text-xl font-bold text-white md:text-4xl">
          <CardHeader>
            <CardTitle>{t("fuel-tab.place")}</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg text-primary">
              {t("fuel-tab.subtitle2")}{" "}
              <span className="text-sm text-muted-foreground">{t("fuel-tab.date2")}</span>
            </h3>
            <CardDescription>{t("fuel-tab.description2")}</CardDescription>
          </CardContent>
          <CardContent>
            <h3 className="text-lg text-primary">
              {t("fuel-tab.subtitle")}{" "}
              <span className="text-sm text-muted-foreground">{t("fuel-tab.date")}</span>
            </h3>
            <CardDescription>{t("fuel-tab.description")}</CardDescription>
          </CardContent>
        </Card>
      ),
    },
    {
      title: t("t2r-tab.title"),
      value: "services",
      content: (
        <Card className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted p-4 text-xl font-bold text-white md:text-4xl">
        <CardHeader>
          <CardTitle>{t("t2r-tab.place")}</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg text-primary">
            {t("t2r-tab.subtitle")}{" "}
            <span className="text-sm text-muted-foreground">{t("t2r-tab.date")}</span>
          </h3>
          <CardDescription>{t("t2r-tab.description")}</CardDescription>
        </CardContent>
      </Card>
      ),
    },
  ];

  return (
    <div className="b relative mx-auto flex min-h-[20rem] w-full flex-col items-start justify-start [perspective:1000px]">
      <Tabs tabs={tabs} />
    </div>
  );
}
