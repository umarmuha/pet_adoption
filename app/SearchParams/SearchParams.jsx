"use client";

import { useState } from "react";
import useBreedsList from "../hooks/useBreedsList";
import Pet from "../Pet/Pet";
import usePetsList from "../hooks/usePetsList";

const ANIMALS = ["dog", "cat", "bird"];

export default function SearchParams() {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");

  // const [breeds, status] = useBreedsList();
  const [breeds, status] = useBreedsList(animal);

  const search = { location, animal, breed };

  const [pets, petStatus] = usePetsList(search);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex w-full flex-col md:flex-row">
      <form
        className="md:m4 h-fit w-full rounded-lg border-2 border-indigo-600 p-8 md:w-1/4"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="location">
          Location
          <input
            className="bg-gray-600"
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            value={location}
            placeholder="Location"
          />
        </label>
        <label className="block" htmlFor="animal">
          Animal
          <select
            className="bg-gray-600"
            onChange={(e) => {
              setBreed("");
              setAnimal(e.target.value);
            }}
            name={animal}
            id={animal}
          >
            <option value=""></option>
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label className="block" htmlFor="breed">
          Breed
          <select
            onChange={(e) => setBreed(e.target.value)}
            className="bg-gray-600"
            name={breed}
            id={breed}
          >
            <option value="">Select a breed...</option>
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button
          className="rounded-lg bg-indigo-600 p-2 font-semibold"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="flex flex-wrap pl-12 md:w-3/4">
        {pets.map((pet) => (
          <div key={pet.id} className="flex-col sm:w-1/2 md:w-1/3 md:flex-row">
            <Pet
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              location={pet.location}
              images={pet.images}
              id={pet.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
