'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Extract locale from pathname like /en/products or /products
  const locale = pathname.split('/')[1] || 'en';
  const localePrefix = `/${locale}`;

  const navItems: NavItem[] = [
    { label: 'Products', href: `${localePrefix}/products` },
    { label: 'Test Results', href: `${localePrefix}/test-results` },
    { label: 'About', href: `${localePrefix}/about` },
    { label: 'B2B', href: `${localePrefix}/b2b` },
    { label: 'Contact', href: `${localePrefix}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={`${localePrefix}/`} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">AnkiPeptide</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary-600',
                pathname === item.href
                  ? 'text-primary-600'
                  : 'text-slate-600'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side - CTA & Language Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href={`${localePrefix}/products`}>
            <Button size="sm">
              View Products
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block text-sm font-medium transition-colors hover:text-primary-600 py-2',
                  pathname === item.href
                    ? 'text-primary-600'
                    : 'text-slate-600'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 flex items-center justify-between">
              <Link href={`${localePrefix}/products`} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">
                  View Products
                </Button>
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
