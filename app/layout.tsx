import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "조윤호 | Platform Engineer Portfolio 2026";
const description = "반복 운영에서 출발해 책임과 실패 경계를 설계한 플랫폼 엔지니어 조윤호의 16:9 포트폴리오입니다.";

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
    openGraph: { title, description, type: "website", locale: "ko_KR" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
