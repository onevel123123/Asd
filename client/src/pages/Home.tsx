import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Star, Sun, ShieldCheck } from "lucide-react";
import { useServices } from "@/hooks/use-services";

export default function Home() {
  const { data: services } = useServices();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-secondary/20 rounded-l-[100px] -z-10 blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[50%] bg-primary/5 rounded-r-full -z-10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm tracking-wide">
              Consiliere Personală & Dezvoltare
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] text-foreground">
              Descoperă ce ți se <span className="text-primary italic">potrivește</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              O viață plină de sens și fericire începe cu tine. Te însoțesc în călătoria ta spre autenticitate și echilibru interior.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/programare">
                <button className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300">
                  Începe călătoria ta
                </button>
              </Link>
              <Link href="/servicii">
                <button className="px-8 py-4 rounded-xl border border-border bg-white text-foreground font-semibold hover:bg-secondary/20 hover:border-secondary transition-all duration-300">
                  Vezi programele
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Hero Image */}
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10">
              <img 
                src="https://alinamates.ro/wp-content/uploads/2023/11/alina-mates_home_3.png" 
                alt="Consiliere și echilibru" 
                className="w-full h-auto object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-multiply" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-border/50 max-w-[200px] hidden md:block">
              <p className="font-serif italic text-lg text-primary">"Trăiește cu Pasiune și Autenticitate"</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Tu ești esența</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hai să dăm la o parte cine ni s-a spus că suntem, ce am fost învățați că trebuie să fim și să facem. Suntem fericiți cu adevărat doar când ne descoperim sinele autentic, propria ființă, propriul adevăr.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sunt aici pentru a te inspira să îți urmărești visurile și să îți depășești limitele. Te îndrum să îți folosești cunoștințele și abilitățile eficient, ca să îți construiești o viață plină de sens și fericire.
            </p>
            <div className="pt-8">
              <img 
                src="https://alinamates.ro/wp-content/uploads/2023/10/alina-mates_3-2.jpg" 
                alt="Signature or Symbol" 
                className="h-32 mx-auto opacity-80 rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Momentul potrivit este <span className="text-primary italic">acum</span></h2>
            <p className="text-muted-foreground">Beneficiile procesului de consiliere personală</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Sun className="w-8 h-8 text-primary" />,
                title: "Autocunoaștere", 
                desc: "Descoperă cine ești cu adevărat și ce îți dorești de la viață."
              },
              { 
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "Depășirea Crizelor", 
                desc: "Găsește resursele interioare pentru a trece peste dificultățile majore."
              },
              { 
                icon: <Star className="w-8 h-8 text-primary" />,
                title: "Claritate", 
                desc: "Pune ordine în gânduri și definește-ți obiectivele cu precizie."
              },
              { 
                icon: <Heart className="w-8 h-8 text-primary" />,
                title: "Echilibru", 
                desc: "Îmbunătățește-ți starea de spirit și relațiile cu cei din jur."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="bg-secondary/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold font-serif mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Programele Mele</h2>
              <p className="text-muted-foreground max-w-xl">
                Alege programul care rezonează cel mai bine cu nevoile tale actuale.
              </p>
            </div>
            <Link href="/servicii">
              <span className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all cursor-pointer">
                Toate Serviciile <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.slice(0, 3).map((service) => (
              <div key={service.id} className="h-full">
                {/* Simplified Card for Home */}
                <div className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all h-full flex flex-col">
                  <h3 className="text-xl font-bold font-serif mb-2">{service.title}</h3>
                  <div className="flex items-center text-sm text-primary font-medium mb-4">
                    <Clock className="w-4 h-4 mr-1" /> {service.duration}
                  </div>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {service.shortDescription}
                  </p>
                  <Link href={`/programare?service=${service.id}`}>
                    <button className="w-full py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
                      Detalii & Programare
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/servicii">
              <button className="text-primary font-semibold">Vezi toate serviciile</button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Fă primul pas spre schimbare
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
            Nu lăsa pe mâine fericirea și liniștea ta. Ești la o decizie distanță de o viață mai împlinită.
          </p>
          <Link href="/programare">
            <button className="px-10 py-4 bg-white text-primary font-bold text-lg rounded-xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300">
              Programează o ședință
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Icon for Services
function Clock({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
