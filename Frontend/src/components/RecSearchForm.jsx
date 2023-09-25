import React, { useState } from "react";
import { Link } from "react-router-dom";

const RecSearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por título"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Link to="/recomendaciones">
        <button onClick={handleInputChange}>Buscar</button>
      </Link>
    </div>
  );
};

export default RecSearchForm;
