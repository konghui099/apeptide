import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AnkiPeptide - Research Peptide Supplier',
  description: 'Ultra-pure research peptides and laboratory compounds. 99%+ purity verified. EU & worldwide shipping.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
