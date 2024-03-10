import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { api } from "@/utils/api";

import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import "@/styles/globals.css";
import { useRouter } from "next/router";

const MyApp: AppType<{
  session: Session | null;
  messages: AbstractIntlMessages | undefined;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <NextIntlClientProvider
        locale={router.locale}
        timeZone="Europe/Vienna"
        messages={pageProps.messages}
      >
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </NextIntlClientProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
