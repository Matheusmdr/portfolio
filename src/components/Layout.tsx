import { type PropsWithChildren } from "react";
import { Header } from "./Header";
import Head from "next/head";
import { Footer } from "./Footer";
import { useTranslations } from "next-intl";

export function Layout({ children }: PropsWithChildren) {
  const t = useTranslations("Head");
  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
