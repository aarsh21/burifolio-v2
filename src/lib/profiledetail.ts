import {
  Github,
  Mail,
  FileText,
  Linkedin,
  Twitch,
  Youtube,
  X,
} from 'lucide-react'

export const profilePicture = '/profile.webp'

export const Name = 'Aarsh Padia'

export const Location = 'Rajkot , Gujarat'

export const Profession = 'Web Developer and AI enthusiastic'

export const Bio = `I'm a 21 y/o cs undergrad student. I love building things , playing games and ricing my Arch
	Linux. I enjoy web development and i live on the terminal. If I'm not coding, I'm probably losing
	my mind in Marvel Rivals/Valorant or watching anime.`

// Work experience data is now managed as Astro content collections in /src/content/work/
// See: https://docs.astro.build/en/guides/content-collections/
// Work experiences are now defined as individual .md files in src/content/work/

// Project data is now managed as Astro content collections in /src/content/projects/
// See: https://docs.astro.build/en/guides/content-collections/
// Projects are now defined as individual .md files in src/content/projects/

export const Links = [
  {
    name: 'GitHub',
    url: 'https://github.com/aarsh21',
    icon: Github,
  },
  {
    name: 'Email',
    url: 'mailto:aarshpersonal@proton.me',
    icon: Mail,
  },
  {
    name: 'X',
    url: 'https://x.com/sakamotozsh',
    icon: X,
  },
  {
    name: 'Resume',
    url: 'https://drive.google.com/uc?export=download&id=11OOFNEjwML-2tdqofzNmMlmquTaYNOaY',
    icon: FileText,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/aarshpadia21/',
    icon: Linkedin,
  },
  {
    name: 'Twitch',
    url: 'https://www.twitch.tv/sakamotozsh',
    icon: Twitch,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/bukubukufps',
    icon: Youtube,
  },
]
