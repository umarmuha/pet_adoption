"use client";

export default async function fetchPets({ queryKey }) {
  const { location, animal, breed } = queryKey[1];

  const response = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
  );

  if (!response.ok) {
    throw new Error("Pets http error status", response.message);
  }

  return response.json();
}
