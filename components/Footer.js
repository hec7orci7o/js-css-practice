import { SiInstagram, SiLinkedin, SiGithub } from 'react-icons/si';

const navigation = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/hec7orci7o/',
    icon: SiInstagram,
  },
  {
    name: 'LinekdIn',
    href: 'https://www.linkedin.com/in/hec7or/',
    icon: SiLinkedin,
  },
  {
    name: 'GtiHub',
    href: 'https://github.com/hec7orci7o',
    icon: SiGithub,
  },
];

export default function Footer() {
  return (
    <div className="py-2.5 px-8 md:flex md:items-center md:justify-between w-full absolute bottom-0 select-none">
      <div className="flex space-x-6 md:order-2">
        {navigation.map((item) => (
          <a key={item.name} href={item.href} className="text-gray-500/20 hover:text-gray-400 duration-300">
            <span className="sr-only">{item.name}</span>
            <item.icon className="h-5 w-5" aria-hidden="true" />
          </a>
        ))}
      </div>
      <p className="mt-8 text-xs leading-5 text-gray-400/20 md:order-1 md:mt-0">
        &copy; 2023. Made with ❤️ by Hec7orci7o
      </p>
    </div>
  );
}
