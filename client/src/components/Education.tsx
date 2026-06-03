import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award } from 'lucide-react';

interface EducationItem {
  school: string;
  degree: string;
  field: string;
  icon: React.ReactNode;
}

export default function Education() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const educationItems: EducationItem[] = [
    {
      school: 'SENA',
      degree: 'Tecnólogo',
      field: 'Análisis y Desarrollo de Software',
      icon: <GraduationCap className="text-cyan-400" size={28} />,
    },
    {
      school: 'Juana de Caycedo y Cuero',
      degree: 'Técnico Bachiller',
      field: 'Sistemas',
      icon: <Award className="text-violet-400" size={28} />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="formacion"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Formación <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Académica</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full" />
          </motion.div>

          {/* Education Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {educationItems.map((edu, index) => (
              <motion.div
                key={edu.school}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  className="p-8 rounded-lg bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-border transition-all h-full"
                  whileHover={{ y: -10, borderColor: 'rgba(100, 200, 255, 0.5)' }}
                >
                  {/* Icon */}
                  <motion.div
                    className="mb-6 p-4 w-fit rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    {edu.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-2 text-foreground">{edu.school}</h3>

                  <div className="mb-4 space-y-1">
                    <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      {edu.degree}
                    </p>
                    <p className="text-foreground/70">{edu.field}</p>
                  </div>

                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-6" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Certifications or Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-16 p-8 rounded-lg bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-border/50"
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">Compromiso Continuo</h3>
            <p className="text-foreground/80 leading-relaxed">
              Comprometido con el aprendizaje continuo y la actualización de mis habilidades técnicas. Participante activo en comunidades de desarrollo y siempre en búsqueda de nuevas tecnologías y metodologías que mejoren mi práctica profesional.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
