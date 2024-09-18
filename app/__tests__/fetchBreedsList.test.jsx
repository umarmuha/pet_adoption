import { expect, test } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useBreedsList from "../hooks/useBreedsList";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});

test("Breeds list is empty with no animal is provided", async () => {
  const { result } = renderHook(() => useBreedsList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  const [breeds, status] = result.current;

  expect(breeds).toHaveLength(0);
  expect(status).toBe("pending");
});

test("Returns a breeds list when an animal is provided", async () => {
  const breeds = [
    "Havanese",
    "German Shepherd",
    "Dachshund",
    "French Bulldog",
    "Labrador",
    "Husky",
    "Shih Tzu",
    "Pit Bull",
    "Jack Russel Terrier",
    "Boxer",
    "Dalmation",
    "Pekingese",
    "Weimaraner",
    "Australian Shepherd",
    "Goldendoodle",
    "Wheaten Terrier",
  ];

  fetchMock.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    }),
  );

  const { result } = renderHook(() => useBreedsList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  await waitFor(() => {
    expect(result.current[1]).toBe("success");
  });
  const [breedsList] = result.current;

  expect(breedsList).toEqual(breeds);
});
