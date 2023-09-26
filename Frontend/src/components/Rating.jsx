import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ratingSerivice } from "../services"; // Importa la función desde services/index.js
/* import "../Styles/Rating.css"; */

export const Rating = ({ initialValue, onRate, recId }) => {
  const [rating, setRating] = useState(initialValue);
  const { token, user } = useContext(AuthContext);

  const handleRatingChangeLocal = async (newRating) => {
    // Usa la función importada desde services
    ratingSerivice(newRating, recId, token, setRating, onRate);
  };

  const handleInputChange = (newRating) => {
    // Al hacer clic en el input, cambia la calificación y recarga la página
    handleRatingChangeLocal(newRating);
    window.location.reload();
  };

  return (
    <div className="rating">
      <span className="rating-label">Puntúa esta recomendación: </span>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
        <label key={value}>
          <input
            type="radio"
            name="rating"
            value={value}
            checked={value === rating}
            onChange={() => handleInputChange(value)}
          />
          <span className="star" data-rating={value}></span>
        </label>
      ))}
    </div>
  );
};
