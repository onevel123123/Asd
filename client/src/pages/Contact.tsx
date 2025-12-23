import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";

const contactFormSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă cel puțin 2 caractere"),
  email: z.string().email("Email invalid"),
  message: z.string().min(10, "Mesajul trebuie să aibă cel puțin 10 caractere"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSending(true);
    setError("");
    
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: "hello@alinamates.ro",
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        }
      );
      
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError("Eroare la trimiterea mesajului. Încearcă din nou.");
      console.error("EmailJS Error:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold">Contactează-mă</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Sunt aici să îți răspund la întrebări. Scrie-mi un mesaj și voi reveni către tine în cel mai scurt timp posibil.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
              {/* Contact Info */}
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg mb-1">Locație</h3>
                      <p className="text-muted-foreground">Timișoara, Str. Memorandului, nr. 96<br />România</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg mb-1">Email</h3>
                      <a href="mailto:hello@alinamates.ro" className="text-muted-foreground hover:text-primary transition-colors">
                        hello@alinamates.ro
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg mb-1">Telefon</h3>
                      <a href="tel:+40724570927" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                        +40 724 570 927
                      </a>
                      <p className="text-sm text-muted-foreground/70 mt-1">WhatsApp disponibil</p>
                    </div>
                  </div>
                </div>

                {/* Contact Image */}
                <a 
                  href="https://maps.app.goo.gl/kRPC2TDYEJA2yP5u7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-64 bg-secondary/20 rounded-2xl overflow-hidden relative block hover:shadow-lg transition-shadow duration-300"
                >
                  <img 
                    src="https://alinamates.ro/wp-content/uploads/2023/10/alina-mates_contact-1.jpg" 
                    alt="Cabinet" 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                    <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-white transition-colors cursor-pointer">
                      Vezi pe Google Maps
                    </span>
                  </div>
                </a>
              </div>

              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-lg shadow-black/5 border border-border/50"
              >
                {isSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold">Mesaj Trimis!</h3>
                    <p className="text-muted-foreground">
                      Mulțumesc pentru mesaj. Voi reveni cu un răspuns în curând.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="mt-6 text-primary font-medium hover:underline"
                    >
                      Scrie un alt mesaj
                    </button>
                  </div>
                ) : (
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <h3 className="text-2xl font-serif font-bold mb-6">Scrie-mi un mesaj</h3>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Numele tău</label>
                      <input
                        {...form.register("name")}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                        placeholder="ex: Andrei Popescu"
                        data-testid="input-name"
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <input
                        {...form.register("email")}
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                        placeholder="ex: andrei@email.com"
                        data-testid="input-email"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Mesaj</label>
                      <textarea
                        {...form.register("message")}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                        placeholder="Cu ce te pot ajuta?"
                        data-testid="input-message"
                      />
                      {form.formState.errors.message && (
                        <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>
                      )}
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 bg-red-50 p-3 rounded">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                      data-testid="button-submit"
                    >
                      {isSending ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" /> Se trimite...
                        </span>
                      ) : "Trimite Mesajul"}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
