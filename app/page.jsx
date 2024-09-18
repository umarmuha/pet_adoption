"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchParams from "./SearchParams/SearchParams";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-950 p-4">
      <QueryClientProvider client={queryClient}>
        <SearchParams />
      </QueryClientProvider>
    </main>
  );
}
