import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "조윤호 | Platform Engineer Portfolio";
const description = "반복 운영을 자동화하고 책임과 실패의 경계를 설계하는 플랫폼 엔지니어 조윤호의 포트폴리오입니다.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "yoonman.page";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title,
    description,
    icons: { icon: "/favicon.ico" },
    openGraph: { title, description, type: "website", locale: "ko_KR", images: [{ url: "/og.png", width: 1731, height: 909, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
