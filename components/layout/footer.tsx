import * as React from 'react';
import Link from 'next/link';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: 'Products',
    links: [
      { label: 'Features', href: '/products/features' },
      { label: 'Pricing', href: '/products/pricing' },
      { label: 'Downloads', href: '/products/downloads' },
      { label: 'Changelog', href: '/products/changelog' },
    ],
  },
  {
    title: 'Technical',
    links: [
      { label: 'Documentation', href: '/technical/docs' },
      { label: 'API Reference', href: '/technical/api' },
      { label: 'Architecture', href: '/technical/architecture' },
      { label: 'Support', href: '/technical/support' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/about/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">AnkiPotide</span>
            </Link>
            <p className="text-sm text-foreground/60">
              Empowering memory retention through scientifically-backed spaced repetition technology.
            </p>
          </div>

          {/* Link Columns */}
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} AnkiPotide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}