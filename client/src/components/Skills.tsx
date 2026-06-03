import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Progress } from '@/components/ui/progress';

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillsByCategory: Record<string, Skill[]> = {
    'Desarrollo Web': [
      { name: 'React', level: 95, category: 'Desarrollo Web' },
      { name: 'WordPress', level: 90, category: 'Desarrollo Web' },
      { name: 'HTML5 & CSS3', level: 95, category: 'Desarrollo Web' },
      { name: 'JavaScript', level: 90, category: 'Desarrollo Web' },
      { name: 'PHP', level: 85, category: 'Desarrollo Web' },
    ],
    'Frameworks & Backend': [
      { name: 'Laravel', level: 90, category: 'Frameworks & Backend' },
      { name: 'Node.js', level: 85, category: 'Frameworks & Backend' },
      { name: 'Express', level: 85, category: 'Frameworks & Backend' },
      { name: 'APIs REST', level: 90, category: 'Frameworks & Backend' },
    ],
    'Bases de Datos': [
      { name: 'MySQL', level: 90, category: 'Bases de Datos' },
      { name: 'PostgreSQL', level: 85, category: 'Bases de Datos' },
      { name: 'SQL', level: 92, category: 'Bases de Datos' },
    ],
    'Análisis de Datos': [
      { name: 'Power BI', level: 88, category: 'Análisis de Datos' },
      { name: 'Excel Avanzado', level: 85, category: 'Análisis de Datos' },
    ],
    'Herramientas & DevOps': [
      { name: 'Git & GitHub', level: 90, category: 'Herramientas & DevOps' },
      { name: 'Jira', level: 85, category: 'Herramientas & DevOps' },
      { name: 'VirtualBox & VMware', level: 80, category: 'Herramientas & DevOps' },
      { name: 'Linux & Windows', level: 85, category: 'Herramientas & DevOps' },
    ],
    'Metodologías': [
      { name: 'Scrum', level: 85, category: 'Metodologías' },
      { name: 'Testing/QA', level: 80, category: 'Metodologías' },
      { name: 'SEO Técnico', level: 85, category: 'Metodologías' },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="habilidades"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={categoryVariants} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Habilidades <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Técnicas</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full" />
          </motion.div>

          {/* Skills by Category */}
          <div className="grid md:grid-cols-2 gap-12">
            {Object.entries(skillsByCategory).map((entry, categoryIndex) => {
              const [category, skills] = entry;
              return (
                <motion.div
                  key={category}
                  variants={categoryVariants}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-semibold text-foreground/90">{category}</h3>

                  <motion.div
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                  >
                    {skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        variants={skillVariants}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground/80">{skill.name}</span>
                          <span className="text-sm text-foreground/60">{skill.level}%</span>
                        </div>

                        <div className="h-2 bg-card rounded-full overflow-hidden border border-border/50">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{
                              duration: 1.5,
                              delay: skillIndex * 0.1,

                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Soft Skills */}
          <motion.div variants={categoryVariants} className="mt-16 pt-16 border-t border-border/50">
            <h3 className="text-2xl font-semibold mb-8 text-foreground/90">Habilidades Blandas</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Resolución de Problemas',
                'Trabajo bajo Presión',
                'Resiliencia',
                'Comunicación Efectiva',
                'Adaptabilidad',
                'Trabajo en Equipo',
                'Pensamiento Analítico',
                'Liderazgo',
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  variants={skillVariants}
                  className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-border/50 hover:border-border transition-colors text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="font-medium text-sm md:text-base text-foreground/80">{skill}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
