'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Mail, Send, X, ExternalLink, ArrowRight, Sparkles, Check, 
  Calendar, MapPin, Phone, Award, User, BookOpen, Globe2, 
  Briefcase, ChevronDown, Monitor, Laptop, Code2, Layers, 
  Cpu, GraduationCap, Github, Linkedin, MessageSquare, Menu,
  Shield, Lock, Key, Terminal, Eye
} from 'lucide-react';

import ContactButton from '../components/ContactButton';
import LiveProjectButton from '../components/LiveProjectButton';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import AnimatedText from '../components/AnimatedText';
import LightningBackground from '../components/LightningBackground';

// Import newly uploaded Erfan's custom avatar
import erfanAvatar from '../src/assets/images/erfanrahmanian-avatar.png';
import customCursor from '../src/assets/images/-cursor--SweezyCursors.png';
import pointerCursor from '../src/assets/images/-pointer--SweezyCursors.png';

interface Floating3DAssetProps {
  src: string;
  alt: string;
  className?: string;
  duration?: number;
  delay?: number;
  yRange?: number;
  rotateRange?: number;
}

const Floating3DAsset = ({
  src,
  alt,
  className = '',
  duration = 6,
  delay = 0,
  yRange = 15,
  rotateRange = 10,
}: Floating3DAssetProps) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`pointer-events-none select-none blur-[0.4px] ${className}`}
      referrerPolicy="no-referrer"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      animate={{
        y: [0, -yRange, 0],
        rotate: [0, rotateRange, -rotateRange, 0],
      }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        rotate: {
          duration: duration * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        opacity: { duration: 0.8 },
        scale: { duration: 0.8 },
      }}
    />
  );
};

// GIFs for the Marquee Section (Tripled for continuous flow)
const MARQUEE_GIFS = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

// Experience Data
const EXPERIENCES = [
  {
    role: "توسعه‌دهنده فرانت‌اند (پروژه‌ای)",
    company: "شرکت راهکارهای تحت وب زاگرس رایان",
    duration: "مهر ۱۴۰۳ – تاکنون",
    location: "یزد، ایران (دورکاری)",
    bullets: [
      "توسعه رابط‌های کاربری تحت وب با تکنولوژی‌های مدرن JavaScript",
      "همکاری در پروژه‌های کوتاه‌مدت و ارائه راهکارهای فنی مناسب",
      "پیاده‌سازی اجزای UI/UX طبق استانداردهای طراحی مدرن",
      "بهینه‌سازی عملکرد و واکنشگرایی در پروژه‌های متنوع",
      "کار تیمی و انطباق سریع با نیازمندی‌های مختلف پروژه‌ها"
    ]
  },
  {
    role: "توسعه‌دهنده فرانت‌اند",
    company: "شرکت پیشگامان",
    duration: "مهر ۱۴۰۲ – مهر ۱۴۰۳",
    location: "یزد، ایران",
    bullets: [
      "توسعه و نگهداری پلتفرم‌های اکوبار و بازرگام با استفاده از React و Next.js",
      "پیاده‌سازی ماژول‌های کاربری و مدیریتی پیچیده با تمرکز بر UX/UI",
      "بهینه‌سازی عملکرد اپلیکیشن‌ها و کاهش زمان بارگذاری صفحات",
      "همکاری مؤثر در تیم توسعه با استفاده از متدولوژی Agile (اسکرام)",
      "مدیریت state پیچیده با Zustand و بهینه‌سازی فرآیند data fetching"
    ]
  }
];

// Technical Skills detailed data with level percentage
const SKILL_CATEGORIES = [
  {
    title: "زبان‌ها و فریم‌ورک‌ها",
    skills: [
      { name: "React", level: "پیشرفته", percent: 95 },
      { name: "Next.js", level: "پیشرفته", percent: 92 },
      { name: "TypeScript", level: "پیشرفته", percent: 90 },
      { name: "JavaScript (ES6+)", level: "پیشرفته", percent: 95 },
      { name: "HTML5 & CSS3", level: "پیشرفته", percent: 98 },
      { name: "Tailwind CSS", level: "پیشرفته", percent: 96 },
      { name: "Angular (15+)", level: "خوب", percent: 75 },
      { name: "SCSS", level: "خوب", percent: 80 },
      { name: "Bootstrap", level: "خوب", percent: 85 }
    ]
  },
  {
    title: "مدیریت State و API",
    skills: [
      { name: "React Context", level: "پیشرفته", percent: 94 },
      { name: "Zustand", level: "پیشرفته", percent: 92 },
      { name: "Fetch API & Axios", level: "پیشرفته", percent: 95 },
      { name: "React Query", level: "خوب", percent: 84 },
      { name: "RxJS", level: "خوب", percent: 72 }
    ]
  },
  {
    title: "ابزارها و کتابخانه‌ها",
    skills: [
      { name: "Git & GitHub / GitLab", level: "پیشرفته", percent: 94 },
      { name: "NPM / PNPM", level: "پیشرفته", percent: 95 },
      { name: "React Router DOM", level: "پیشرفته", percent: 96 },
      { name: "React Hook Form & Zod", level: "خوب", percent: 85 },
      { name: "Mantine UI", level: "خوب", percent: 84 },
      { name: "MUI5 & Shadcn UI", level: "خوب", percent: 82 },
      { name: "OpenLayers", level: "خوب", percent: 78 },
      { name: "Chart.js & Recharts", level: "خوب", percent: 80 }
    ]
  },
  {
    title: "مفاهیم، الگوها و محیط توسعه",
    skills: [
      { name: "Responsive Web Design & Mobile-First", level: "متخصص", percent: 96 },
      { name: "Component-Based Architecture", level: "متخصص", percent: 94 },
      { name: "VSCode / VSCodium", level: "روزمره", percent: 98 },
      { name: "Linux (Ubuntu)", level: "روزمره", percent: 85 },
      { name: "AI Tools (Claude, GPT, Studio)", level: "پیشرفته", percent: 94 }
    ]
  }
];

// All 10 Projects detailed data
const PROJECTS_DATA = [
  {
    id: "bird-builder",
    num: "۰۱",
    category: "پروژه محصولی فعال و سازمانی",
    name: "فرم‌ساز سازمانی پرنده",
    desc: "یک پلتفرم بومی سازمان‌یافته با قابلیت طراحی تعاملی و مجهز به ویرایشگر قدرتمند گرافیکی درگ‌ان‌دراپ (Drag & Drop)، جهت تولید، اعتبارسنجی و قالب‌بندی خودکار انواع فرم‌های تجاری پیچیده با لود بسیار سریع.",
    details: "محصول رسمی شرکت دانش بنیان چابک اندیشان پرنده آفرین. این پروژه تعاملی، چالش‌های پیچیده مدیریت state فرم‌های پویا و رندرینگ بهینه را به طور پایدار حل کرده است.",
    tech: ["Next.js", "React", "TypeScript", "JWT", "REST API", "Postman", "Responsive Layout"],
    github: "#",
    live: "#"
  },
  {
    id: "pooya-taraz",
    num: "۰۲",
    category: "پروژه وب خلاقانه شرکتی",
    name: "وب‌سایت رسمی شرکت پویا تراز",
    desc: "وب‌سایت جامع شرکتی پویا تراز مجهز به پنل ادمین اختصاصی با قابلیت تغییر بی‌واسطه محتوای تمام صفحات، گالری پروژه‌ها، فرم‌های سازمانی و سایدبارهای تعاملی.",
    details: "فرانت‌اند این سیستم با HTML و Tailwind CSS توسعه یافته و بخش بک‌اند به همراه پنل مدیریت محتوا با پایتون پیاده‌سازی شده است تا داینامیک بودن ۱۰۰ درصدی صفحات تامین شود.",
    tech: ["HTML5", "Tailwind CSS", "Python", "Admin Panel", "DOM Manipulation", "SEO optimized"],
    github: "#",
    live: "#"
  },
  {
    id: "cafe-reiss",
    num: "۰۳",
    category: "بازطراحی کامل رابط کاربری UI/UX",
    name: "پلتفرم سفارش کافه رئیس",
    desc: "بازطراحی و مهندسی کامل رابط کاربری و تجربه کاربری پلتفرم سفارش آنلاین زنجیره‌ای کافه رئیس همراه با تعاملات پیشرفته، دسته‌بندی هوشمند کالاها و مدیریت لحظه به لحظه سبد خرید.",
    details: "تمرکز اصلی این پروژه روی ایجاد انیمیشن‌های سیال، سرعت تراکنش کلاینت و فیلترهای آنی بوده که با هماهنگی Zustand و React Query به صورت کاملاً ایزوله پیاده‌سازی شده است.",
    tech: ["React 18", "TypeScript", "Tailwind CSS", "Zustand", "React Query", "Mantine UI", "Framing Motion"],
    github: "#",
    live: "#"
  },
  {
    id: "yazd-municipality",
    num: "۰۴",
    category: "داشبورد هوشمند و کلان‌داده",
    name: "داشبورد هوشمند شهرداری یزد",
    desc: "سامانه مدیریت و مانیتورینگ متمرکز سرویس‌های شهری شهرداری یزد که به نقشه تعاملی دقیق و داشبوردهای آماری غنی مجهز است.",
    details: "با مجهز بودن به کتابخانه تخصصی نقشه‌نگاری OpenLayers و همچنین سیستم ردیابی رویدادها، ترافیک، و لاگ‌های گرافیکی Chart.js، این سامانه بهترین تجربه پایش شهری را عرضه می‌دارد.",
    tech: ["Angular 15+", "TypeScript", "SCSS", "RxJS", "OpenLayers", "Chart.js", "Geographic API"],
    github: "#",
    live: "#"
  },
  {
    id: "logistics-hub",
    num: "۰۵",
    category: "سامانه اختصاصی مدیریت لجستیک",
    name: "سامانه یکپارچه مدیریت باربری",
    desc: "اپلیکیشن پیشرفته تحت وب جهت رزرو باربری تجاری، ثبت بارنامه، پیگیری آنلاین مرسولات کشور و مدیریت توزیع بین رانندگان حمل و نقل جاده‌ای.",
    details: "پیاده‌سازی شده بر پایه معماری ماژولار React با ارتباط بلادرنگ API جهت مانیتور آمار بارهای ارسالی و مدیریت آسان رانندگان.",
    tech: ["React", "Node.js", "Express", "RESTful Routing", "Git workflow"],
    github: "#",
    live: "#"
  },
  {
    id: "shop-platform",
    num: "۰۶",
    category: "پلتفرم فروشگاهی مدرن",
    name: "پروژه فروشگاهی آنلاین با Mantine & Zustand",
    desc: "سیستم کامل فروشگاهی با قابلیت احراز هویت هوشمند، نمایش کارت‌های دینامیک، ترتیب‌دهی و سفارشی‌سازی چینش محصولات با درگ‌اند‌دراپ و سبد خرید پیشرفته کلاینت.",
    details: "از ابزار مدرن Zustand برای مدیریت بهینه سبد خرید کلاینت بهره می‌برد تا بدون تاخیر همگام‌سازی شود.",
    tech: ["React", "TypeScript", "Mantine UI", "Zustand", "Draggable Lists"],
    github: "#",
    live: "#"
  },
  {
    id: "crypto-wallet",
    num: "۰۷",
    category: "داشبورد مدیریت رمزارز",
    name: "داشبورد آماری رمزارزها و پایش بازار",
    desc: "یک پلتفرم تعاملی زیبا برای پایش لحظه‌ای نوسانات بازار کریپتوکارنسی، تحلیل چارت‌های پیشرفته شمعی و مدیریت پورتفولیو دارایی‌های مجازی.",
    details: "این پروژه تعاملی بالا با فریم‌ورک Next.js و توزیع پایدار داده با Redux Toolkit را به نمایش می‌گذارد.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Firebase Auth / DB"],
    github: "#",
    live: "#"
  },
  {
    id: "accounting-system",
    num: "۰۸",
    category: "برنامه مالی و ابزار محاسباتی",
    name: "سامانه جامع حسابداری ابری پویا",
    desc: "سیستم یکپارچه حسابداری تحت وب با قابلیت صدور فاکتورهای استاندارد ملی، گزارش‌گیری‌های مالی دوره‌ای، نمودارهای درآمدی چرخشی و داشبورد حسابرسان.",
    details: "از دیتابیس PostgreSQL به همراه ORM قدرتمند Prisma جهت ذخیره‌سازی دقیق و تراکنشی تراکنش‌ها با بالاترین سطح امنیت اطلاعات استفاده می‌کند.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Chart.js"],
    github: "#",
    live: "#"
  },
  {
    id: "barber-booking",
    num: "۰۹",
    category: "سیستم جامع رزرو آنلاین",
    name: "سامانه نوبت‌دهی آنلاین آرایشگاهی",
    desc: "پلتفرم رزرو نوبت آنلاین و هوشمند که مجهز به تقویم شمسی پویا، پنل مجزای اپراتورهای سالن و درگاه پرداخت آزمایشی است.",
    details: "ساخته شده با معماری مدرن tRPC که تبادل فوق‌العاده سریع و ایمن انواع تایپ‌های داده را بین کلاینت و سرور برقرار می‌سازد.",
    tech: ["Next.js", "React", "TypeScript", "tRPC", "Prisma", "Tailwind CSS", "NextAuth.js"],
    github: "#",
    live: "#"
  },
  {
    id: "cms-admin",
    num: "۱۰",
    category: "داشبورد مدیریت محتوا CMS",
    name: "پنل ادمین اختصاصی سایت‌های شرکتی",
    desc: "یک سیستم مدیریت محتوای (CMS) سازمانی قدرتمند با معماری ماژولار جهت تنظیم محتوای داینامیک، بنرهای تبلیغاتی، اعضای تیم و فرم‌های تماس ایمن.",
    details: "مجهز به کامپوننت‌های پایدار و منطبق بر استاندارد دسترس‌پذیری Shadcn UI به همراه اعتبارسنجی دقیق فرم‌ها با استفاده از پکیج Zod.",
    tech: ["Next.js", "TypeScript", "Shadcn UI", "Tailwind CSS", "Firebase", "Zod Schema"],
    github: "#",
    live: "#"
  }
];

// Blog Posts Data
const BLOG_POSTS = [
  {
    title: "حملات DOM-based XSS و راه‌ حل های مدرن پیشگیری در React",
    category: "امنیت سایبری کلاینت",
    date: "۱۴۰۵/۰۳/۱۸",
    desc: "بررسی عمیق نحوه سوءاستفاده نفوذگران از داده‌های ورودی برای اجرای اسکریپت‌های مخرب در سمت کلاینت و راهکارهای کارآمد مانند dangerouslySetInnerHTML ایمن و Trusted Types.",
    link: "https://github.com/erfan-rahmanian"
  },
  {
    title: "امن‌سازی توکن‌های JWT در فرانت‌اند: ذخیره در LocalStorage یا HttpOnly Cookie؟",
    category: "امنیت فرانت‌اند",
    date: "۱۴۰۵/۰۲/۲۴",
    desc: "یک چالش همیشگی در توسعه محصول! تحلیل آسیب‌پذیری‌های مرتبط با سرقت توکن از طریق XSS در مقایسه با جعل درخواست‌های متقاطع (CSRF) به‌همراه راهکارهای جامع امنیتی.",
    link: "https://github.com/erfan-rahmanian"
  },
  {
    title: "مهاجرت به معماری مدرن Next.js 15 و پیاده‌سازی لایه‌های حفاظتی سرور",
    category: "Next.js & Security",
    date: "۱۴۰۵/۰۱/۱۰",
    desc: "چند نکته کلیدی برای بهینه‌سازی سرعت رندر، مهاجرت موفق و پیاده‌سازی Headers امنیتی از جمله Content Security Policy (CSP) جهت پیشگیری از Clickjacking.",
    link: "https://github.com/erfan-rahmanian"
  },
  {
    title: "مدیریت وضعیت امن در کلاینت با Zustand در برنامه‌های مالی و تجاری",
    category: "توسعه فرانت‌اند",
    date: "۱۴۰۴/۱۲/۰۵",
    desc: "مقایسه فنی و عمیق مدیریت وضعیت سمت کلاینت، جلوگیری از دستکاری حافظه اتمیک استیت‌ها و پیاده‌سازی سیستم‌های رمزنگاری داده‌های محلی کلاینت.",
    link: "https://github.com/erfan-rahmanian"
  }
];

export default function Home() {
  const marqueeSectionRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS_DATA[0] | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Custom filter for projects
  const [activeProjectFilter, setActiveProjectFilter] = useState('همه');

  // Contact form elements state
  const [nameVal, setNameVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [msgVal, setMsgVal] = useState('');

  // Avatar loaded from the locally uploaded image asset
  const [avatarSrc, setAvatarSrc] = useState(erfanAvatar.src);

  // Mouse position state for the glowing halo
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  const [isPointerHovered, setIsPointerHovered] = useState(false);

  // Disable automatic scroll restoration on refresh and scroll to top
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  // Mouse move listener for custom glowing background halo
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsMouseHovered(true);
    };

    const handleMouseLeave = () => {
      setIsMouseHovered(false);
      setIsPointerHovered(false);
    };

    const handlePointerElementEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, input, textarea, select, [class*="cursor-pointer"]')) {
        setIsPointerHovered(true);
      }
    };

    const handlePointerElementLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      const isInteractive = target?.closest('a, button, input, textarea, select, [class*="cursor-pointer"]');
      const isStillInsideInteractive = relatedTarget?.closest('a, button, input, textarea, select, [class*="cursor-pointer"]');

      if (isInteractive && !isStillInsideInteractive) {
        setIsPointerHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handlePointerElementEnter);
    document.addEventListener('mouseout', handlePointerElementLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handlePointerElementEnter);
      document.removeEventListener('mouseout', handlePointerElementLeave);
    };
  }, []);

  // Listening to scroll of Page for Marquee
  useEffect(() => {
    const handleScroll = () => {
      const el = marqueeSectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const secTop = rect.top + window.scrollY;
      const computedOffset = (window.scrollY - secTop + window.innerHeight) * 0.3;
      setScrollOffset(computedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerContactModal = () => {
    setIsContactOpen(true);
    setContactSuccess(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameVal || !emailVal || !msgVal) {
      alert('لطفاً تمامی فیلدها را پر کنید تا پیام ارزیابی شود!');
      return;
    }
    setContactSuccess(true);
    setTimeout(() => {
      setIsContactOpen(false);
      setNameVal('');
      setEmailVal('');
      setMsgVal('');
    }, 2200);
  };

  const handleProjectClick = (proj: typeof PROJECTS_DATA[0]) => {
    setSelectedProject(proj);
  };

  // Filter projects dynamically
  const filteredProjects = PROJECTS_DATA.filter(p => {
    if (activeProjectFilter === 'همه') return true;
    if (activeProjectFilter === 'Next.js & React') {
      return p.tech.includes('Next.js') || p.tech.includes('React') || p.tech.includes('React 18');
    }
    if (activeProjectFilter === 'داشبورد & پنل ادمین') {
      return p.category.includes('داشبورد') || p.tech.includes('Admin Panel') || p.tech.includes('Shadcn UI');
    }
    if (activeProjectFilter === 'سامانه‌ها و سایر') {
      return !p.tech.includes('Next.js') && !p.category.includes('داشبورد') && p.id !== 'digikala-clone';
    }
    return true;
  });

  const row1Gifs = [...MARQUEE_GIFS.slice(0, 11), ...MARQUEE_GIFS.slice(0, 11), ...MARQUEE_GIFS.slice(0, 11)];
  const row2Gifs = [...MARQUEE_GIFS.slice(11), ...MARQUEE_GIFS.slice(11), ...MARQUEE_GIFS.slice(11)];

  return (
    <main className={`w-full bg-[#0C0C0C] min-h-screen text-[#D7E2EA] overflow-x-clip font-sans selection:bg-[#B600A8]/30 relative text-right ${isMouseHovered ? 'custom-cursor-active' : ''}`} dir="rtl">
      
      {/* Interactive Purple Glowing Cursor Halo */}
      {isMouseHovered && (
        <div
          className="fixed pointer-events-none z-50 w-[350px] h-[350px] rounded-full blur-[100px] opacity-70 mix-blend-screen transition-transform duration-75 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(182,0,168,0.75) 0%, rgba(118,33,176,0.34) 48%, rgba(168,85,247,0.16) 72%, transparent 100%)',
            transform: `translate3d(${mousePos.x - 175}px, ${mousePos.y - 175}px, 0)`,
            left: 0,
            top: 0,
            willChange: 'transform',
          }}
        />
      )}

      {isMouseHovered && (
        <img
          src={isPointerHovered ? pointerCursor.src : customCursor.src}
          alt=""
          className="fixed pointer-events-none select-none z-[100] w-[36px] h-[36px] object-contain"
          style={{
            transform: `translate3d(${mousePos.x - 18}px, ${mousePos.y - 18}px, 0)`,
            left: 0,
            top: 0,
            willChange: 'transform',
          }}
        />
      )}

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#0C0C0C]/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 text-[#D7E2EA] font-sans"
            dir="rtl"
          >
            <a
              href="#about-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold hover:text-[#B600A8] transition-colors"
            >
              درباره من
            </a>
            <a
              href="#experience-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold hover:text-[#B600A8] transition-colors"
            >
              سوابق و رزومه
            </a>
            <a
              href="#cybersecurity-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold hover:text-[#B600A8] transition-colors"
            >
              امنیت سایبری و دوره‌ها
            </a>
            <a
              href="#projects-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold hover:text-[#B600A8] transition-colors"
            >
              پروژه‌ها
            </a>
            <a
              href="#skills-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold hover:text-[#B600A8] transition-colors"
            >
              مهارت‌ها
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                triggerContactModal();
              }}
              className="text-2.5xl font-extrabold text-[#B600A8] bg-white/5 px-8 py-3 rounded-full border border-white/10 hover:bg-[#B600A8]/20 transition-all active:scale-95 cursor-pointer"
            >
              تماس با من
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative h-screen flex flex-col justify-between overflow-hidden select-none w-full"
      >
        <LightningBackground />

        {/* Animated background 3D elements */}
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Glass Star"
          className="absolute left-[8%] top-[25%] w-[90px] sm:w-[130px] z-0 opacity-40"
          duration={7}
        />
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon"
          className="absolute right-[5%] top-[15%] w-[110px] sm:w-[150px] z-0 opacity-40"
          duration={5.5}
          delay={0.5}
        />

        {/* Navbar */}
        <FadeIn delay={0} y={-20} as="nav" className="relative z-50 w-full">
          <div className="flex justify-between items-center w-full px-6 md:px-10 pt-6 md:pt-8 bg-[#0C0C0C]/40 backdrop-blur-md">
            {/* Desktop Links */}
            <div className="hidden md:flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
              <a
                href="#about-section"
                className="text-[#D7E2EA] font-semibold text-sm md:text-lg lg:text-[1.15rem] xl:text-[1.3rem] hover:opacity-70 transition-opacity duration-200"
              >
                درباره من
              </a>
              <a
                href="#experience-section"
                className="text-[#D7E2EA] font-semibold text-sm md:text-lg lg:text-[1.15rem] xl:text-[1.3rem] hover:opacity-70 transition-opacity duration-200"
              >
                سوابق و رزومه
              </a>
              <a
                href="#cybersecurity-section"
                className="text-[#D7E2EA] font-semibold text-sm md:text-lg lg:text-[1.15rem] xl:text-[1.3rem] hover:opacity-70 transition-opacity duration-200 white-space-nowrap"
              >
                امنیت سایبری
              </a>
              <a
                href="#projects-section"
                className="text-[#D7E2EA] font-semibold text-sm md:text-lg lg:text-[1.15rem] xl:text-[1.3rem] hover:opacity-70 transition-opacity duration-200"
              >
                پروژه‌ها
              </a>
              <a
                href="#skills-section"
                className="text-[#D7E2EA] font-semibold text-sm md:text-lg lg:text-[1.15rem] xl:text-[1.3rem] hover:opacity-70 transition-opacity duration-200"
              >
                مهارت‌ها
              </a>
              <button
                onClick={triggerContactModal}
                className="text-[#D7E2EA] font-semibold text-sm md:text-lg lg:text-[1.15rem] xl:text-[1.3rem] hover:opacity-70 transition-opacity duration-200 bg-transparent border-0 cursor-pointer"
              >
                تماس
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center z-50">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white focus:outline-none p-2 bg-neutral-900/50 rounded-full border border-white/5 active:scale-95 transition-transform cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            <div className="text-xl md:text-2xl font-black italic tracking-tighter text-white select-none hover:opacity-80 transition-opacity duration-300 font-sans">
              ERFAN
            </div>
          </div>
        </FadeIn>

        {/* Hero Portrait - uses custom avatar from ChatGPT sharing link with Figma backup */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[500px] top-[34%] -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-[12%] pointer-events-none">
          <FadeIn delay={0.6} y={30}>
            <Magnet padding={150} strength={3}>
              <img
                src={avatarSrc}
                onError={() => {
                  // Fallback to the beautiful original figma element dynamically if link doesn't resolve to a direct image
                  setAvatarSrc("https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png");
                }}
                alt="محمد عرفان رحمانیان - توسعه‌دهنده فرانت‌اند"
                className="w-full h-auto object-contain select-none pointer-events-auto"
                referrerPolicy="no-referrer"
              />
            </Magnet>
          </FadeIn>
        </div>

        {/* Hero Heading Container */}
        <div className="flex-1 flex flex-col justify-start pt-12 sm:pt-16 md:pt-10 overflow-hidden relative z-0">
          <FadeIn delay={0.15} y={40} className="w-full">
            <h1 className="hero-heading font-black tracking-tight leading-none text-center whitespace-nowrap w-full text-[12vw] sm:text-[13vw] md:text-[14vw] lg:text-[15vw] mt-6 sm:mt-4 md:-mt-5 uppercase">
              hi, i&apos;m erfan
            </h1>
          </FadeIn>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 w-full z-20">
          <FadeIn delay={0.35} y={20} className="flex flex-col gap-1 items-start text-right">
            <p
              className="text-white font-black text-right mb-1 tracking-tight"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.8rem)' }}
            >
              محمد عرفان رحمانیان
            </p>
            <p
              className="text-[#D7E2EA] font-light leading-relaxed max-w-[200px] sm:max-w-[280px] md:max-w-[340px] text-right"
              style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1.35rem)' }}
            >
              توسعه‌دهنده فرانت‌اند متخصص در ایجاد رابط‌های کاربری مدرن، واکنش‌گرا و وب‌سایت‌های به یادماندنی.
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <div className="flex gap-3">
              <ContactButton onClick={triggerContactModal}>
                مشاهده پروژه‌ها
              </ContactButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. MARQUEE SECTION */}
      <section
        ref={marqueeSectionRef}
        id="marquee-section"
        className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 w-full overflow-hidden"
      >
        <div className="flex flex-col gap-3 py-1 bg-[#0C0C0C] marquee-mask">
          {/* Row 1 - Moves RIGHT on scroll */}
          <div className="overflow-hidden w-full select-none">
            <div
              className="flex gap-3 whitespace-nowrap transition-transform duration-150 ease-out py-1"
              style={{
                transform: `translate3d(${scrollOffset - 200}px, 0px, 0px)`,
                willChange: 'transform',
              }}
            >
              {row1Gifs.map((url, i) => (
                <div
                  key={`r1-${i}`}
                  className="board-card w-[280px] h-[180px] min-w-[280px] min-h-[180px] sm:w-[420px] sm:h-[270px] sm:min-w-[420px] sm:min-h-[270px] rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={url}
                    alt="پیش‌نمایش فرانت‌اند"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Moves LEFT on scroll */}
          <div className="overflow-hidden w-full select-none">
            <div
              className="flex gap-3 whitespace-nowrap transition-transform duration-150 ease-out py-1"
              style={{
                transform: `translate3d(${-(scrollOffset - 200)}px, 0px, 0px)`,
                willChange: 'transform',
              }}
            >
              {row2Gifs.map((url, i) => (
                <div
                  key={`r2-${i}`}
                  className="board-card w-[280px] h-[180px] min-w-[280px] min-h-[180px] sm:w-[420px] sm:h-[270px] sm:min-w-[420px] sm:min-h-[270px] rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={url}
                    alt="نمای کاربری"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section
        id="about-section"
        className="relative min-h-screen flex flex-col justify-center items-center py-20 px-5 sm:px-8 md:px-10 overflow-hidden w-full bg-[#0C0C0C]"
      >
        {/* Corner Hovering and Floating Decor Icons */}
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D element moon"
          className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 w-[120px] sm:w-[160px] md:w-[210px] opacity-40 sm:opacity-75"
          duration={6.5}
        />

        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D element star"
          className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0 w-[100px] sm:w-[140px] md:w-[180px] opacity-40 sm:opacity-75"
          duration={8}
          delay={0.3}
        />

        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D element Lego"
          className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 w-[120px] sm:w-[160px] md:w-[210px] opacity-40 sm:opacity-75"
          duration={5}
          delay={0.1}
        />

        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D element Spheres"
          className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0 w-[130px] sm:w-[170px] md:w-[220px] opacity-40 sm:opacity-75"
          duration={7}
          delay={0.4}
        />

        {/* Core Content Layout */}
        <div className="flex flex-col items-center justify-center text-center z-10 w-full max-w-4xl px-2">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}
            >
              درباره من
            </h2>
          </FadeIn>

          {/* About Erfan's background details */}
          <div className="mt-10 sm:mt-12 md:mt-14 w-full flex justify-center">
            <AnimatedText
              text="من توسعه‌دهنده فرانت‌اند با بیش از چهار سال تجربه عملی در ایجاد رابط‌های کاربری مدرن و واکنش‌گرا هستم. متخصص در پیاده‌سازی پروژه‌های تک‌صفحه‌ای و پلتفرم‌های تعاملی با React ،Next.js ،TypeScript و Angular با تمرکز حداکثری بر بهینه‌سازی عملکرد لود و خلق تجربه‌های کاربری بی‌نقص. علاقه فراوانی به یادگیری فناوری‌های نوین، پیاده‌سازی ایده‌های استارتاپی، طراحی تمیز و ارائه‌ی استانداردهای نوین فرانت‌اند دارم."
              className="max-w-[700px] leading-relaxed text-[#D7E2EA] font-light text-right"
            />
          </div>

          {/* Core Info Cards / Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12 text-right">
            
            {/* Quick Profile Bio */}
            <FadeIn delay={0.1} y={30} className="board-card backdrop-blur-md rounded-3xl p-6 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <User className="text-[#B600A8] w-5 h-5" />
                <h3 className="font-bold text-white text-lg">مشخصات فردی</h3>
              </div>
              <ul className="space-y-3 text-sm text-[#D7E2EA]/80">
                <li><strong className="text-white">نام کامل:</strong> محمد عرفان رحمانیان</li>
                <li><strong className="text-white">سن:</strong> 21 سال (متولد 1383)</li>
                <li><strong className="text-white">وضعیت تأهل:</strong> مجرد</li>
                <li><strong className="text-white">آدرس:</strong> یزد، خیابان کاشانی</li>
                <li><strong className="text-white">وضعیت نظام وظیفه:</strong> معافیت تحصیلی</li>
              </ul>
            </FadeIn>

            {/* Academic & Languages */}
            <FadeIn delay={0.2} y={30} className="board-card backdrop-blur-md rounded-3xl p-6 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-[#B600A8] w-5 h-5" />
                <h3 className="font-bold text-white text-lg">تحصیلات و زبان‌ها</h3>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-white">کارشناسی مهندسی کامپیوتر</h4>
                <p className="text-xs text-[#D7E2EA]/60 mt-1">دانشگاه آزاد اسلامی یزد</p>
                <p className="text-xs text-[#B600A8] mt-0.5">۱۴۰۲ – در حال تحصیل</p>
              </div>
              <div className="border-t border-[#D7E2EA]/10 pt-3">
                <h4 className="text-xs uppercase tracking-wider text-[#D7E2EA]/60 mb-2 font-medium">تسلط به زبان‌ها</h4>
                <div className="flex justify-between items-center text-sm py-1">
                  <span>انگلیسی</span>
                  <span className="text-xs bg-neutral-800 text-[#D7E2EA] px-2 py-0.5 rounded-full">متوسط (اسناد فنی)</span>
                </div>
                <div className="flex justify-between items-center text-sm py-1">
                  <span>عربی</span>
                  <span className="text-xs bg-neutral-800 text-[#D7E2EA]/60 px-2 py-0.5 rounded-full">مقدماتی</span>
                </div>
              </div>
            </FadeIn>

            {/* Career Goals Block */}
            <FadeIn delay={0.3} y={30} className="board-card backdrop-blur-md rounded-3xl p-6 transition-all duration-300 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-[#B600A8] w-5 h-5" />
                <h3 className="font-bold text-white text-lg">اهداف شغلی و آینده</h3>
              </div>
              <p className="text-sm text-[#D7E2EA]/80 leading-relaxed font-light">
                جستجوی فرصت‌های فرانت‌اند چالش‌برانگیز در تیم‌های فنی پیشرو برای توسعه پروژه‌های مدرن مقیاس‌پذیر. یکی از اهداف بلندمدت و بسیار قدرتمند من، راه‌اندازی استارتاپ و شرکت فناورانه‌ی شخصی خودم در جهان تکنولوژی است.
              </p>
              <div className="mt-4 flex items-center justify-between text-xs bg-[#B600A8]/10 text-[#D7E2EA] p-3 rounded-2xl border border-[#B600A8]/20">
                <span>حقوق مورد انتظار:</span>
                <span className="font-bold">توافقی / منصفانه</span>
              </div>
            </FadeIn>

          </div>

          <div className="mt-12">
            <a href="#projects-section" className="inline-block text-sm border-b border-[#D7E2EA] pb-1 hover:text-[#B600A8] hover:border-[#B600A8] transition-colors duration-300">
              مشاهده تمامی پروژه‌ها و سوابق تجاری
            </a>
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE PROFILE SECTION */}
      <section
        id="experience-section"
        className="relative py-24 px-5 sm:px-8 md:px-10 bg-[#101010]/95 border-y border-[#D7E2EA]/10 w-full overflow-hidden"
      >
        {/* Animated background decoration */}
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Star"
          className="absolute top-[10%] left-[2%] sm:left-[4%] w-[60px] sm:w-[110px] md:w-[130px] z-0 opacity-20 sm:opacity-35"
          duration={6}
        />
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D Sphere cluster"
          className="absolute bottom-[8%] left-[2%] sm:left-[5%] w-[65px] sm:w-[115px] md:w-[145px] z-0 opacity-20 sm:opacity-35"
          duration={7.5}
          delay={0.2}
        />
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D Lego"
          className="absolute top-[20%] right-[2%] sm:right-[4%] w-[55px] sm:w-[90px] md:w-[115px] z-0 opacity-25"
          duration={5.2}
          delay={0.4}
        />
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon"
          className="absolute bottom-[22%] right-[2%] sm:right-[5%] w-[60px] sm:w-[95px] md:w-[125px] z-0 opacity-20 sm:opacity-30"
          duration={6.8}
          delay={0.1}
        />
        <div className="max-w-4xl mx-auto w-full text-right">
          <FadeIn delay={0} y={40}>
            <span className="text-[#B600A8] text-xs font-semibold tracking-widest uppercase block mb-2">سوابق حرفه‌ای من</span>
            <h2
              className="font-black text-white tracking-tight mb-16"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)' }}
            >
              تجربه کاری و پروژه‌ها
            </h2>
          </FadeIn>

          {/* Timeline */}
          <div className="relative border-r border-[#D7E2EA]/15 pr-6 sm:pr-8 space-y-12">
            {EXPERIENCES.map((item, index) => (
              <FadeIn key={index} delay={index * 0.15} y={30} className="relative">
                {/* Visual bullet circle */}
                <div className="absolute top-1.5 -right-[31px] sm:-right-[39px] w-4 h-4 rounded-full bg-[#B600A8] border-4 border-[#101010] shadow-md shadow-[#B600A8]/40" />

                <div className="board-card p-6 sm:p-8 rounded-[30px] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row-reverse justify-between sm:items-center gap-2 mb-4 pb-4 border-b border-[#D7E2EA]/5">
                    <span className="text-xs sm:text-sm bg-[#B600A8]/15 text-[#D7E2EA] px-3.5 py-1 rounded-full border border-[#B600A8]/30 font-semibold self-start sm:self-auto">
                      {item.duration}
                    </span>
                    <div>
                      <h3 className="font-bold text-white text-lg sm:text-xl">{item.role}</h3>
                      <p className="text-sm text-[#D7E2EA]/60 font-semibold mt-1">{item.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#D7E2EA]/50 mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2.5 text-sm sm:text-base text-[#D7E2EA]/80 font-light pr-4 list-disc list-inside">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed hover:text-white transition-colors">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5 CYBERSECURITY & COURSES SECTION */}
      <section
        id="cybersecurity-section"
        className="py-24 px-5 sm:px-8 md:px-10 bg-[#0C0C0C]/50 backdrop-blur-3xl w-full relative z-20 border-t border-b border-[#D7E2EA]/10 overflow-hidden"
      >
        {/* Decorative background elements and glow */}
        <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-[#B600A8]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-[#7621B0]/5 rounded-full blur-[100px] pointer-events-none" />

        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Glass Star"
          className="absolute top-[15%] left-[3%] w-[60px] sm:w-[100px] md:w-[120px] z-0 opacity-20 sm:opacity-30"
          duration={6}
        />
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon"
          className="absolute bottom-[15%] right-[3%] w-[65px] sm:w-[110px] md:w-[130px] z-0 opacity-20 sm:opacity-30"
          duration={7}
          delay={0.3}
        />

        <div className="max-w-5xl mx-auto w-full text-right relative z-10">
          <FadeIn delay={0} y={40}>
            <span className="text-[#B600A8] text-xs font-semibold tracking-widest uppercase block mb-2 font-sans md:text-sm">SECURITY & CERTIFICATIONS</span>
            <h2
              className="font-black text-white tracking-tight mb-16"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)' }}
            >
              امنیت سایبری و دوره‌های تخصصی
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Top Cards: Cybersecurity Key Focus Areas */}
            <div className="lg:col-span-5 space-y-6">
              <FadeIn delay={0.1} y={30}>
                <div className="board-card backdrop-blur-md rounded-[32px] p-6 sm:p-8 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6 justify-end">
                    <h3 className="font-extrabold text-white text-lg sm:text-xl">تخصص و مهارت‌های امنیتی</h3>
                    <div className="p-2.5 bg-[#B600A8]/10 rounded-2xl border border-[#B600A8]/20 text-[#B600A8] flex items-center justify-center">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                  
                  <p className="text-[#D7E2EA]/70 text-sm leading-relaxed mb-6 font-light">
                    با توجه به علاقه شدید و پژوهش‌های مستمر من در زمینه امنیت وب، تست نفوذ و مهندسی معکوس کدهای سمت کلاینت، همواره تلاش می‌کنم محصولات فرانت‌اند را با بالاترین استانداردهای دفاع سایبری توسعه دهم.
                  </p>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 justify-end text-right">
                      <div className="text-sm">
                        <span className="text-white font-semibold block">امن‌سازی کدهای React & Next.js</span>
                        <span className="text-xs text-[#D7E2EA]/60 font-light">مقاوم‌سازی در برابر حملات تزریق، مدیریت هدرهای امنیتی و اعتبارسنجی ورودی‌ها</span>
                      </div>
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center border border-white/5 text-[#B600A8]">
                        <Check className="w-3 h-3" />
                      </div>
                    </li>
                    <li className="flex items-start gap-3 justify-end text-right">
                      <div className="text-sm">
                        <span className="text-white font-semibold block">آشنایی با متدولوژی OWASP Top 10</span>
                        <span className="text-xs text-[#D7E2EA]/60 font-light">شناسایی و خنثی‌سازی آسیب‌پذیری‌های رایج وب مانند XSS, CSRF و SSRF</span>
                      </div>
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center border border-white/5 text-[#B600A8]">
                        <Check className="w-3 h-3" />
                      </div>
                    </li>
                    <li className="flex items-start gap-3 justify-end text-right">
                      <div className="text-sm">
                        <span className="text-white font-semibold block">تست نفوذ و تحلیل آسیب‌پذیری کلاینت</span>
                        <span className="text-xs text-[#D7E2EA]/60 font-light">تحقیق عمیق مستمر روی آسیب‌پذیری‌های DOM-based و ابزارهای مانیتور ترافیک</span>
                      </div>
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center border border-white/5 text-[#B600A8]">
                        <Check className="w-3 h-3" />
                      </div>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              {/* Lab Platforms */}
              <FadeIn delay={0.2} y={30}>
                <div className="board-card rounded-[32px] p-6 flex items-center justify-between gap-4">
                  <div className="text-right">
                    <span className="text-xs text-[#B600A8] font-bold block mb-1">پلتفرم‌های یادگیری عملی</span>
                    <span className="text-sm text-white font-bold block">فعالیت مستمر و حل چالش‌های امنیتی</span>
                    <span className="text-xs text-[#D7E2EA]/50 font-light block mt-1">HackTheBox & TryHackMe Labs</span>
                  </div>
                  <div className="p-3 bg-neutral-950 rounded-2xl border border-white/10 text-white font-mono text-xs text-center flex-shrink-0 flex flex-col justify-center">
                    <Terminal className="w-5 h-5 mx-auto mb-1 text-[#B600A8]" />
                    <span>Labs Active</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Cards: Completed Courses List */}
            <div className="lg:col-span-7 space-y-6">
              <FadeIn delay={0.15} y={30}>
                <div className="board-card backdrop-blur-md rounded-[32px] p-6 sm:p-8 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-8 justify-end">
                    <h3 className="font-extrabold text-white text-lg sm:text-xl">دوره‌ها و مدارک علمی سپری‌شده</h3>
                    <div className="p-2.5 bg-[#B600A8]/10 rounded-2xl border border-[#B600A8]/20 text-[#B600A8] flex items-center justify-center">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Course 1 */}
                    <div className="relative pr-6 border-r border-[#B600A8]/30 pb-4">
                      <div className="absolute top-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#B600A8]" />
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] bg-[#B600A8]/15 text-[#D7E2EA] px-2.5 py-0.5 rounded-full border border-[#B600A8]/25 font-mono">
                          ۱۴۰۴ (تخصصی)
                        </span>
                        <h4 className="text-white font-bold text-sm sm:text-base">دوره جامع تست نفوذ وب و باگ بانتی (SANS SEC542)</h4>
                      </div>
                      <p className="text-[#D7E2EA]/70 text-xs sm:text-sm font-light">
                        آموزش تخصصی مفاهیم عمیق کشف و اکسپلویت کردن آسیب‌پذیری‌های وب، تست نفوذ نوین اپلیکیشن‌ها و مکانیزم‌های دفاعی OWASP.
                      </p>
                    </div>

                    {/* Course 2 */}
                    <div className="relative pr-6 border-r border-[#B600A8]/30 pb-4">
                      <div className="absolute top-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#B600A8]" />
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] bg-[#B600A8]/15 text-[#D7E2EA] px-2.5 py-0.5 rounded-full border border-[#B600A8]/25 font-mono">
                          ۱۴۰۳ (مقدماتی تا پیشرفته)
                        </span>
                        <h4 className="text-white font-bold text-sm sm:text-base">دوره امنیت لینوکس و سیستم‌عامل Kali Linux</h4>
                      </div>
                      <p className="text-[#D7E2EA]/70 text-xs sm:text-sm font-light">
                        تسلط بر مفاهیم امنیت لینوکس، پیکربندی سرویس‌های امن، اسکریپت‌نویسی Bash و کاربری حرفه‌ای Kali Linux جهت تست بقای سرویس‌ها.
                      </p>
                    </div>

                    {/* Course 3 */}
                    <div className="relative pr-6 border-r border-[#B600A8]/30 pb-4">
                      <div className="absolute top-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#B600A8]" />
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] bg-[#B600A8]/15 text-[#D7E2EA] px-2.5 py-0.5 rounded-full border border-[#B600A8]/25 font-mono">
                          ۱۴۰۲ (مدرک بین‌المللی)
                        </span>
                        <h4 className="text-white font-bold text-sm sm:text-base">دوره مهندسی امنیت وب دوره‌ تخصصی CompTIA Security+</h4>
                      </div>
                      <p className="text-[#D7E2EA]/70 text-xs sm:text-sm font-light">
                        آموزش عمیق الگوهای پایه هک قانونمند، ساختار شبکه، پروتکل‌های رمزنگاری داده‌ها، هویت‌سنجی و مبانی امنیت اطلاعات سازمان‌ها.
                      </p>
                    </div>

                    {/* Course 4 */}
                    <div className="relative pr-6 border-r border-[#B600A8]/30 pb-2">
                      <div className="absolute top-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#B600A8]" />
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] bg-[#B600A8]/15 text-[#D7E2EA] px-2.5 py-0.5 rounded-full border border-[#B600A8]/25 font-mono">
                          ۱۴۰۱ - ۱۴۰۲ (طراحی پیشرفته)
                        </span>
                        <h4 className="text-white font-bold text-sm sm:text-base">دوره‌های پیشرفته معماری مایکروفرانت‌اند و بهینه‌سازی React</h4>
                      </div>
                      <p className="text-[#D7E2EA]/70 text-xs sm:text-sm font-light">
                        گذراندن دوره‌های جامع فریم‌ورک‌های توسعه سمت کاربر، کار با TypeScript پیشرفته، امنیت کوکی‌ها و الگوهای مدیریت وضعیت کلاینت.
                      </p>
                    </div>

                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE ALL PROJECTS EXPLORER */}
      <section
        id="projects-section"
        className="py-24 px-5 sm:px-8 md:px-10 bg-[#0C0C0C] w-full relative z-30 border-b border-[#D7E2EA]/10 overflow-hidden"
      >
        {/* Animated background decoration */}
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D Lego piece"
          className="absolute top-[8%] right-[2%] w-[60px] sm:w-[110px] md:w-[130px] z-0 opacity-20 sm:opacity-35"
          duration={5}
        />
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon"
          className="absolute bottom-[4%] left-[2%] w-[65px] sm:w-[115px] md:w-[145px] z-0 opacity-20 sm:opacity-35"
          duration={6.8}
          delay={0.3}
        />
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Glass Star"
          className="absolute top-[12%] left-[2%] w-[55px] sm:w-[95px] md:w-[125px] z-0 opacity-20 sm:opacity-30"
          duration={7.2}
          delay={0.1}
        />
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D Spheres"
          className="absolute bottom-[8%] right-[2%] w-[60px] sm:w-[100px] md:w-[135px] z-0 opacity-20 sm:opacity-30"
          duration={6.4}
          delay={0.5}
        />
        <div className="max-w-6xl mx-auto w-full text-right">
          <FadeIn delay={0} y={40}>
            <span className="text-[#B600A8] text-xs font-semibold tracking-widest uppercase block mb-2 font-sans md:text-sm">SHOWCASE</span>
            <h2
              className="font-black text-white tracking-tight text-center mb-6"
              style={{ fontSize: 'clamp(2.2rem, 8vw, 4.5rem)' }}
            >
              پروژه‌های شاخص
            </h2>
            <p className="text-[#D7E2EA]/60 max-w-xl mx-auto text-center font-light mb-12 text-sm sm:text-base">
              عرفان در طول بیش از ۲ سال فعالیت مستمر اقدام به مهندسی، بازطراحی و پشتیبانی ده پروژه‌ی کاربردی وب نموده است. از فیلترهای زیر استفاده کنید و جزئیات هر پروژه را پایش کنید.
            </p>
          </FadeIn>

          {/* Filter block tabs */}
          <FadeIn delay={0.1} y={20} className="flex flex-wrap justify-center gap-2 mb-12">
            {['همه', 'Next.js & React', 'داشبورد & پنل ادمین', 'سامانه‌ها و سایر'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProjectFilter(tab)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeProjectFilter === tab
                    ? 'bg-[#B600A8] text-white border border-[#B600A8] shadow-lg shadow-[#B600A8]/20'
                    : 'bg-neutral-900 text-[#D7E2EA]/70 hover:text-white border border-white/5 hover:border-[#D7E2EA]/25'
                }`}
              >
                {tab}
              </button>
            ))}
          </FadeIn>

          {/* Dynamic grid mapping of 10 portfolio projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className="board-card rounded-[32px] p-6 sm:p-7 flex flex-col justify-between h-80 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-black/50"
                >
                  <div className="w-full text-right flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-3xl font-black text-white/10 group-hover:text-[#B600A8]/30 transition-colors">
                        {project.num}
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[#D7E2EA]/70 border border-white/5 uppercase font-medium">
                        {project.category.split(' ').slice(0, 2).join(' ')}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-lg sm:text-xl group-hover:text-[#B600A8] transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D7E2EA]/60 font-light leading-relaxed mt-2.5 line-clamp-3 select-none">
                      {project.desc}
                    </p>
                  </div>

                  <div className="w-full">
                    {/* Tec badges preview */}
                    <div className="flex flex-wrap gap-1.5 mb-4 max-h-7 overflow-hidden">
                      {project.tech.slice(0, 3).map((t, tIdx) => (
                        <span key={tIdx} className="text-[10px] bg-neutral-800 text-[#D7E2EA]/80 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-[10px] bg-neutral-800 text-[#D7E2EA]/50 px-1.5 py-0.5 rounded">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-xs text-[#B600A8] group-hover:translate-x-[-4px] transition-transform font-semibold">
                      <span>مشاهده جزئیات کامل و کدها</span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 6. TECHNICAL SKILLS GRID */}
      <section
        id="skills-section"
        className="py-24 px-5 sm:px-8 md:px-10 bg-[#121212]/35 backdrop-blur-3xl text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] w-full z-10 relative border-t border-white/[0.08] overflow-hidden shadow-2xl"
      >
        {/* Animated Background 3D glass assets nested within skills */}
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D Spheres"
          className="absolute top-[15%] left-[2%] w-[60px] sm:w-[100px] md:w-[135px] z-0 opacity-20 sm:opacity-35"
          duration={8}
        />
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Star"
          className="absolute bottom-[20%] right-[2%] w-[60px] sm:w-[95px] md:w-[125px] z-0 opacity-20 sm:opacity-35"
          duration={6}
          delay={0.4}
        />
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D Lego"
          className="absolute top-[25%] right-[2%] w-[55px] sm:w-[90px] md:w-[115px] z-0 opacity-15 sm:opacity-25"
          duration={5.5}
          delay={0.2}
        />
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon"
          className="absolute bottom-[10%] left-[2%] w-[62px] sm:w-[98px] md:w-[130px] z-0 opacity-20 sm:opacity-30"
          duration={6.8}
          delay={0.6}
        />

        <div className="max-w-5xl mx-auto w-full text-right relative z-10">
          <FadeIn delay={0} y={40}>
            <span className="text-[#B600A8] text-xs font-bold tracking-widest uppercase block mb-2 font-sans">EXPERTISE</span>
            <h2
              className="text-white font-black uppercase mb-16 tracking-tighter"
              style={{ fontSize: 'clamp(2rem, 7vw, 3.8rem)' }}
            >
              مهارت‌ها و سطح تسلط
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {SKILL_CATEGORIES.map((cat, catIdx) => (
              <FadeIn key={catIdx} delay={catIdx * 0.1} y={30} className="board-card backdrop-blur-md rounded-[32px] p-6 sm:p-8 transition-all duration-300 space-y-6">
                <h3 className="font-extrabold text-white text-lg sm:text-xl border-b border-white/10 pb-3 flex items-center justify-between text-right">
                  <span className="text-xs bg-white/5 text-neutral-300 border border-white/5 px-2.5 py-0.5 rounded-full font-mono uppercase">
                    فصل {catIdx + 1}
                  </span>
                  <span>{cat.title}</span>
                </h3>
                
                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400 text-xs font-medium font-mono">{skill.level}</span>
                        <span className="font-bold text-white">{skill.name}</span>
                      </div>
                      {/* Visual progress bar bar */}
                      <div className="w-full h-1.5 bg-white/5 border border-white/[0.03] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, #7621B0 0%, #B600A8 100%)',
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RECENT BLOG POSTS */}
      <section
        id="blog-section"
        className="py-24 px-5 sm:px-8 md:px-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 w-full z-20 relative border-t border-[#D7E2EA]/10 shadow-2xl overflow-hidden"
      >
        {/* Animated background decoration */}
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Glass Star"
          className="absolute top-[8%] left-[2%] w-[60px] sm:w-[100px] z-0 opacity-20 sm:opacity-35"
          duration={7}
        />
        <Floating3DAsset
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon"
          className="absolute bottom-[10%] right-[2%] w-[65px] sm:w-[105px] z-0 opacity-20 sm:opacity-35"
          duration={6.2}
          delay={0.3}
        />
        <div className="max-w-5xl mx-auto w-full text-right">
          <FadeIn delay={0} y={40}>
            <span className="text-[#B600A8] text-xs font-semibold tracking-widest uppercase block mb-1">مقالات من</span>
            <h2
              className="hero-heading font-black uppercase mb-16 select-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 8vw, 3.8rem)' }}
            >
              آخرین نوشته‌های وبلاگ
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, index) => (
              <FadeIn
                key={index}
                delay={index * 0.1}
                y={30}
                className="board-card p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4 text-xs">
                    <span className="text-[#D7E2EA]/40 font-mono">{post.date}</span>
                    <span className="text-[#B600A8] bg-[#B600A8]/10 px-2 py-0.5 rounded-full border border-[#B600A8]/25">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-lg leading-snug group-hover:text-[#B600A8] transition-colors mb-3">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/60 font-light leading-relaxed mb-6">
                    {post.desc}
                  </p>
                </div>
                
                <a
                  href={post.link}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`این لینک مربوط به مقاله تخصصی عرفان است که به زودی روی ساب‌دومین پورتفولیو قرار می‌گیرد!`);
                  }}
                  className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white font-semibold group-hover:translate-x-[-3px] transition-transform self-start"
                >
                  <span>ادامه مطلب</span>
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </a>
              </FadeIn>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => alert('آرشیو کامل پست‌های عرفان به زودی در ماه‌های آینده بارگذاری خواهد شد.')}
              className="px-6 py-3 rounded-full border border-[#D7E2EA]/20 hover:border-[#D7E2EA] hover:bg-white/5 transition-colors text-xs font-semibold cursor-pointer"
            >
              مشاهده تمامی پست‌ها
            </button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER PART & SOCIAL LINKS */}
      <footer className="bg-[#070707] border-t border-[#D7E2EA]/10 py-16 px-6 md:px-10 text-right text-sm">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
          
          {/* Logo & Slogan */}
          <div className="space-y-4">
            <h4 className="text-white font-extrabold tracking-widest text-lg font-sans">M. ERFAN RAHMANIAN</h4>
            <p className="text-[#D7E2EA]/60 font-light leading-relaxed">
              توسعه‌دهنده فرانت‌اند متعهد به خلق سیستم‌های باکیفیت تجاری و علاقه‌مند به تحقیق در حوزه هک و امنیت کلاینت.
            </p>
            <div className="flex gap-4 pt-1 justify-start">
              <a
                href="https://github.com/erfan-rahmanian"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-white/5 text-[#D7E2EA]/70 hover:text-white hover:border-[#B600A8] transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-white/5 text-[#D7E2EA]/70 hover:text-white hover:border-[#B600A8] transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Menu */}
          <div className="md:pr-12">
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">ناوبری سریع</h4>
            <ul className="space-y-2.5 font-light text-[#D7E2EA]/70">
              <li><a href="#about-section" className="hover:text-white transition-colors">داستان من</a></li>
              <li><a href="#experience-section" className="hover:text-white transition-colors">سوابق رزومه</a></li>
              <li><a href="#cybersecurity-section" className="hover:text-white transition-colors">امنیت سایبری و دوره‌ها</a></li>
              <li><a href="#projects-section" className="hover:text-white transition-colors">لیست پروژه‌ها</a></li>
              <li><a href="#skills-section" className="hover:text-white transition-colors">کلان مهارت‌ها</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">تماس و لوکیشن</h4>
            <ul className="space-y-2.5 text-[#D7E2EA]/70 font-light">
              <li className="flex items-center gap-2 justify-start">
                <MapPin className="w-4 h-4 text-[#B600A8]" />
                <span>یزد، خیابان کاشانی</span>
              </li>
              <li className="flex items-center gap-2 justify-start">
                <Mail className="w-4 h-4 text-[#B600A8]" />
                <span>133rahmanian@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 justify-start">
                <Phone className="w-4 h-4 text-[#B600A8]" />
                <span dir="ltr">۰۹۱۳ ۴۶۴ ۵۹۶۱</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-5xl mx-auto w-full border-t border-white/5 pt-8 flex flex-col md:flex-row-reverse justify-between items-center gap-4 text-xs text-[#D7E2EA]/40 font-light">
          <p>© 2026 محمد عرفان رحمانیان. تمامی حقوق محفوظ است.</p>
          <p>طراحی و توسعه توسط محمد عرفان رحمانیان با استفاده از Next.js و Tailwind CSS.</p>
        </div>
      </footer>

      {/* PERSISTENT PORTFOLIO PROJECT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#121212] border border-[#D7E2EA]/15 rounded-[36px] shadow-2xl z-10 text-right p-6 sm:p-8 md:p-10 scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-transparent"
              dir="rtl"
            >
              {/* Top decor strip */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  background: 'linear-gradient(90deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/10 text-[#D7E2EA]/60 hover:text-white cursor-pointer transitioning border border-transparent hover:border-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pb-4 mb-6 border-b border-white/10 flex items-center gap-4">
                <span className="text-4xl font-black text-[#B600A8]/30 font-mono select-none">
                  {selectedProject.num}
                </span>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold block">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {selectedProject.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-6 text-sm leading-relaxed text-[#D7E2EA]/85">
                <div>
                  <h4 className="text-white font-bold text-base mb-2">خلاصه پروژه:</h4>
                  <p className="font-light">{selectedProject.desc}</p>
                </div>

                <div>
                  <h4 className="text-white font-bold text-base mb-2">توضیحات و عملکرد فنی:</h4>
                  <p className="font-light text-xs sm:text-sm text-[#D7E2EA]/70">
                    {selectedProject.details}
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2.5">تکنولوژی‌های استفاده شده:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, idx) => (
                      <span key={idx} className="bg-neutral-800 text-white px-3 py-1 rounded-full text-xs border border-white/5 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row-reverse justify-end gap-3">
                <button
                  type="button"
                  onClick={() => alert(`نسخه دمو مستقیم از ${selectedProject.name} بزودی بارگذاری خواهد شد!`)}
                  className="px-6 py-2.5 bg-[#B600A8] hover:bg-[#B600A8]/90 text-white rounded-full text-xs sm:text-sm font-semibold cursor-pointer text-center"
                >
                  مشاهده نسخه آنلاین
                </button>
                <button
                  type="button"
                  onClick={() => alert(`کدهای منبع این پروژه به زودی روی مخزن گیت‌هاب عمومی محمد عرفان رحمانیان سینک خواهد شد.`)}
                  className="px-6 py-2.5 bg-neutral-850 hover:bg-neutral-800 border border-white/10 text-[#D7E2EA] rounded-full text-xs sm:text-sm font-semibold cursor-pointer text-center"
                >
                  مخزن گیت‌هاب (Github)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. FLOATING CONTACT MODAL */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-neutral-950/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.4 }}
              className="relative w-full max-w-md max-h-[85vh] overflow-y-auto bg-[#121212] border border-[#D7E2EA]/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-right scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-transparent"
              dir="rtl"
            >
              {/* Decorative top strip */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: 'linear-gradient(90deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
              />

              <div className="flex justify-between items-start mb-6">
                <div className="text-right w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 tracking-wide justify-start">
                    ارسال پیام به عرفان <Sparkles className="w-5 h-5 text-[#B600A8] animate-spin" style={{ animationDuration: '6s' }} />
                  </h3>
                  <p className="text-xs text-[#D7E2EA]/50 font-light mt-1.5 animate-pulse">
                    پیام شما رمزنگاری شده و به ایمیل رسمی محمد عرفان رحمانیان فوروارد می‌شود.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsContactOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#D7E2EA]/10 border border-transparent hover:border-[#D7E2EA]/10 text-[#D7E2EA]/60 hover:text-white transition-all cursor-pointer mr-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {contactSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/35">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-1">پیام شما با موفقیت ارسال شد!</h4>
                  <p className="text-xs text-[#D7E2EA]/60 font-light max-w-xs leading-relaxed">
                    سپاسگزارم. پیام شما مستقیماً دریافت شد. به زودی به آدرس ایمیل ثبت‌شده تان جواب خواهم داد.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-right">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium mb-1.5 text-right">
                      نام شما
                    </label>
                    <input
                      type="text"
                      required
                      value={nameVal}
                      onChange={(e) => setNameVal(e.target.value)}
                      placeholder="مانند: علی رضایی"
                      className="w-full bg-neutral-900 border border-[#D7E2EA]/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8] transition-colors text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium mb-1.5 text-right">
                      ایمیل شما
                    </label>
                    <input
                      type="email"
                      required
                      value={emailVal}
                      onChange={(e) => setEmailVal(e.target.value)}
                      placeholder="example@domain.com"
                      className="w-full bg-neutral-900 border border-[#D7E2EA]/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8] transition-colors text-right"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium mb-1.5 text-right">
                      پیام شما
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={msgVal}
                      onChange={(e) => setMsgVal(e.target.value)}
                      placeholder="پیام خود را اینجا بنویسید..."
                      className="w-full bg-neutral-900 border border-[#D7E2EA]/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8] transition-colors resize-none text-right"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                    }}
                    className="w-full text-xs font-semibold py-3 sm:py-3.5 px-6 rounded-full uppercase tracking-widest text-white shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all mt-6"
                  >
                    <span>ارسال پیام</span>
                    <Send className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
