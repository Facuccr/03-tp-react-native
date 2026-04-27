import { useState } from "react";

const useFilter = (data) => {
  const [query, setQuery] = useState("");

  const filtered = data.filter((item) =>
    item.nombre.toLowerCase().includes(query.toLowerCase()),
  );

  return { query, setQuery, filtered };
};

export default useFilter;
