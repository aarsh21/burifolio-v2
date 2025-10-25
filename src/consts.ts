import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Aarsh',
  description: 'My corner on the internet',
  href: 'https://aarsh21.github.io',
  author: 'aarsh21',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/about',
    label: 'about',
  },
  {
    href: '/work',
    label: 'work',
  },
  {
    href: '/projects',
    label: 'projects',
  },
  {
    href: '/blog',
    label: 'blog',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/aarsh21',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/aarshpadia21/',
    label: 'LinkedIn',
  },
  {
    href: 'mailto:aarshpersonal@proton.me',
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
