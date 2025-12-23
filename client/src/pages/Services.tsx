import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { motion } from "framer-motion";
import { Link } from "wouter";

// Static services data
const SERVICES = [
  {
    id: 1,
    title: "Sesiune de Consiliere - 50 min",
    slug: "sesiune-consiliere",
    duration: "50 minute",
    price: 200,
    shortDescription: "O sesiune individuală pentru a-ți explora provocările și a găsi soluții personalizate.",
    description: "Sesiunea de consiliere personală este o întâlnire one-on-one dedicată explorării nevoilor tale specifice. Te ajut să înțelegi mai bine situația ta, să identifici resursele interioare și să dezvolți o strategie personalizată pentru a depăși dificultățile.",
    imageUrl: "https://alinamates.ro/wp-content/uploads/2023/10/hai-sa-ne-cunoastem-1.png"
  },
  {
    id: 2,
    title: "Pachet Situație de Criză - 4 ședințe",
    slug: "pachet-criza",
    duration: "4 ședințe x 50 min",
    price: 700,
    shortDescription: "Sprijin intensiv pentru a depăși momente dificile și a restabili echilibrul emoțional.",
    description: "Acest pachet este conceput pentru situații de criză sau momente de mare dificultate emoțională. Prin 4 ședințe concentrate, te ajut să stabilizezi starea emoțională, să găsești resursele interioare și să ieși din criză mai puternic.",
    imageUrl: "https://alinamates.ro/wp-content/uploads/2023/10/alina-mates_situatie-criza.png"
  },
  {
    id: 3,
    title: "Consiliere de Cuplu - 60 min",
    slug: "consiliere-cuplu",
    duration: "60 minute",
    price: 280,
    shortDescription: "Îmbunătățește comunicarea și relația cu partenerul tău prin sesiuni de consiliere de cuplu.",
    description: "Consilirea de cuplu te ajută pe tine și pe partenerul tău să comunicați mai eficient, să înțelegeți nevoile reciproce și să consolidați relația. Lucrez cu ambii parteneri pentru a găsi soluții constructive și a reconstrui conexiunea.",
    imageUrl: "https://alinamates.ro/wp-content/uploads/2023/10/vreau-sa-ma-cunosc-2.png"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
            <span className="text-primary font-medium tracking-wide uppercase text-sm" data-testid="label-services">Servicii de Consiliere</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Investește în Tine
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fie că treci printr-o perioadă dificilă, vrei să te cunoști mai bine sau dorești să îți îmbunătățești relațiile, am pregătit programe adaptate nevoilor tale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`card-service-${service.id}`}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
          
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

          <div className="mt-16 text-center">
            <Link href="/contact">
              <button className="px-10 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all" data-testid="button-contact">
                Contactează-mă pentru mai multe detalii
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
