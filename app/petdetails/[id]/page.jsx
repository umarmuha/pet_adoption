"use client";

import { useQuery } from "@tanstack/react-query";
import Carousel from "@/app/Carousel/Carousel";
import Modal from "@/app/Modal/Modal";
import { useState } from "react";

async function getPetDetails({ queryKey }) {
  const id = queryKey[1];
  const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch pet details");
  }
  return res.json();
}

export default function PetDetails({ params }) {
  const [showModal, setShowModal] = useState(false);
  const { id } = params;
  console.log(id);

  const { data, status, error } = useQuery({
    queryKey: ["petDetails", id],
    queryFn: getPetDetails,
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  const pet = data?.pets?.[0];
  console.log(pet);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">{pet.name}</h1>
      <Carousel images={pet.images} />
      <p className="mb-2">
        <strong>Animal:</strong> {pet.animal}
      </p>
      <p className="mb-2">
        <strong>Breed:</strong> {pet.breed}
      </p>
      <p className="mb-2">
        <strong>Location:</strong> {pet.city}, {pet.state}
      </p>
      <p className="mb-4">{pet.description}</p>
      <button onClick={() => setShowModal(true)}>Adopt</button>
      {showModal ? (
        <Modal>
          <div>
            Would you like to adopt {pet.name}
            <button>Yes</button>
            <button onClick={() => setShowModal(false)}>No</button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
