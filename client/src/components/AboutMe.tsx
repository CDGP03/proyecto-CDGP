import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, BarChart3, Zap } from 'lucide-react';

export default function AboutMe() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      transition: { duration: 0.8 },
    },
  };

  const features = [
    {
      icon: Code2,
      title: 'Desarrollo Web',
      description: 'Especialista en tecnologías modernas como React, Laravel y APIs REST',
    },
    {
      icon: BarChart3,
      title: 'Análisis de Datos',
      description: 'Experiencia en Power BI, Excel avanzado y visualización de datos',
    },
    {
      icon: Zap,
      title: 'Innovación Tecnológica',
      description: 'Pasión por aprender nuevas tecnologías y resolver problemas complejos',
    },
  ];

  return (
    <section
      id="sobre-mi"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">mí</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-foreground/80 leading-relaxed">
                Soy un desarrollador Full Stack con una sólida formación técnica y experiencia práctica en el ciclo completo de desarrollo de aplicaciones web. Mi enfoque combina la excelencia técnica con la capacidad de adaptarme rápidamente a nuevos desafíos.
              </p>

              <p className="text-lg text-foreground/80 leading-relaxed">
                Destaco por mi dominio de tecnologías modernas como React, Laravel y MySQL, así como por mi habilidad para optimizar rendimiento web y aplicar principios de SEO técnico. Además, poseo una sólida base en análisis de datos con Power BI.
              </p>

              <p className="text-lg text-foreground/80 leading-relaxed">
                Mi capacidad de aprendizaje rápido, adaptabilidad y pasión por la innovación tecnológica me permiten contribuir significativamente a equipos multidisciplinarios y entregar soluciones de calidad.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={itemVariants} className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="p-6 rounded-lg bg-card border border-border/50 hover:border-border transition-colors group"
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors">
                        <Icon className="text-blue-400" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-foreground/60 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 md:gap-8 p-8 rounded-lg bg-card border border-border/50"
          >
            {[
              { number: '5+', label: 'Años de Experiencia' },
              { number: '15+', label: 'Proyectos Completados' },
              { number: '100%', label: 'Dedicación' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-foreground/60 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
