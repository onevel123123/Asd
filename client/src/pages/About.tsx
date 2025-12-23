import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24">
        {/* Intro */}
        <div className="container mx-auto px-4 md:px-6 mb-24">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/30 rounded-[2rem] transform rotate-3 scale-95 translate-y-4 -z-10"></div>
              {/* Profile Image */}
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop" 
                alt="Alina Mateș" 
                className="w-full rounded-[2rem] shadow-xl"
              />
            </div>
            
            <div className="space-y-8">
              <span className="text-primary font-medium tracking-wide uppercase text-sm">Despre Mine</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                Călătoria spre <br/><span className="text-primary italic">autenticitate</span>
              </h1>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Sunt Alina Mateș, consilier pentru dezvoltare personală, și misiunea mea este să te ghidez în procesul tău de autocunoaștere și transformare.
                </p>
                <p>
                  Cred cu tărie că fiecare om are resursele interioare necesare pentru a-și depăși obstacolele, dar uneori avem nevoie de un ghid care să ne ajute să le redescoperim.
                </p>
                <p>
                  Abordarea mea este una caldă, empatică și non-judicativă. Creez un spațiu sigur unde te poți deschide și poți explora cele mai profunde gânduri și emoții fără teamă.
                </p>
              </div>

              <div className="pt-4">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" 
                  alt="Semnătura Alina" 
                  className="h-12 opacity-60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy / Quote */}
        <div className="bg-primary/5 py-24 my-24">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-foreground/80">
              "Fericirea nu este o destinație, ci un mod de a călători. Te invit să călătorim împreună spre cea mai bună versiune a ta."
            </p>
          </div>
        </div>

        {/* Credentials / Values */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Valorile Mele</h2>
            <p className="text-muted-foreground">Pilonii pe care se bazează practica mea</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Confidențialitate",
                desc: "Tot ce discutăm rămâne între noi. Spațiul terapeutic este sacru și protejat."
              },
              {
                title: "Empatie",
                desc: "Te ascult cu inima deschisă, fără să judec, încercând să înțeleg lumea prin ochii tăi."
              },
              {
                title: "Autonomie",
                desc: "Nu îți spun ce să faci, ci te ajut să găsești propriile răspunsuri și soluții."
              }
            ].map((val, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-border/50 text-center hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-serif font-bold mb-4">{val.title}</h3>
                <p className="text-muted-foreground">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 mt-24 text-center">
          <Link href="/contact">
            <button className="px-10 py-4 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all">
              Contactează-mă
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
