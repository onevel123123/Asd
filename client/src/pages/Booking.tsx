import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type InsertBooking } from "@shared/routes";
import { useCreateBooking } from "@/hooks/use-bookings";
import { useServices } from "@/hooks/use-services";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { format, addDays, startOfToday, isWeekend } from "date-fns";
import { ro } from "date-fns/locale";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Steps for the wizard
const STEPS = ["Serviciu", "Data & Ora", "Detalii", "Finalizare"];

export default function Booking() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const preSelectedServiceId = searchParams.get("service");

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  
  const { data: services, isLoading: isLoadingServices } = useServices();
  const { mutate, isPending, isSuccess } = useCreateBooking();

  const form = useForm<InsertBooking>({
    resolver: zodResolver(api.bookings.create.input),
    defaultValues: {
      serviceId: preSelectedServiceId ? parseInt(preSelectedServiceId) : undefined,
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      date: undefined, // Will set this before submit
    },
  });

  const selectedServiceId = form.watch("serviceId");

  // Skip step 0 if service pre-selected
  useEffect(() => {
    if (preSelectedServiceId && !form.formState.isDirty) {
      setCurrentStep(1);
    }
  }, [preSelectedServiceId, form.formState.isDirty]);

  const onSubmit = (data: InsertBooking) => {
    if (!selectedDate || !selectedTime) return;
    
    // Combine date and time
    const finalDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    finalDate.setHours(hours, minutes);

    mutate({ ...data, date: finalDate }, {
      onSuccess: () => {
        // Automatically handled by component state via isSuccess
      }
    });
  };

  const nextStep = async () => {
    if (currentStep === 0) {
      if (!selectedServiceId) return; // Must select service
    }
    if (currentStep === 1) {
      if (!selectedDate || !selectedTime) return; // Must select date/time
    }
    if (currentStep === 2) {
      // Validate form fields before submitting
      const valid = await form.trigger(["customerName", "customerEmail", "customerPhone"]);
      if (!valid) return;
      
      // Submit form
      form.handleSubmit(onSubmit)();
      return;
    }
    
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  // Mock time slots
  const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-grow flex items-center justify-center pt-20">
          <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md text-center space-y-6 mx-4 border border-border">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground">Programare Confirmată!</h2>
            <p className="text-muted-foreground text-lg">
              Vă mulțumesc! Detaliile programării au fost trimise pe email. Vă voi contacta în curând pentru confirmarea finală.
            </p>
            <button 
              onClick={() => setLocation("/")}
              className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Înapoi la Acasă
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex justify-between relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary/30 -z-10 -translate-y-1/2 rounded-full" />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500" 
                style={{ width: `${(currentStep / (STEPS.length - 2)) * 100}%` }}
              />
              
              {STEPS.slice(0, 3).map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 bg-background px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${
                    idx <= currentStep 
                      ? "bg-primary border-primary text-white" 
                      : "bg-white border-secondary text-muted-foreground"
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-xs font-medium ${idx <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-black/5 border border-border/50 overflow-hidden min-h-[500px] flex flex-col">
            <div className="p-8 md:p-12 flex-grow">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: SELECT SERVICE */}
                {currentStep === 0 && (
                  <motion.div 
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-serif font-bold mb-8">Alege serviciul dorit</h2>
                    {isLoadingServices ? (
                      <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        {services?.map((service) => (
                          <div 
                            key={service.id}
                            onClick={() => form.setValue("serviceId", service.id)}
                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                              selectedServiceId === service.id 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <h3 className="font-bold text-lg">{service.title}</h3>
                            <div className="flex justify-between items-center mt-4">
                              <span className="text-muted-foreground text-sm flex items-center">
                                <Clock className="w-4 h-4 mr-1" /> {service.duration}
                              </span>
                              <span className="font-bold text-primary">{service.price} LEI</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 2: DATE & TIME */}
                {currentStep === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid md:grid-cols-2 gap-12"
                  >
                    <div className="space-y-6">
                      <h2 className="text-2xl font-serif font-bold">Alege data</h2>
                      <div className="border border-border/60 rounded-xl p-4 inline-block">
                        <DayPicker
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          locale={ro}
                          disabled={[{ before: new Date() }, isWeekend]}
                          className="!font-sans"
                          modifiersClassNames={{
                            selected: "!bg-primary !text-white hover:!bg-primary/90",
                            today: "text-primary font-bold"
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h2 className="text-2xl font-serif font-bold">Alege ora</h2>
                      {!selectedDate ? (
                        <p className="text-muted-foreground italic">Te rog alege mai întâi o dată.</p>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-3 px-4 rounded-xl font-medium text-sm border transition-all ${
                                selectedTime === time
                                  ? "bg-primary text-white border-primary"
                                  : "bg-white text-foreground border-border hover:border-primary/50"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: DETAILS */}
                {currentStep === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 max-w-lg mx-auto"
                  >
                    <h2 className="text-2xl font-serif font-bold text-center">Datele tale de contact</h2>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Nume Complet</label>
                        <input
                          {...form.register("customerName")}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                          placeholder="ex: Andrei Popescu"
                        />
                        {form.formState.errors.customerName && (
                          <p className="text-sm text-red-500">{form.formState.errors.customerName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <input
                          {...form.register("customerEmail")}
                          type="email"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                          placeholder="ex: andrei@email.com"
                        />
                        {form.formState.errors.customerEmail && (
                          <p className="text-sm text-red-500">{form.formState.errors.customerEmail.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Telefon</label>
                        <input
                          {...form.register("customerPhone")}
                          type="tel"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                          placeholder="ex: 0722 123 456"
                        />
                        {form.formState.errors.customerPhone && (
                          <p className="text-sm text-red-500">{form.formState.errors.customerPhone.message}</p>
                        )}
                      </div>

                      <div className="pt-4 p-6 bg-secondary/20 rounded-xl">
                        <h4 className="font-bold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Rezumat</h4>
                        <p className="font-serif font-bold text-lg">{services?.find(s => s.id === selectedServiceId)?.title}</p>
                        <p className="text-foreground">
                          {selectedDate && format(selectedDate, "d MMMM yyyy", { locale: ro })} la {selectedTime}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="p-8 border-t border-border/50 bg-secondary/10 flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0 || isPending}
                className="px-6 py-2 rounded-lg text-muted-foreground hover:text-foreground font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Înapoi
              </button>
              
              <button
                onClick={nextStep}
                disabled={isPending}
                className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {currentStep === 2 ? "Finalizează Programarea" : "Continuă"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
