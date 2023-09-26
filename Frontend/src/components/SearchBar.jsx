import "../Styles/Header.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SearchBar = ({ onSearch }) => {
  // Recibe onSearch como prop
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query); // Llama a la función de búsqueda pasando el término de búsqueda
  };

  return (
    <div className="buscadorHome">
      <input
        className="buscar"
        type="search"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="recom" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};
