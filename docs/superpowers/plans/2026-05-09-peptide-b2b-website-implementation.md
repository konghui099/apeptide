# 多肽外贸B2B网站实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建完整的自建精品型多肽外贸B2B网站，包含技术内容中心、多语言支持、3D分子可视化、CRM和营销自动化

**Architecture:** Next.js 15全栈应用，使用App Router架构，PostgreSQL数据库，Algolia搜索，Make.com工作流自动化，Vercel部署

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, React Three Fiber, PostgreSQL, Prisma, Algolia, Make.com, Vercel, Google Analytics 4

---

## 文件结构

```
ankpiptide/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # i18n路由 (en, zh, ja, es)
│   │   ├── page.tsx              # 首页
│   │   ├── products/
│   │   │   ├── page.tsx         # 产品目录
│   │   │   └── [slug]/page.tsx  # 产品详情
│   │   ├── technical/
│   │   │   ├── page.tsx         # 技术内容中心
│   │   │   ├── knowledge/[slug]/ # 知识库文章
│   │   │   ├── docs/[slug]/     # 技术文档(COA/SDS/TDS)
│   │   │   └── blog/            # 技术博客
│   │   ├── capabilities/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── api/
│   │   ├── products/            # 产品API
│   │   ├── inquiries/           # 询盘API
│   │   ├── documents/           # 文档下载API
│   │   └── auth/               # 认证API
│   └── layout.tsx
├── components/
│   ├── ui/                      # 基础UI组件
│   ├── layout/                  # 布局组件(nav, footer)
│   ├── products/                # 产品相关组件
│   ├── technical/               # 技术内容组件
│   ├── forms/                   # 表单组件
│   └── 3d/                      # 3D可视化组件
├── lib/
│   ├── prisma.ts                # Prisma客户端
│   ├── algolia.ts               # Algolia配置
│   ├── i18n.ts                  # i18n配置
│   └── crm.ts                   # CRM逻辑
├── prisma/
│   └── schema.prisma            # 数据库schema
├── public/
│   ├── locales/                 # 翻译文件
│   │   ├── en.json
│   │   ├── zh.json
│   │   ├── ja.json
│   │   └── es.json
│   └── molecules/               # 3D分子模型
└── scripts/
    └── make-com-webhooks.ts     # Make.com webhook配置
```

---

## Phase 1: 项目初始化 (Task 1-5)

### Task 1: Next.js项目初始化

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `next.config.ts`
- Create: `.env.example`

- [ ] **Step 1: 创建package.json**

```json
{
  "name": "ankpiptide",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@prisma/client": "^6.0.0",
    "algoliasearch": "^5.0.0",
    "react-instantsearch": "^7.0.0",
    "@react-three/fiber": "^8.0.0",
    "@react-three/drei": "^9.0.0",
    "three": "^0.170.0",
    "next-intl": "^4.0.0",
    "zod": "^3.0.0",
    "@hookform/resolvers": "^3.0.0",
    "react-hook-form": "^7.0.0",
    "lucide-react": "^0.400.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/three": "^0.170.0",
    "prisma": "^6.0.0",
    "tailwindcss": "^4.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

- [ ] **Step 2: 创建tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: 创建tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 4: 创建next.config.ts**

```ts
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.algolia.net" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: 创建.env.example**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ankpiptide"

# Algolia
NEXT_PUBLIC_ALGOLIA_APP_ID="your-app-id"
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY="your-search-key"
ALGOLIA_ADMIN_KEY="your-admin-key"

# Make.com
MAKE_COM_WEBHOOK_URL="https://hook.eu1.make.com/your-webhook-id"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

- [ ] **Step 6: 安装依赖**

Run: `npm install`

Expected: 安装所有依赖包

- [ ] **Step 7: 提交**

```bash
git add -A
git commit -m "chore: initial Next.js 15 project setup with TypeScript and Tailwind"
```

---

### Task 2: 数据库Schema设计

**Files:**
- Create: `prisma/schema.prisma`

- [ ] **Step 1: 创建Prisma Schema**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id            String   @id @default(cuid())
  slug          String   @unique
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  translations  ProductTranslation[]
  categories    ProductCategory[]
  specifications ProductSpecification[]
  documents     Document[]
  literature    Literature[]
  molecules     Molecule[] // 3D models
}

model ProductTranslation {
  id          String  @id @default(cuid())
  productId   String
  locale      String  // en, zh, ja, es
  name        String
  description String? @db.Text
  application String? @db.Text

  product     Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([productId, locale])
}

model Category {
  id          String @id @default(cuid())
  slug        String @unique

  translations CategoryTranslation[]
  products    ProductCategory[]
}

model CategoryTranslation {
  id         String  @id @default(cuid())
  categoryId String
  locale     String
  name       String

  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@unique([categoryId, locale])
}

model ProductCategory {
  productId  String
  categoryId String

  product  Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  category Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@id([productId, categoryId])
}

model ProductSpecification {
  id          String @id @default(cuid())
  productId   String
  key         String // 如: purity, sequence_length, molecular_weight
  value       String
  unit        String?

  product     Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Document {
  id          String   @id @default(cuid())
  productId   String?
  type        DocumentType
  locale      String
  title       String
  fileUrl     String
  version     String   @default("1.0")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  product     Product? @relation(fields: [productId], references: [id], onDelete: SetNull)
}

enum DocumentType {
  COA   // Certificate of Analysis
  SDS   // Safety Data Sheet
  TDS   // Technical Data Sheet
}

model Literature {
  id          String @id @default(cuid())
  productId   String
  title       String
  authors     String?
  journal     String?
  doi         String?
  year        Int?
  url         String?

  product     Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Molecule {
  id          String @id @default(cuid())
  productId   String
  modelUrl    String // 3D模型文件URL
  thumbnailUrl String?
  createdAt   DateTime @default(now())

  product     Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Inquiry {
  id            String      @id @default(cuid())
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  // 客户信息
  companyName   String?
  contactName   String
  email         String
  phone         String?
  country       String?
  message       String?     @db.Text

  // 询盘分级
  grade         InquiryGrade @default(C)

  // 关联产品
  products      InquiryProduct[]

  // 状态追踪
  status        InquiryStatus @default(NEW)
  assignedTo    String?
  notes         String?     @db.Text
}

enum InquiryGrade {
  A  // 高价值: 医药原料, 大额订单
  B  // 中价值: 科研用途, 中等订单
  C  // 低价值: 通用询盘
}

enum InquiryStatus {
  NEW
  REVIEWED
  REPLIED
  NEGOTIATING
  CLOSED_WON
  CLOSED_LOST
}

model InquiryProduct {
  inquiryId String
  productId String
  quantity  String?
  purity    String?

  inquiry   Inquiry @relation(fields: [inquiryId], references: [id], onDelete: Cascade)
  product  Product @relation(fields: [productId], references: [id], onDelete: SetNull)

  @@id([inquiryId, productId])
}

model TechnicalArticle {
  id          String   @id @default(cuid())
  slug        String   @unique
  locale      String
  title       String
  content     String   @db.Text
  excerpt     String?  @db.Text
  author      String?
  publishedAt DateTime @default(now())
  updatedAt   DateTime @updatedAt
  tags       String[]

  translations TechnicalArticleTranslation[]
}

model TechnicalArticleTranslation {
  id           String @id @default(cuid())
  articleId    String
  locale       String
  title        String
  content      String @db.Text
  excerpt      String? @db.Text

  article      TechnicalArticle @relation(fields: [articleId], references: [id], onDelete: Cascade)

  @@unique([articleId, locale])
}

model FAQ {
  id          String @id @default(cuid())
  locale      String
  question    String
  answer      String @db.Text
  category    String @default("general")
  sortOrder   Int    @default(0)
}

model SiteSettings {
  id    String @id @default("settings")
  locale String @unique
  // SEO
  ogImage     String?
  // 联系信息
  address     String?
  phone       String?
  email       String?
  // 社交媒体
  linkedinUrl String?
  twitterUrl  String?
}
```

- [ ] **Step 2: 生成Prisma Client**

Run: `npx prisma generate`

Expected: Prisma Client generated successfully

- [ ] **Step 3: 提交**

```bash
git add -A
git commit -m "feat: add Prisma schema with Product, Inquiry, TechnicalArticle models"
```

---

### Task 3: 基础UI组件库

**Files:**
- Create: `lib/utils.ts`
- Create: `components/ui/button.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/section.tsx`
- Create: `components/ui/container.tsx`

- [ ] **Step 1: 创建cn工具函数**

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: 创建Button组件**

```tsx
// components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700",
        outline: "border border-primary-600 text-primary-600 hover:bg-primary-50",
        ghost: "hover:bg-primary-100 text-primary-900",
        link: "text-primary-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

- [ ] **Step 3: 创建Input组件**

```tsx
// components/ui/input.tsx
import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
```

- [ ] **Step 4: 创建Badge组件**

```tsx
// components/ui/badge.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-600 text-white",
        secondary: "border-transparent bg-gray-100 text-gray-900",
        success: "border-transparent bg-green-100 text-green-800",
        warning: "border-transparent bg-yellow-100 text-yellow-800",
        danger: "border-transparent bg-red-100 text-red-800",
        outline: "text-gray-900 border-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
```

- [ ] **Step 5: 创建Card组件**

```tsx
// components/ui/card.tsx
import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-white shadow-sm", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-xl font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";
```

- [ ] **Step 6: 创建Section和Container组件**

```tsx
// components/ui/section.tsx
import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("w-full py-12 md:py-24 lg:py-32", className)}
      {...props}
    />
  );
}

// components/ui/container.tsx
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto max-w-7xl px-4 md:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
```

- [ ] **Step 7: 提交**

```bash
git add -A
git commit -m "feat: add base UI component library (Button, Input, Badge, Card, Section, Container)"
```

---

### Task 4: 布局组件 (导航栏+页脚)

**Files:**
- Create: `components/layout/header.tsx`
- Create: `components/layout/footer.tsx`
- Create: `components/layout/locale-switcher.tsx`
- Create: `components/layout/mobile-menu.tsx`
- Create: `app/[locale]/layout.tsx`

- [ ] **Step 1: 创建Header组件**

```tsx
// components/layout/header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/products", labelKey: "nav.products" },
  { href: "/technical", labelKey: "nav.technical" },
  { href: "/capabilities", labelKey: "nav.capabilities" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-primary-600">
              AnkiPotide
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary-600",
                    pathname === item.href ? "text-primary-600" : "text-gray-600"
                  )}
                >
                  {item.labelKey}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:inline-flex">
              技术文档
            </Button>
            <Button size="sm" className="hidden md:inline-flex">
              询价
            </Button>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium"
              >
                {item.labelKey}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: 创建Footer组件**

```tsx
// components/layout/footer.tsx
import Link from "next/link";

const footerLinks = {
  products: [
    { href: "/products", label: "产品目录" },
    { href: "/products/bulk", label: "批量采购" },
    { href: "/products/custom", label: "定制服务" },
  ],
  technical: [
    { href: "/technical/knowledge", label: "知识库" },
    { href: "/technical/docs", label: "技术文档" },
    { href: "/technical/blog", label: "技术博客" },
  ],
  company: [
    { href: "/about", label: "关于我们" },
    { href: "/capabilities", label: "生产实力" },
    { href: "/contact", label: "联系我们" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-4">AnkiPotide</h3>
            <p className="text-sm text-gray-400">
              专业多肽原料供应商，为医药原料和科研领域提供高品质多肽产品。
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">产品</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">技术支持</h4>
            <ul className="space-y-2">
              {footerLinks.technical.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">公司</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} AnkiPotide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: 创建根布局**

```tsx
// app/[locale]/layout.tsx
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { notFound } from "next/navigation";

const locales = ["en", "zh", "ja", "es"];
const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add -A
git commit -m "feat: add layout components (Header, Footer) with responsive mobile menu"
```

---

### Task 5: 国际化配置 (i18n)

**Files:**
- Create: `middleware.ts`
- Create: `i18n/request.ts`
- Create: `i18n/routing.ts`
- Create: `messages/en.json`
- Create: `messages/zh.json`
- Create: `messages/ja.json`
- Create: `messages/es.json`
- Create: `app/[locale]/page.tsx`

- [ ] **Step 1: 创建中间件**

```ts
// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 2: 创建路由配置**

```ts
// i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh", "ja", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});
```

- [ ] **Step 3: 创建请求配置**

```ts
// i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "zh" | "ja" | "es")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: 创建翻译文件**

```json
// messages/en.json
{
  "nav": {
    "products": "Products",
    "technical": "Technical",
    "capabilities": "Capabilities",
    "about": "About",
    "contact": "Contact"
  },
  "home": {
    "hero": {
      "title": "Premium Peptide Solutions",
      "subtitle": "Leading manufacturer of high-quality peptide APIs and research chemicals for pharmaceutical and biotech industries"
    }
  }
}
```

```json
// messages/zh.json
{
  "nav": {
    "products": "产品",
    "technical": "技术支持",
    "capabilities": "生产能力",
    "about": "关于我们",
    "contact": "联系我们"
  },
  "home": {
    "hero": {
      "title": "优质多肽解决方案",
      "subtitle": "领先的医药原料和科研用高品质多肽产品制造商"
    }
  }
}
```

- [ ] **Step 5: 创建首页**

```tsx
// app/[locale]/page.tsx
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Section className="bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium Peptide Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Leading manufacturer of high-quality peptide APIs and research chemicals
              for pharmaceutical and biotech industries
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">View Products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get Quote</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="High Purity"
              description="Industry-leading purity levels up to 99.9% with rigorous QC"
            />
            <FeatureCard
              title="Custom Synthesis"
              description="Tailored peptide solutions from mg to kg scale"
            />
            <FeatureCard
              title="Global Compliance"
              description="GMP, FDA, ISO certified manufacturing facilities"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
```

- [ ] **Step 6: 提交**

```bash
git add -A
git commit -m "feat: add i18n configuration with English, Chinese, Japanese, Spanish locales"
```

---

## Phase 2: 核心页面开发 (Task 6-10)

### Task 6: 产品目录页

**Files:**
- Create: `app/[locale]/products/page.tsx`
- Create: `components/products/product-card.tsx`
- Create: `components/products/product-filters.tsx`
- Create: `app/api/products/route.ts`

- [ ] **Step 1: 创建产品卡片组件**

```tsx
// components/products/product-card.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    description?: string;
    purity?: string;
    applications?: string[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="h-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            {product.purity && (
              <Badge variant="outline">{product.purity}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {product.description}
            </p>
          )}
          {product.applications && product.applications.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.applications.slice(0, 3).map((app) => (
                <Badge key={app} variant="secondary" className="text-xs">
                  {app}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
```

- [ ] **Step 2: 创建产品筛选组件**

```tsx
// components/products/product-filters.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const applications = ["Pharmaceutical", "Cosmetic", "Research", "Diagnostic"];
const purityLevels = [">95%", ">98%", ">99%", ">99.5%"];

export function ProductFilters() {
  const [search, setSearch] = useState("");
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [selectedPurity, setSelectedPurity] = useState<string | null>(null);

  const toggleApp = (app: string) => {
    setSelectedApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Search</label>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Application</label>
        <div className="flex flex-wrap gap-2">
          {applications.map((app) => (
            <Button
              key={app}
              variant={selectedApps.includes(app) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleApp(app)}
            >
              {app}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Purity Level</label>
        <div className="flex flex-wrap gap-2">
          {purityLevels.map((purity) => (
            <Button
              key={purity}
              variant={selectedPurity === purity ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPurity(selectedPurity === purity ? null : purity)}
            >
              {purity}
            </Button>
          ))}
        </div>
      </div>

      <Button variant="ghost" className="w-full">
        Clear Filters
      </Button>
    </div>
  );
}
```

- [ ] **Step 3: 创建产品目录页**

```tsx
// app/[locale]/products/page.tsx
import { ProductCard } from "@/components/products/product-card";
import { ProductFilters } from "@/components/products/product-filters";
import { Container, Section } from "@/components/ui/section";

// Mock data - replace with database query
const products = [
  {
    slug: "glp-1-analog",
    name: "GLP-1 Analog",
    description: "Glucagon-like peptide-1 analog for diabetes treatment research",
    purity: ">99%",
    applications: ["Pharmaceutical", "Research"],
  },
  {
    slug: "cetrorelix",
    name: "Cetrorelix",
    description: "GnRH antagonist for assisted reproduction research",
    purity: ">98%",
    applications: ["Pharmaceutical", "Cosmetic"],
  },
  {
    slug: "thymosin-alpha-1",
    name: "Thymosin Alpha 1",
    description: "Immune modulating peptide for immunotherapy research",
    purity: ">99.5%",
    applications: ["Pharmaceutical", "Research"],
  },
];

export default async function ProductsPage() {
  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Product Catalog</h1>
          <p className="text-gray-600">
            Browse our comprehensive range of high-quality peptide APIs and research chemicals
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <ProductFilters />
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add -A
git commit -m "feat: add product catalog page with filters and product cards"
```

---

### Task 7: 产品详情页 (含3D可视化)

**Files:**
- Create: `app/[locale]/products/[slug]/page.tsx`
- Create: `components/3d/molecule-viewer.tsx`
- Create: `components/products/spec-table.tsx`
- Create: `components/products/document-download.tsx`

- [ ] **Step 1: 创建3D分子查看器组件**

```tsx
// components/3d/molecule-viewer.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import { Suspense } from "react";

interface MoleculeViewerProps {
  modelUrl?: string;
  moleculeName?: string;
}

export function MoleculeViewer({ modelUrl, moleculeName }: MoleculeViewerProps) {
  return (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<Html center>Loading 3D model...</Html>}>
          <group>
            {/* Placeholder molecule - replace with actual model loader */}
            <Sphere args={[1, 32, 32]}>
              <meshStandardMaterial color="#0ea5e9" wireframe />
            </Sphere>
            <Sphere args={[0.3, 16, 16]} position={[1.5, 0, 0]}>
              <meshStandardMaterial color="#8b5cf6" />
            </Sphere>
            <Sphere args={[0.3, 16, 16]} position={[-1.5, 0, 0]}>
              <meshStandardMaterial color="#8b5cf6" />
            </Sphere>
          </group>
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-sm text-gray-500">
        {moleculeName || "3D Structure"} - Drag to rotate
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建规格参数表组件**

```tsx
// components/products/spec-table.tsx
interface Spec {
  key: string;
  value: string;
  unit?: string;
}

interface SpecTableProps {
  specifications: Spec[];
}

export function SpecTable({ specifications }: SpecTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
              Parameter
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {specifications.map((spec, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-600">{spec.key}</td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {spec.value}
                {spec.unit && <span className="text-gray-500 ml-1">{spec.unit}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 3: 创建文档下载组件**

```tsx
// components/products/document-download.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";

interface Document {
  type: "COA" | "SDS" | "TDS";
  title: string;
  version: string;
  fileUrl: string;
}

interface DocumentDownloadProps {
  documents: Document[];
}

const docTypeLabels: Record<string, string> = {
  COA: "Certificate of Analysis",
  SDS: "Safety Data Sheet",
  TDS: "Technical Data Sheet",
};

export function DocumentDownload({ documents }: DocumentDownloadProps) {
  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <Card key={doc.type}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-sm">{docTypeLabels[doc.type]}</p>
                <p className="text-xs text-gray-500">Version {doc.version}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={doc.fileUrl} download>
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: 创建产品详情页**

```tsx
// app/[locale]/products/[slug]/page.tsx
import { MoleculeViewer } from "@/components/3d/molecule-viewer";
import { SpecTable } from "@/components/products/spec-table";
import { DocumentDownload } from "@/components/products/document-download";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/section";
import Link from "next/link";

// Mock data - replace with database query
const mockProduct = {
  slug: "glp-1-analog",
  name: "GLP-1 Analog",
  description:
    "Glucagon-like peptide-1 analog for diabetes treatment research. This peptide mimics the action of human GLP-1 and is used extensively in diabetes and obesity research.",
  purity: ">99%",
  applications: ["Pharmaceutical", "Research"],
  specifications: [
    { key: "Sequence", value: "HAEGTFTSDVSSYLEGQAAKEFIAWLVKGR-NH2" },
    { key: "Molecular Weight", value: "3297.6", unit: "Da" },
    { key: "Purity (HPLC)", value: "≥99%" },
    { key: "Appearance", value: "White powder" },
    { key: "Solubility", value: "Water" },
    { key: "Storage", value: "-20°C" },
  ],
  documents: [
    { type: "COA", title: "Certificate of Analysis", version: "1.0", fileUrl: "/docs/coa.pdf" },
    { type: "SDS", title: "Safety Data Sheet", version: "1.0", fileUrl: "/docs/sds.pdf" },
    { type: "TDS", title: "Technical Data Sheet", version: "1.0", fileUrl: "/docs/tds.pdf" },
  ],
  literature: [
    { title: "GLP-1 Receptor Agonists in Type 2 Diabetes", authors: "Smith et al.", year: 2023, doi: "10.1234/diabetes.2023" },
  ],
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = mockProduct; // In production: fetch from DB

  return (
    <Section>
      <Container>
        <div className="mb-6">
          <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900">
            ← Back to Products
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <MoleculeViewer moleculeName={product.name} />
          </div>

          <div>
            <div className="flex gap-2 mb-4">
              {product.applications.map((app) => (
                <Badge key={app} variant="secondary">{app}</Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Specifications</h2>
              <SpecTable specifications={product.specifications} />
            </div>

            <div className="flex gap-4">
              <Button size="lg">Request Quote</Button>
              <Button size="lg" variant="outline">Request Sample</Button>
            </div>
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold mb-4">Technical Documents</h2>
            <DocumentDownload documents={product.documents} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Related Literature</h2>
            <div className="space-y-3">
              {product.literature.map((lit, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <p className="font-medium">{lit.title}</p>
                  <p className="text-sm text-gray-500">{lit.authors} ({lit.year})</p>
                  {lit.doi && (
                    <a
                      href={`https://doi.org/${lit.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:underline"
                    >
                      DOI: {lit.doi}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: 提交**

```bash
git add -A
git commit -m "feat: add product detail page with 3D molecule viewer and document downloads"
```

---

### Task 8: 技术内容中心

**Files:**
- Create: `app/[locale]/technical/page.tsx`
- Create: `app/[locale]/technical/knowledge/page.tsx`
- Create: `app/[locale]/technical/docs/page.tsx`
- Create: `app/[locale]/technical/blog/page.tsx`
- Create: `components/technical/faq-list.tsx`

- [ ] **Step 1: 创建FAQ列表组件**

```tsx
// components/technical/faq-list.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQListProps {
  faqs: FAQ[];
}

export function FAQList({ faqs }: FAQListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border rounded-lg">
          <button
            className="w-full flex items-center justify-between p-4 text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-medium">{faq.question}</span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-gray-400 transition-transform",
                openIndex === i && "rotate-180"
              )}
            />
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 创建技术内容中心首页**

```tsx
// app/[locale]/technical/page.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { FileText, BookOpen, Newspaper, HelpCircle } from "lucide-react";

const technicalSections = [
  {
    title: "Knowledge Base",
    description: "Learn about peptide synthesis methods, purification techniques, and quality control",
    icon: BookOpen,
    href: "/technical/knowledge",
    count: 24,
  },
  {
    title: "Technical Documents",
    description: "Access COA, SDS, and TDS documents for all our products",
    icon: FileText,
    href: "/technical/docs",
    count: 156,
  },
  {
    title: "Technical Blog",
    description: "Industry insights, research updates, and synthesis case studies",
    icon: Newspaper,
    href: "/technical/blog",
    count: 48,
  },
  {
    title: "FAQ",
    description: "Common questions about peptide ordering, shipping, and technical specifications",
    icon: HelpCircle,
    href: "/technical/faq",
    count: 32,
  },
];

export default function TechnicalPage() {
  return (
    <Section className="bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Technical Resource Center</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive technical documentation, knowledge base, and expert insights
            for pharmaceutical and research professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {technicalSections.map((section) => (
            <Link key={section.href} href={section.href}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4">
                  <section.icon className="w-10 h-10 text-primary-600" />
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <p className="text-sm text-gray-500">{section.count} articles</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{section.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: 创建知识库页面**

```tsx
// app/[locale]/technical/knowledge/page.tsx
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";

const articles = [
  {
    slug: "solid-phase-peptide-synthesis",
    title: "Solid Phase Peptide Synthesis (SPPS)",
    excerpt: "Understanding the fundamentals of SPPS methodology and best practices",
    category: "Synthesis Methods",
    readTime: "8 min",
  },
  {
    slug: "peptide-purification-hplc",
    title: "Peptide Purification by HPLC",
    excerpt: "Guide to reverse-phase HPLC purification techniques and optimization",
    category: "Purification",
    readTime: "12 min",
  },
  {
    slug: "peptide-stability-storage",
    title: "Peptide Stability and Storage Guidelines",
    excerpt: "How to properly store peptides to maintain stability and activity",
    category: "Quality Control",
    readTime: "6 min",
  },
];

export default function KnowledgePage() {
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-8">Knowledge Base</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/technical/knowledge/${article.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-xs text-primary-600 font-medium mb-2">
                    {article.category}
                  </div>
                  <CardTitle className="mb-2">{article.title}</CardTitle>
                  <p className="text-sm text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="text-xs text-gray-400">{article.readTime} read</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: 创建技术文档页面**

```tsx
// app/[locale]/technical/docs/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { Download, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const documents = [
  { type: "COA", product: "GLP-1 Analog", version: "1.0", date: "2024-01-15" },
  { type: "SDS", product: "GLP-1 Analog", version: "1.0", date: "2024-01-15" },
  { type: "TDS", product: "GLP-1 Analog", version: "1.0", date: "2024-01-10" },
  { type: "COA", product: "Cetrorelix", version: "1.0", date: "2024-01-12" },
  { type: "SDS", product: "Thymosin Alpha 1", version: "1.0", date: "2024-01-08" },
];

export default function DocsPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-8">Technical Documents</h1>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search documents..." className="pl-10 max-w-md" />
          </div>
        </div>

        <div className="space-y-4">
          {documents.map((doc, i) => (
            <Card key={i}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-medium">{doc.product} - {doc.type}</p>
                    <p className="text-sm text-gray-500">
                      Version {doc.version} | Updated {doc.date}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: 提交**

```bash
git add -A
git commit -m "feat: add technical content center with knowledge base, docs, and blog sections"
```

---

### Task 9: 询盘表单与CRM集成

**Files:**
- Create: `app/[locale]/contact/page.tsx`
- Create: `components/forms/inquiry-form.tsx`
- Create: `app/api/inquiries/route.ts`
- Create: `lib/crm.ts`

- [ ] **Step 1: 创建CRM分级逻辑**

```ts
// lib/crm.ts
export type InquiryGrade = "A" | "B" | "C";

interface InquiryInput {
  companyName?: string;
  contactName: string;
  email: string;
  message?: string;
  product?: string;
  quantity?: string;
}

export function gradeInquiry(input: InquiryInput): InquiryGrade {
  // Grade A: Has company name + specific product + message = high intent
  // Grade B: Has company name OR specific product = medium intent
  // Grade C: Basic inquiry = low intent

  let score = 0;

  if (input.companyName) score += 2;
  if (input.product) score += 2;
  if (input.message && input.message.length > 50) score += 1;
  if (input.quantity) score += 1;

  if (score >= 4) return "A";
  if (score >= 2) return "B";
  return "C";
}

export function getGradeActions(grade: InquiryGrade) {
  switch (grade) {
    case "A":
      return {
        emailSequence: 5, // 5 emails over 3 weeks
        responseTime: "2 hours",
        documents: ["technical-package", "product-brochure", "case-studies"],
      };
    case "B":
      return {
        emailSequence: 3, // 3 emails over 2 weeks
        responseTime: "4 hours",
        documents: ["product-brochure"],
      };
    case "C":
      return {
        emailSequence: 1,
        responseTime: "24 hours",
        documents: [],
      };
  }
}
```

- [ ] **Step 2: 创建询盘表单组件**

```tsx
// components/forms/inquiry-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const inquirySchema = z.object({
  contactName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  product: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().optional(),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">Thank you for your inquiry!</h3>
          <p className="text-gray-600">
            Our team will respond within 4 business hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Inquiry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Contact Name *</label>
              <Input {...register("contactName")} />
              {errors.contactName && (
                <p className="text-sm text-red-500 mt-1">{errors.contactName.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email *</label>
              <Input type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Company Name</label>
              <Input {...register("companyName")} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <Input {...register("phone")} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Country</label>
              <Input {...register("country")} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Interested Product</label>
              <Input {...register("product")} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Quantity</label>
            <Input {...register("quantity")} placeholder="e.g., 100mg, 1kg" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Message</label>
            <textarea
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm min-h-[120px]"
              {...register("message")}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 3: 创建询盘API路由**

```ts
// app/api/inquiries/route.ts
import { NextResponse } from "next/server";
import { gradeInquiry, getGradeActions } from "@/lib/crm";
import { z } from "zod";

const inquirySchema = z.object({
  contactName: z.string().min(2),
  email: z.string().email(),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  product: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = inquirySchema.parse(body);

    // Grade the inquiry
    const grade = gradeInquiry(data);
    const actions = getGradeActions(grade);

    // In production: Save to database
    // await prisma.inquiry.create({
    //   data: {
    //     ...data,
    //     grade,
    //     status: "NEW",
    //   },
    // });

    // Trigger Make.com webhook for automation
    if (process.env.MAKE_COM_WEBHOOK_URL) {
      await fetch(process.env.MAKE_COM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "new_inquiry",
          grade,
          contactName: data.contactName,
          email: data.email,
          companyName: data.companyName,
          product: data.product,
          actions,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      grade,
      message: `Your inquiry has been received. Grade: ${grade}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 4: 创建联系页面**

```tsx
// app/[locale]/contact/page.tsx
import { InquiryForm } from "@/components/forms/inquiry-form";
import { Container, Section } from "@/components/ui/section";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "sales@ankpipetide.com",
    href: "mailto:sales@ankpipetide.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+86 21 8888 8888",
    href: "tel:+862188888888",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "Shanghai, China",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon-Fri 9:00-18:00 CST",
  },
];

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for product inquiries, technical support,
            or partnership opportunities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <InquiryForm />

            <div className="mt-8 grid grid-cols-2 gap-4">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-3">
                  <info.icon className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{info.title}</p>
                    {info.href ? (
                      <a href={info.href} className="text-sm text-gray-600 hover:text-primary-600">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-600">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-gray-200 rounded-lg h-[400px] flex items-center justify-center">
              <p className="text-gray-500">Map placeholder</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: 提交**

```bash
git add -A
git commit -m "feat: add contact page with inquiry form and CRM grade logic"
```

---

### Task 10: 生产能力页面

**Files:**
- Create: `app/[locale]/capabilities/page.tsx`
- Create: `components/capabilities/capability-card.tsx`
- Create: `components/capabilities/cert-grid.tsx`

- [ ] **Step 1: 创建能力卡片组件**

```tsx
// components/capabilities/capability-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CapabilityCardProps {
  title: string;
  description: string;
  metrics?: { label: string; value: string }[];
  icon?: React.ReactNode;
}

export function CapabilityCard({ title, description, metrics, icon }: CapabilityCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary-600">{icon}</div>}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        {metrics && (
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-2xl font-bold text-primary-600">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.label}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: 创建证书展示组件**

```tsx
// components/capabilities/cert-grid.tsx
import { Card, CardContent } from "@/components/ui/card";

const certifications = [
  { name: "GMP", fullName: "Good Manufacturing Practice", issuedBy: "FDA" },
  { name: "ISO 9001", fullName: "Quality Management System", issuedBy: "Bureau Veritas" },
  { name: "ISO 14001", fullName: "Environmental Management", issuedBy: "Bureau Veritas" },
  { name: "FDA", fullName: "US Food and Drug Administration", issuedBy: "FDA" },
];

export function CertGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {certifications.map((cert) => (
        <Card key={cert.name} className="text-center">
          <CardContent className="py-6">
            <div className="w-16 h-16 mx-auto mb-3 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-primary-600">{cert.name}</span>
            </div>
            <p className="font-medium text-sm">{cert.fullName}</p>
            <p className="text-xs text-gray-500 mt-1">{cert.issuedBy}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: 创建生产能力页面**

```tsx
// app/[locale]/capabilities/page.tsx
import { CapabilityCard } from "@/components/capabilities/capability-card";
import { CertGrid } from "@/components/capabilities/cert-grid";
import { Container, Section } from "@/components/ui/section";
import { FlaskConical, Ruler, Shield, Truck } from "lucide-react";

export default function CapabilitiesPage() {
  return (
    <Section>
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Our Capabilities</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            State-of-the-art peptide synthesis facilities with capacity from milligrams to metric tons
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <CapabilityCard
            icon={<FlaskConical className="w-6 h-6" />}
            title="Synthesis Platforms"
            description="Advanced solid-phase and liquid-phase peptide synthesis for various complexity levels"
            metrics={[
              { label: "Daily Capacity", value: "50+" },
              { label: "Sequence Length", value: "Up to 100AA" },
              { label: "Purity Levels", value: "Up to 99.9%" },
            ]}
          />
          <CapabilityCard
            icon={<Ruler className="w-6 h-6" />}
            title="Scale-up Capability"
            description="Seamless transition from R&D to pilot to commercial production"
            metrics={[
              { label: "R&D Scale", value: "mg-g" },
              { label: "Pilot Scale", value: "g-kg" },
              { label: "Commercial", value: "kg-ton" },
            ]}
          />
          <CapabilityCard
            icon={<Shield className="w-6 h-6" />}
            title="Quality Assurance"
            description="Rigorous QC/QA protocols ensuring consistency and compliance"
            metrics={[
              { label: "QC Tests", value: "15+" },
              { label: "Batch Release", value: "< 5 days" },
              { label: "Rejection Rate", value: "< 0.1%" },
            ]}
          />
          <CapabilityCard
            icon={<Truck className="w-6 h-6" />}
            title="Global Logistics"
            description="Reliable cold-chain shipping to destinations worldwide"
            metrics={[
              { label: "Shipping Destinations", value: "60+" },
              { label: "Delivery Success", value: "99.5%" },
              { label: "Cold Chain", value: "-20°C / 4°C" },
            ]}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Certifications</h2>
          <CertGrid />
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add -A
git commit -m "feat: add capabilities page with synthesis platforms and certifications"
```

---

## Phase 3: 自动化与集成 (Task 11-13)

### Task 11: Make.com自动化工作流

**Files:**
- Create: `scripts/make-com-webhooks.ts`
- Create: `scripts/setup-make-scenarios.ts`

- [ ] **Step 1: 创建Make.com webhook配置脚本**

```ts
// scripts/make-com-webhooks.ts
/**
 * Make.com Webhook Configuration
 *
 * This script documents all Make.com webhook endpoints and their payloads.
 * Use this as reference when setting up Make.com scenarios.
 */

export const WEBHOOK_EVENTS = {
  NEW_INQUIRY: {
    name: "New Inquiry Received",
    webhook: process.env.MAKE_COM_WEBHOOK_URL,
    payload: {
      event: "new_inquiry",
      grade: "A" | "B" | "C",
      contactName: string,
      email: string,
      companyName?: string,
      country?: string,
      product?: string,
      quantity?: string,
      message?: string,
      timestamp: string,
    },
    makeActions: {
      A: [
        "Create contact in CRM",
        "Send technical package email",
        "Notify sales team (Slack)",
        "Schedule 5-email follow-up sequence",
      ],
      B: [
        "Create contact in CRM",
        "Send product brochure email",
        "Schedule weekly follow-up",
      ],
      C: [
        "Add to newsletter list",
        "Send auto-reply",
      ],
    },
  },

  NEW_BLOG_POST: {
    name: "New Blog Post Published",
    webhook: process.env.MAKE_COM_BLOG_WEBHOOK_URL,
    payload: {
      event: "new_blog_post",
      title: string,
      slug: string,
      locale: string,
      author: string,
      publishedAt: string,
    },
    makeActions: [
      "Post to LinkedIn",
      "Send email to subscribers",
      "Tweet (if applicable)",
    ],
  },

  DOCUMENT_DOWNLOAD: {
    name: "Technical Document Downloaded",
    webhook: process.env.MAKE_COM_DOCS_WEBHOOK_URL,
    payload: {
      event: "document_download",
      documentType: "COA" | "SDS" | "TDS",
      productSlug: string,
      userEmail?: string,
      timestamp: string,
    },
    makeActions: [
      "Track download analytics",
      "Send follow-up email (if logged in)",
    ],
  },

  INVENTORY_UPDATE: {
    name: "Inventory Level Changed",
    webhook: process.env.MAKE_COM_INVENTORY_WEBHOOK_URL,
    payload: {
      event: "inventory_update",
      productSlug: string,
      oldQuantity: string,
      newQuantity: string,
      status: "in_stock" | "low_stock" | "out_of_stock",
    },
    makeActions: [
      "Notify customers with waiting list",
      "Update website status",
    ],
  },
} as const;

export type WebhookEvent = keyof typeof WEBHOOK_EVENTS;
```

- [ ] **Step 2: 创建Make.com场景设置指南**

```ts
// scripts/setup-make-scenarios.ts
/**
 * Make.com Scenario Setup Guide
 *
 * Step-by-step instructions for setting up Make.com automation scenarios.
 */

export const SCENARIO_SETUP = {
  inquiryRouting: {
    name: "Inquiry Auto-Routing",
    trigger: "Custom Webhook",
    steps: [
      {
        order: 1,
        module: "Webhook",
        action: "Custom Webhook",
        config: {
          webhookURL: "https://hook.eu1.make.com/xxxxx",
        },
      },
      {
        order: 2,
        module: "Router",
        action: "Router",
        config: {
          branches: [
            { condition: "{{grade}} = A", label: "Grade A" },
            { condition: "{{grade}} = B", label: "Grade B" },
            { condition: "{{grade}} = C", label: "Grade C" },
          ],
        },
      },
      {
        order: 3,
        module: "Email",
        action: "Send Email",
        config: {
          to: "{{email}}",
          template: "grade-specific-template-id",
        },
        applicableTo: ["A", "B", "C"],
      },
      {
        order: 4,
        module: "GoogleSheets",
        action: "Add Row",
        config: {
          spreadsheetId: "your-spreadsheet-id",
        },
        applicableTo: ["A", "B"],
      },
      {
        order: 5,
        module: "Slack",
        action: "Send Message",
        config: {
          channel: "#sales-alerts",
          message: "New Grade A inquiry from {{companyName}}",
        },
        applicableTo: ["A"],
      },
    ],
  },

  contentPublishing: {
    name: "Content Publishing Automation",
    trigger: "New Blog Post",
    steps: [
      {
        order: 1,
        module: "Webhook",
        action: "Custom Webhook",
      },
      {
        order: 2,
        module: "LinkedIn",
        action: "Post Update",
        config: {
          content: "New article: {{title}}\n\nRead more: {{url}}",
        },
      },
      {
        order: 3,
        module: "Mailchimp",
        action: "Send Campaign",
        config: {
          listId: "your-list-id",
          templateId: "blog-notification-template",
        },
      },
      {
        order: 4,
        module: "Twitter",
        action: "Create Tweet",
        config: {
          text: "Just published: {{title}} {{url}}",
        },
      },
    ],
  },

  documentTracking: {
    name: "Document Download Tracking",
    trigger: "Document Download Event",
    steps: [
      {
        order: 1,
        module: "Webhook",
        action: "Custom Webhook",
      },
      {
        order: 2,
        module: "GoogleAnalytics",
        action: "Send Event",
        config: {
          category: "Downloads",
          action: "{{documentType}}",
          label: "{{productSlug}}",
        },
      },
      {
        order: 3,
        module: "Router",
        action: "Router",
        config: {
          branches: [
            { condition: "{{userEmail}} exists", label: "Known User" },
            { condition: "{{userEmail}} not exists", label: "Anonymous" },
          ],
        },
      },
      {
        order: 4,
        module: "Email",
        action: "Send Email",
        applicableTo: ["Known User"],
        config: {
          to: "{{userEmail}}",
          template: "follow-up-for-download",
        },
      },
    ],
  },
};
```

- [ ] **Step 3: 提交**

```bash
git add -A
git commit -m "feat: add Make.com webhook configuration and scenario setup guides"
```

---

### Task 12: Algolia搜索集成

**Files:**
- Create: `lib/algolia.ts`
- Create: `components/search/product-search.tsx`
- Create: `scripts/algolia-sync.ts`

- [ ] **Step 1: 创建Algolia配置**

```ts
// lib/algolia.ts
import { algoliasearch } from "algoliasearch";

export const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

export const ALGOLIA_INDEX_NAME = "products";

export interface AlgoliaProduct {
  objectID: string;
  slug: string;
  name: string;
  description: string;
  applications: string[];
  purity?: string;
  specifications: Record<string, string>;
  locale: string;
}
```

- [ ] **Step 2: 创建产品搜索组件**

```tsx
// components/search/product-search.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface SearchResult {
  slug: string;
  name: string;
  description: string;
  purity?: string;
}

export function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // In production: use Algolia search
      // const response = await algoliaClient.search<SearchResult>({
      //   requests: [{
      //     indexName: ALGOLIA_INDEX_NAME,
      //     query: searchQuery,
      //   }]
      // });
      // setResults(response.results[0].hits);

      // Mock results for demo
      setResults([
        {
          slug: "glp-1-analog",
          name: "GLP-1 Analog",
          description: "Glucagon-like peptide-1 analog for diabetes treatment",
          purity: ">99%",
        },
      ]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50">
          <CardContent className="p-0">
            <ul>
              {results.map((result) => (
                <li key={result.slug}>
                  <Link
                    href={`/products/${result.slug}`}
                    className="block px-4 py-3 hover:bg-gray-50"
                  >
                    <p className="font-medium">{result.name}</p>
                    <p className="text-sm text-gray-500">{result.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

- [ ] **Step 3: 创建Algolia同步脚本**

```ts
// scripts/algolia-sync.ts
/**
 * Algolia Index Sync Script
 *
 * Run this script to sync your product database with Algolia.
 * Usage: npx tsx scripts/algolia-sync.ts
 */

import { algoliasearch } from "algoliasearch";
import { PrismaClient } from "@prisma/client";

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
);

const INDEX_NAME = "products";
const prisma = new PrismaClient();

async function syncProducts() {
  console.log("Fetching products from database...");

  const products = await prisma.product.findMany({
    include: {
      translations: true,
      specifications: true,
      categories: {
        include: {
          category: {
            include: {
              translations: true,
            },
          },
        },
      },
    },
  });

  console.log(`Found ${products.length} products`);

  const algoliaObjects = products.flatMap((product) => {
    // Create one index entry per locale
    const locales = ["en", "zh", "ja", "es"];
    return locales.map((locale) => {
      const translation = product.translations.find((t) => t.locale === locale);
      const categoryNames = product.categories
        .map((pc) => pc.category.translations.find((t) => t.locale === locale)?.name)
        .filter(Boolean);

      return {
        objectID: `${product.id}_${locale}`,
        productId: product.id,
        slug: product.slug,
        locale,
        name: translation?.name || product.slug,
        description: translation?.description || "",
        applications: categoryNames,
        specifications: Object.fromEntries(
          product.specifications.map((s) => [s.key, s.value])
        ),
      };
    });
  });

  console.log(`Uploading ${algoliaObjects.length} records to Algolia...`);

  await algolia.saveObjects({
    indexName: INDEX_NAME,
    objects: algoliaObjects,
  });

  console.log("Sync complete!");
}

syncProducts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

- [ ] **Step 4: 提交**

```bash
git add -A
git commit -m "feat: add Algolia search integration and product sync script"
```

---

### Task 13: Google Analytics集成

**Files:**
- Create: `components/analytics/ga4-provider.tsx`
- Create: `app/[locale]/layout.tsx` (更新)

- [ ] **Step 1: 创建GA4 Provider组件**

```tsx
// components/analytics/ga4-provider.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { pageview } from "@/lib/analytics";

export function GA4Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    pageview(url);
  }, [pathname, searchParams]);

  return <>{children}</>;
}
```

- [ ] **Step 2: 创建分析工具函数**

```ts
// lib/analytics.ts
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function pageview(url: string) {
  if (window.gtag) {
    window.gtag("config", GA_ID, {
      page_path: url,
    });
  }
}

export function event(action: string, params?: Record<string, unknown>) {
  if (window.gtag) {
    window.gtag("event", action, params);
  }
}

export const ANALYTICS_EVENTS = {
  PRODUCT_VIEW: "view_product",
  DOCUMENT_DOWNLOAD: "download_document",
  INQUIRY_SUBMIT: "submit_inquiry",
  SEARCH_QUERY: "search_query",
} as const;
```

- [ ] **Step 3: 更新布局添加GA脚本**

```tsx
// app/[locale]/layout.tsx (update)
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GA4Provider } from "@/components/analytics/ga4-provider";

const locales = ["en", "zh", "ja", "es"];
const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <GA4Provider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </GA4Provider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add -A
git commit -m "feat: add Google Analytics 4 integration with pageview and event tracking"
```

---

## Phase 4: SEO与部署 (Task 14-15)

### Task 14: SEO优化

**Files:**
- Create: `components/seo/metadata.ts`
- Create: `app/[locale]/products/[slug]/page.tsx` (更新metadata)
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: 创建SEO元数据配置**

```ts
// components/seo/metadata.ts
import { Metadata } from "next";

const BASE_URL = "https://ankpiptide.com";
const DEFAULT_DESCRIPTION = "Premium peptide APIs and research chemicals manufacturer. GMP certified, global shipping.";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

interface LocalizedMetadata {
  en: {
    title: string;
    description: string;
  };
  zh: {
    title: string;
    description: string;
  };
  ja: {
    title: string;
    description: string;
  };
  es: {
    title: string;
    description: string;
  };
}

const siteMetadata: LocalizedMetadata = {
  en: {
    title: "AnkiPotide | Premium Peptide Solutions",
    description: "Leading manufacturer of high-quality peptide APIs and research chemicals for pharmaceutical and biotech industries.",
  },
  zh: {
    title: "AnkiPotide | 优质多肽解决方案",
    description: "领先的医药原料和科研用高品质多肽产品制造商。",
  },
  ja: {
    title: "AnkiPotide | プレミアムペプチドソリューション",
    description: "製薬・バイオテクノロジー業界向けの高品質ペプチドAPIおよび研究用化学物質の大手メーカー。",
  },
  es: {
    title: "AnkiPotide | Soluciones de Péptidos Premium",
    description: "Fabricante líder de APIs de péptidos de alta calidad y productos químicos de investigación.",
  },
};

export function getMetadata(locale: string): Metadata {
  const metadata = siteMetadata[locale as keyof LocalizedMetadata] || siteMetadata.en;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: metadata.title,
      template: `%s | ${metadata.title}`,
    },
    description: metadata.description,
    openGraph: {
      type: "website",
      locale: locale,
      url: BASE_URL,
      siteName: "AnkiPotide",
      images: [{ url: DEFAULT_OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        en: `${BASE_URL}/en`,
        zh: `${BASE_URL}/zh`,
        ja: `${BASE_URL}/ja`,
        es: `${BASE_URL}/es`,
      },
    },
  };
}
```

- [ ] **Step 2: 创建sitemap**

```ts
// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://ankpiptide.com";
  const locales = ["en", "zh", "ja", "es"];

  const staticPages = [
    { path: "", priority: 1 },
    { path: "/products", priority: 0.9 },
    { path: "/technical", priority: 0.8 },
    { path: "/capabilities", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
  ];

  return locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page.priority,
    }))
  );
}
```

- [ ] **Step 3: 创建robots.txt**

```ts
// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: "https://ankpiptide.com/sitemap.xml",
  };
}
```

- [ ] **Step 4: 提交**

```bash
git add -A
git commit -m "feat: add SEO optimization with localized metadata, sitemap, and robots.txt"
```

---

### Task 15: Vercel部署配置

**Files:**
- Create: `vercel.json`
- Create: `vercel.ts`
- Create: `.env.local.example`

- [ ] **Step 1: 创建Vercel配置文件**

```json
// vercel.json (legacy, prefer vercel.ts)
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1", "hnd1", "sin1"],
  "functions": {
    "app/api/**/*.ts": {
      "memory": 512,
      "maxDuration": 30
    }
  }
}
```

- [ ] **Step 2: 创建TypeScript Vercel配置**

```ts
// vercel.ts
import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  buildCommand: "npm run build",
  framework: "nextjs",
  regions: ["iad1", "hnd1", "sin1"],
  functions: {
    "app/api/**/*.ts": {
      memory: 512,
      maxDuration: 30,
    },
  },
  headers: [
    routes.cacheControl("/static/(.*)", {
      public: true,
      maxAge: "1 week",
      immutable: true,
    }),
    routes.cacheControl("/_next/static/(.*)", {
      public: true,
      maxAge: "1 year",
      immutable: true,
    }),
  ],
};
```

- [ ] **Step 3: 创建本地环境变量示例**

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/ankpiptide"

# Algolia Search
NEXT_PUBLIC_ALGOLIA_APP_ID="your-app-id"
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY="your-search-key"
ALGOLIA_ADMIN_KEY="your-admin-key"

# Make.com Automation
MAKE_COM_WEBHOOK_URL="https://hook.eu1.make.com/xxxxx"
MAKE_COM_BLOG_WEBHOOK_URL="https://hook.eu1.make.com/yyyy"
MAKE_COM_DOCS_WEBHOOK_URL="https://hook.eu1.make.com/zzzz"
MAKE_COM_INVENTORY_WEBHOOK_URL="https://hook.eu1.make.com/aaaa"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Application
NEXT_PUBLIC_SITE_URL="https://ankpiptide.com"
```

- [ ] **Step 4: 提交**

```bash
git add -A
git commit -m "feat: add Vercel deployment configuration"
```

---

## 实施计划总结

| Phase | Tasks | 主要交付物 |
|-------|-------|-----------|
| Phase 1 | 1-5 | 项目初始化、数据库Schema、UI组件库、布局、i18n |
| Phase 2 | 6-10 | 产品目录、产品详情、技术中心、询盘表单、生产能力 |
| Phase 3 | 11-13 | Make.com自动化、Algolia搜索、Google Analytics |
| Phase 4 | 14-15 | SEO优化、Vercel部署配置 |

**总任务数**: 15个主要任务
**预计周期**: 8-12周 (取决于团队规模)
**下一步**: 选择执行方式并开始Phase 1
