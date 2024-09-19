"use client";

import Link from "next/link";

export default function Pet(props) {
  return (
    <Link href={`/petdetails/${props.id}`} className="block">
      <div className="rounded-lg border-white">
        <img src={props.images[0]} alt={props.name} />
        <h2>{props.name}</h2>
        <h3>{props.location}</h3>
        <h3>{props.breed}</h3>
      </div>
    </Link>
  );
}
