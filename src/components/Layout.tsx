import { type PropsWithChildren } from "react";
import { Header } from "./Header";
import Head from "next/head";
import { Footer } from "./Footer";

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Personal Portfolio</title>
        <meta
          name="description"
          content="Discover a sleek portfolio featuring projects developed with TRPC, Next.js, TypeScript, NextAuth, Tailwind CSS, Supabase, Turso DB, and Shadcn UI. Each showcases modern web development expertise, blending functionality and aesthetics seamlessly."
        />
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
