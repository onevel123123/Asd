import { useMutation } from "@tanstack/react-query";
import { api, type InsertBooking } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateBooking() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertBooking) => {
      // Coerce serviceId to number if it comes as string from forms
      const payload = {
        ...data,
        serviceId: Number(data.serviceId),
      };
      
      const validated = api.bookings.create.input.parse(payload);
      
      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Date invalide.");
        }
        throw new Error("Eroare la crearea programării.");
      }
      
      return api.bookings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Programare trimisă!",
        description: "Vă vom contacta în curând pentru confirmare.",
      });
    },
    onError: (error) => {
      toast({
        title: "Eroare",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
