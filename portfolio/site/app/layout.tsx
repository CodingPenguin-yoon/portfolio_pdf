import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cho Yunho · Platform Engineer',
  description:
    '반복되는 배포와 인프라 운영을 책임질 수 있는 자동화로 바꾸는 플랫폼 엔지니어 조윤호의 포트폴리오',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
