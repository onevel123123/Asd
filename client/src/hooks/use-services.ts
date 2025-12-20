import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { Service } from "@shared/schema";

export function useServices() {
  return useQuery({
    queryKey: [api.services.list.path],
    queryFn: async () => {
      const res = await fetch(api.services.list.path);
      if (!res.ok) throw new Error("Nu s-au putut încărca serviciile.");
      return api.services.list.responses[200].parse(await res.json());
    },
  });
}

export function useService(slug: string) {
  return useQuery({
    queryKey: [api.services.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.services.get.path, { slug });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Serviciul nu a fost găsit.");
      return api.services.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}
