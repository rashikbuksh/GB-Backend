import type { PublicUrlProps } from '@/lib/types';
import type { JWTPayload } from 'hono/utils/jwt/types';

import { compareSync, hash } from 'bcrypt-ts';
import { sign, verify } from 'hono/jwt';

import env from '@/env';

export async function HashPass(password: string) {
  const hashPassword = await hash(password, env.SALT);

  return hashPassword;
}

export async function ComparePass(password: string, hashPassword: string) {
  return compareSync(password, hashPassword);
}

export async function CreateToken(payload: JWTPayload) {
  return sign(payload, env.PRIVATE_KEY);
}

export async function VerifyToken(token: string) {
  const decodedPayload = await verify(token, env.PRIVATE_KEY);

  return !!decodedPayload;
}

export function isPublicRoute(url: string, method: string) {
  const publicUrls: PublicUrlProps[] = [
    { url: '/v1/signin', method: 'POST' },
    { url: '/v1/user-signin', method: 'POST' },
    { url: '/v1/hr/users', method: 'POST' },
    { url: '/v1/portfolio/testimonial', method: 'GET' },
    { url: '/v1/portfolio/product-category', method: 'GET' },
    { url: '/v1/portfolio/product-sub-category', method: 'GET' },
    { url: '/v1/portfolio/product', method: 'GET' },
    { url: '/v1/portfolio/shop', method: 'GET' },
    { url: '/v1/portfolio/recipe', method: 'GET' },
    { url: '/v1/portfolio/promo-banner', method: 'GET' },
    { url: '/v1/portfolio/promo-banner-product', method: 'GET' },
    { url: '/v1/portfolio/sales-point', method: 'GET' },
    { url: '/v1/portfolio/product-sale-point', method: 'GET' },
    { url: '/v1/portfolio/online-admission', method: 'POST' },
    { url: '/v1/portfolio/contact-us', method: 'POST' },
    { url: '/v1/other/', method: 'GET' },

  ];

  return publicUrls.some(route => url.startsWith(route.url) && route.method === method);
}

export const ALLOWED_ROUTES: string[] = [
  'http://localhost:3005',
  'http://localhost:3000',
  'http://192.168.10.58:4056',
  'http://103.147.163.46:4056',
];
