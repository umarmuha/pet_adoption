"use client";

export default async function fetchBreeds({ queryKey }) {
  const animal = queryKey[1];

  if (!animal) return [];

  const response = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`,
  );

  if (!response.ok) {
    throw new Error("Breeds list http error stats", response.message);
  }

  return response.json();
}
