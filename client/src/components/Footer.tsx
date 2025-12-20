import { Link } from "wouter";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border/40 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-foreground">Alina Mateș</h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Consiliere personală pentru o viață trăită cu sens, autenticitate și bucurie.
              Fiecare persoană este responsabilă pentru propria evoluție.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 rounded-full bg-secondary/30 text-foreground hover:bg-primary hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary/30 text-foreground hover:bg-primary hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Navigare Rapidă</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/servicii">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">Servicii & Tarife</span>
                </Link>
              </li>
              <li>
                <Link href="/despre">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">Despre Mine</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/programare">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">Programează o ședință</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>str. C. Brâncoveanu nr. 57A,<br />Timișoara, România</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:contact@alinamates.ro" className="hover:text-primary">contact@alinamates.ro</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+40700000000" className="hover:text-primary">+40 700 000 000</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Alina Mateș. Toate drepturile rezervate.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Termeni și Condiții</a>
            <a href="#" className="hover:text-foreground">Politica de Confidențialitate</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
