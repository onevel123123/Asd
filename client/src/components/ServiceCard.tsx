import type { Service } from "@shared/schema";
import { Link } from "wouter";
import { Clock, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border/40 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <div className="mt-2 flex items-center text-sm text-muted-foreground font-medium">
          <Clock className="w-4 h-4 mr-1.5" />
          {service.duration}
        </div>
      </div>
      
      <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
        {service.shortDescription || service.description.substring(0, 120) + "..."}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/30">
        <span className="text-xl font-bold text-primary">
          {service.price} LEI
        </span>
        <Link href={`/programare?service=${service.id}`}>
          <button className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors group-hover:translate-x-1 duration-300">
            Programează
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}
