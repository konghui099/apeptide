import { VercelConfig } from '@vercel/config/v1';

const config: VercelConfig = {
  framework: 'nextjs',
  buildCommand: 'npm run build',
  regions: ['iad1', 'hnd1', 'sin1'],
  routes: [
    { src: '/api/(.*)', headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' } },
    { src: '/(.*).html', headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' } },
    { src: '/(.*)', dest: '/$1' }
  ],
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
      ]
    },
    {
      source: '/static/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    }
  ],
  cacheControl: [
    {
      path: '/api/(.*)',
      value: 'no-cache, no-store, must-revalidate'
    },
    {
      path: '/(.*).html',
      value: 'public, max-age=0, must-revalidate'
    },
    {
      path: '/static/(.*)',
      value: 'public, max-age=31536000, immutable'
    }
  ]
};

export default config;
