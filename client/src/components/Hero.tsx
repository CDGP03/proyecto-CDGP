import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
  onPortfolioClick: () => void;
}

export default function Hero({ onContactClick, onPortfolioClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center pt-20 pb-10 relative overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl opacity-20" />
      </div>

      <motion.div
        className="container mx-auto px-4 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar with Profile Image */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-400 via-cyan-400 to-violet-400 p-1 shadow-2xl overflow-hidden">
            <img
              src="/images/cristian.jpg"
              alt="Cristian David González Pillimue"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
        >
          Cristian David
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            González Pillimue
          </span>
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl"
        >
          Desarrollador Full Stack & Analista de Software
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-foreground/60 mb-12 max-w-2xl leading-relaxed"
        >
          Especializado en desarrollo web moderno y análisis de datos. Transformo ideas en soluciones tecnológicas escalables y eficientes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onPortfolioClick}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-lg font-semibold group"
          >
            Ver Habilidades
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>

          <Button
            onClick={onContactClick}
            variant="outline"
            className="border-2 border-foreground/30 hover:border-foreground/50 px-8 py-6 text-lg rounded-lg font-semibold group"
          >
            <Mail className="mr-2" size={20} />
            Contactar
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-foreground/50">Desplázate para explorar</p>
            <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-foreground/50 rounded-full mt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
