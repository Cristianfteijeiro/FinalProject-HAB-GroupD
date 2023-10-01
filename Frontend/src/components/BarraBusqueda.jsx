import React, { useState } from "react";

import "../Styles/Header.css";

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
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
