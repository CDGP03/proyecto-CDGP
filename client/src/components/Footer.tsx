import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
 
interface SocialLink {
  icon: React.ComponentType<{ size: number; className: string }>;
  href: string;
  label: string;
}
 
export default function Footer() {
  const currentYear = new Date().getFullYear();
 
  const socialLinks: SocialLink[] = [
    {
      icon: Mail,
      href: 'mailto:cgonsalezpillimue@gmail.com',
      label: 'Email',
    },
    {
      icon: Github,
      href: 'https://github.com/CDGP03',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/cristian-david-gonzalez-pillimue-05b2291b5',
      label: 'LinkedIn',
    },
  ];
 
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <motion.div
            className="text-center md:text-left"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Cristian David González
            </div>
            <p className="text-foreground/60 text-sm mt-2">
              Desarrollador Full Stack & Analista de Software
            </p>
          </motion.div>
 
          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  title={link.label}
                >
                  <Icon className="text-blue-400" size={20} />
                </motion.a>
              );
            })}
          </div>
        </div>
 
        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
 
        {/* Copyright */}
        <div className="text-center text-foreground/60 text-sm">
          <p>
            © {currentYear} Cristian David González Pillimue. Todos los derechos reservados.
          </p>
          <p className="mt-2">
            Diseñado y desarrollado con <span className="text-red-400">♥</span> usando React, Tailwind CSS y Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
 