import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "陈珊｜3D × AI 视觉设计师";
const description =
  "陈珊的设计作品集：十年三维设计经验，专注 C4D、AI 融合创意、产品视觉与动态设计。";

export async function generateMetadata(): Promise<Metadata> {
  const isGitHubPages = process.env.GITHUB_PAGES === "true";
  let origin =
    "https://jessikakilarjian-gif.github.io/chenshan-portfolio";

  if (!isGitHubPages) {
    const { headers } = await import("next/headers");
    const requestHeaders = await headers();
    const host =
      requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
    const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
    origin = host ? `${protocol}://${host}` : "http://localhost:3000";
  }

  const iconPath = isGitHubPages
    ? "/chenshan-portfolio/favicon.svg"
    : "/favicon.svg";

  return {
    metadataBase: new URL(origin),
    title,
    description,
    icons: {
      icon: iconPath,
      shortcut: iconPath,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "zh_CN",
      images: [
        {
          url: `${origin}/og.jpg`,
          width: 1792,
          height: 1024,
          alt: "陈珊 3D × AI 视觉设计师作品集",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.jpg`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
