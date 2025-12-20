import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type InsertMessage } from "@shared/routes";
import { useSendMessage } from "@/hooks/use-messages";
import { Mail, MapPin, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const { mutate, isPending, isSuccess } = useSendMessage();
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(api.messages.create.input),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
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
                      <p className="text-muted-foreground">str. C. Brâncoveanu nr. 57A,<br />Timișoara, România</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg mb-1">Email</h3>
                      <a href="mailto:contact@alinamates.ro" className="text-muted-foreground hover:text-primary transition-colors">
                        contact@alinamates.ro
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg mb-1">Telefon</h3>
                      <p className="text-muted-foreground">+40 700 000 000</p>
                      <p className="text-sm text-muted-foreground/70 mt-1">Disponibil Luni-Vineri, 09:00 - 17:00</p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="h-64 bg-secondary/20 rounded-2xl overflow-hidden relative">
                   {/* map image */}
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop" 
                    alt="Map" 
                    className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                      Vezi pe Google Maps
                    </span>
                  </div>
                </div>
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
                      onClick={() => window.location.reload()}
                      className="mt-6 text-primary font-medium hover:underline"
                    >
                      Trimite un alt mesaj
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
                      />
                      {form.formState.errors.message && (
                        <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                      {isPending ? (
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
