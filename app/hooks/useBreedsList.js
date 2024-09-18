"use client";

import { useQuery } from "@tanstack/react-query";
import fetchBreeds from "../api/fetchBreeds";
import fetchBreedListLocal from "../api/fetchBreedsListLocal";

export default function useBreedsList(animal) {
  const result = useQuery({
    queryKey: ["breeds", animal],
    queryFn: fetchBreedListLocal,
    retry: false,
  });

  // export default function useBreedsList() {
  //   const result = useQuery({
  //     queryKey: ["breeds"],
  //     queryFn: fetchBreedListLocal,
  //   });
  //
  console.log("Query result:", result);
  console.log("Breeds:", result?.data?.breeds);
  console.log("Error:", result.error);

  return [result?.data?.breeds ?? [], result.status];
}
