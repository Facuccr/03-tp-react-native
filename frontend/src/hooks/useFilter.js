import { useState, useMemo } from "react";

const useFilter = (data) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return data.filter((item) =>
      item.nombre.toLowerCase().includes(query.toLowerCase()),
    );
  }, [data, query]);

  return { query, setQuery, filtered };
};

export default useFilter;
