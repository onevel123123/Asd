import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { useServices } from "@/hooks/use-services";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Services() {
  const { data: services, isLoading, error } = useServices();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
            <span className="text-primary font-medium tracking-wide uppercase text-sm">Servicii de Consiliere</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Investește în Tine
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fie că treci printr-o perioadă dificilă, vrei să te cunoști mai bine sau dorești să îți îmbunătățești relațiile, am pregătit programe adaptate nevoilor tale.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-red-600 font-medium">A apărut o eroare la încărcarea serviciilor.</p>
              <button onClick={() => window.location.reload()} className="mt-4 text-sm underline text-red-700">Încearcă din nou</button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Info Block */}
          <div className="mt-24 bg-secondary/20 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-4">Cum se desfășoară?</h3>
                <ul className="space-y-4">
                  {[
                    "Ședințele au loc online sau la cabinetul din Timișoara.",
                    "Confidențialitatea este garantată 100%.",
                    "Abordare bazată pe empatie și respect necondiționat.",
                    "Spațiu sigur pentru a explora orice gând sau emoție."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://alinamates.ro/wp-content/uploads/2023/10/alina-mates_produse.jpg" 
                  alt="Cabinet atmosferă" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
