import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, CheckCircle2 } from 'lucide-react';

interface ExperienceItem {
  company: string;
  position: string;
  description: string;
  achievements: string[];
}

export default function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences: ExperienceItem[] = [
    {
      company: 'Siesa',
      position: 'Estudiante en Práctica',
      description: 'Desarrollo de dashboards y análisis de métricas',
      achievements: [
        'Desarrollo de dashboards interactivos en Jira',
        'Realización de pruebas de calidad QA',
        'Análisis de métricas con Power BI',
        'Optimización de procesos de reportería',
      ],
    },
    {
      company: 'Juana de Caycedo y Cuero',
      position: 'Estudiante Técnico de Sistemas',
      description: 'Administración de infraestructura tecnológica',
      achievements: [
        'Administración de servidores y redes',
        'Mantenimiento preventivo de equipos',
        'Actualización de software y sistemas operativos',
        'Soporte técnico a usuarios finales',
      ],
    },
    {
      company: 'Synerjoy',
      position: 'Técnico de Contacto',
      description: 'Atención al cliente y gestión de demanda',
      achievements: [
        'Atención al cliente de alta calidad',
        'Gestión eficiente de demanda de servicios',
        'Resolución de problemas técnicos',
        'Documentación de incidentes y soluciones',
      ],
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="experiencia"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Experiencia <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Laboral</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
          </motion.div>

          {/* Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline line */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-32 bg-gradient-to-b from-blue-500 to-transparent" />
                )}

                <div className="flex gap-6">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Briefcase className="text-white" size={24} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.div
                    className="flex-1 pt-2 pb-8"
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-6 rounded-lg bg-card border border-border/50 hover:border-border transition-colors">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-foreground mb-1">
                          {exp.position}
                        </h3>
                        <p className="text-lg text-blue-400 font-semibold">{exp.company}</p>
                      </div>

                      <p className="text-foreground/70 mb-6">{exp.description}</p>

                      {/* Achievements */}
                      <div className="space-y-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.div
                            key={achIndex}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ delay: index * 0.2 + achIndex * 0.1, duration: 0.5 }}
                          >
                            <CheckCircle2 className="text-cyan-400 flex-shrink-0 mt-1" size={18} />
                            <span className="text-foreground/80">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
