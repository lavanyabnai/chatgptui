import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
  const [setBreedList] = useState([]);
  const [setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
    }
  });
}
