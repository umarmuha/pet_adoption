"use client";

import { useQuery } from "@tanstack/react-query";
import fetchPets from "../api/fetchPets";

export default function usePetsList(search) {
  const result = useQuery({
    queryKey: ["pets", search],
    queryFn: fetchPets,
  });

  return [result?.data?.pets ?? [], result.status];
}
