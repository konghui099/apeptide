'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FlaskConical, Mail, MapPin, Clock } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const lp = `/${locale}`;

  const productsLinks = [
    { href: `${lp}/products`, label: 'All Products' },
    { href: `${lp}/products?category=peptides`, label: 'Peptides' },
    { href: `${lp}/products?category=glp1`, label: 'GLP-1 Analogs' },
    { href: `${lp}/products?category=sarms`, label: 'SARMs' },
    { href: `${lp}/products?category=research-supplies`, label: 'Research Supplies' },
  ];

  const companyLinks = [
    { href: `${lp}/about`, label: 'About Us' },
    { href: `${lp}/b2b`, label: 'B2B Partnerships' },
    { href: `${lp}/test-results`, label: 'Test Results' },
    { href: `${lp}/contact`, label: 'Contact' },
  ];

  const supportLinks = [
    { href: `${lp}/faq`, label: 'FAQ' },
    { href: `${lp}/shipping`, label: 'Shipping Info' },
    { href: `${lp}/quality`, label: 'Quality Assurance' },
  ];

  const legalLinks = [
    { href: `${lp}/privacy`, label: 'Privacy Policy' },
    { href: `${lp}/terms`, label: 'Terms of Service' },
    { href: `${lp}/disclaimer`, label: 'Disclaimer' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href={`${lp}/`} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AnkiPeptide</span>
            </Link>
            <p className="text-sm text-slate-400 mb-4">
              Research Peptide Supplier | 99%+ Purity Verified
            </p>
            <p className="text-xs text-slate-500">
              Ultra-pure research peptides and laboratory compounds for in-vitro research use.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4" />
                <span>sales@ankipeptide.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>European Union</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                <span>Mon-Fri 9:00-18:00 CET</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {productsLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mt-6 mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-4 mb-8">
            <p className="text-sm text-slate-400 text-center">
              <strong className="text-yellow-500">Disclaimer:</strong> All products are for laboratory research purposes only. Not for human use or consumption. AnkiPeptide supplies research chemicals for in-vitro testing and laboratory experiments only. By purchasing from our site, you agree that you are a qualified researcher or professional.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} AnkiPeptide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
