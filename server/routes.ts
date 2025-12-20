import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    await storage.createService({
      title: "Ședință consiliere personală",
      slug: "consiliere-personala",
      description: "Ședință standard de consiliere pentru dezvoltare personală, creșterea stimei de sine și rezolvarea conflictelor interioare. Durată: 50 minute.",
      shortDescription: "Consiliere individuală pentru dezvoltare personală.",
      price: 150,
      duration: "50 min",
      imageUrl: "https://alinamates.ro/wp-content/uploads/2023/10/hai-sa-ne-cunoastem-1.png"
    });

    await storage.createService({
      title: "Situație de criză",
      slug: "situatie-de-criza",
      description: "Pachet special pentru situații de criză majoră. Include o ședință extinsă inițială și 4 ședințe standard de urmărire.",
      shortDescription: "Pachet intensiv pentru situații dificile.",
      price: 800,
      duration: "1 x 90 min + 4 x 50 min",
      imageUrl: "https://alinamates.ro/wp-content/uploads/2023/10/alina-mates_situatie-criza.png"
    });

    await storage.createService({
      title: "Ședință consiliere de cuplu",
      slug: "consiliere-cuplu",
      description: "Consiliere dedicată cuplurilor care doresc să își îmbunătățească comunicarea și să rezolve problemele din relație.",
      shortDescription: "Suport pentru armonie în relația de cuplu.",
      price: 200,
      duration: "60-70 min",
      imageUrl: "https://alinamates.ro/wp-content/uploads/2023/10/vreau-sa-ma-cunosc-2.png"
    });
    console.log("Database seeded with services.");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Seed data on startup
  seedDatabase().catch(console.error);

  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get(api.services.get.path, async (req, res) => {
    const service = await storage.getServiceBySlug(req.params.slug);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  });

  app.post(api.bookings.create.path, async (req, res) => {
    try {
      const input = api.bookings.create.input.parse({
        ...req.body,
        date: new Date(req.body.date) // Ensure date is parsed correctly
      });
      const booking = await storage.createBooking(input);
      res.status(201).json({ id: booking.id, message: "Booking created successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json({ id: message.id, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
