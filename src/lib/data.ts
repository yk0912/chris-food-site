import site from '../data/site.json';
import shopsData from '../data/shops.json';
import menu from '../data/menu.json';
import business from '../data/business.json';
import reskilling from '../data/reskilling.json';

export { site, menu, business, reskilling };
export const shops = shopsData.shops;
export const company = site.company;
export const img = site.images;
export const links = site.links;

export const shopBySlug = (slug: string) => shops.find((s) => s.slug === slug);

export const fmtDate = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

export const mapEmbed = (q: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed&hl=ja`;
export const mapLink = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
