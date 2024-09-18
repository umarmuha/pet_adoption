"use client";

const mockData = {
  animal: "dog",
  breeds: [
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
  ],
};

export default async function fetchBreedListLocal({ queryKey }) {
  const animal = queryKey[0];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockData[animal]) {
        resolve(mockData);
      } else {
        reject(new Error(`Animal ${animal} not found`));
      }
    }, 2000);
  });
}
