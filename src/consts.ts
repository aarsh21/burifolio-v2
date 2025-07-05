import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Kaezr',
  description: 'My corner on the internet',
  href: 'https://kaezr.xyz',
  author: 'kaezr',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/projects',
    label: 'projects',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/kaezrr',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/anjishnu-banerjee-683276359',
    label: 'LinkedIn',
  },
  {
    href: 'mailto:jason@kaezr.dev@gmail.com',
    label: 'Email',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
