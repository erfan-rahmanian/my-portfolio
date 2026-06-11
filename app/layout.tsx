import type {Metadata} from 'next';
import { Vazirmatn } from 'next/font/google';
import erfanAvatar from '../src/assets/images/erfanrahmanian-avatar.png';
import './globals.css'; // Global styles

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'عرفان -- توسعه‌دهنده فرانت‌اند',
  description: 'پورتفولیو و رزومه حرفه‌ای عرفان، توسعه‌دهنده فرانت‌اند و علاقه‌مند به هک و امنیت سایبری',
  icons: [
    { rel: 'icon', url: erfanAvatar.src, sizes: '192x192', type: 'image/png' },
    { rel: 'apple-touch-icon', url: erfanAvatar.src, sizes: '192x192' },
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-[#D7E2EA] bg-[#0C0C0C]">
        {children}
      </body>
    </html>
  );
}


