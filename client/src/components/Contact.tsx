import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendMessageMutation = trpc.contact.sendMessage.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await sendMessageMutation.mutateAsync(formData);
      if (result.success) {
        toast.success(result.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'cgonsalezpillimue@gmail.com',
      href: 'mailto:cgonsalezpillimue@gmail.com',
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+57 323 973 4707',
      href: 'tel:+573239734707',
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Cali, Colombia',
      href: 'https://maps.google.com/?q=Cali,Colombia',
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
      id="contacto"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ponte en <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Contacto</span>
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              ¿Tienes un proyecto en mente o quieres colaborar? Me encantaría escucharte.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <h3 className="text-2xl font-bold mb-8">Información de Contacto</h3>

              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-card transition-colors group"
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors flex-shrink-0">
                      <Icon className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">{info.label}</p>
                      <p className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                    Nombre
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className="bg-card border-border/50 focus:border-blue-400 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                    className="bg-card border-border/50 focus:border-blue-400 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground/80">
                    Asunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Asunto del mensaje"
                    required
                    className="bg-card border-border/50 focus:border-blue-400 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground/80">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tu mensaje aquí..."
                    required
                    rows={5}
                    className="bg-card border-border/50 focus:border-blue-400 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || sendMessageMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white py-6 text-lg font-semibold rounded-lg group"
                >
                  {isLoading || sendMessageMutation.isPending ? 'Enviando...' : 'Enviar Mensaje'}
                  <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
