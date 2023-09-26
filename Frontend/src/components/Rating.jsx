import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const baseURL = import.meta.env.VITE_API_URL;

export const Rating = ({ initialValue, onRate, recId }) => {
  const [rating, setRating] = useState(initialValue);
  const { token, user } = useContext(AuthContext);
  const handleRatingChange = async (newRating) => {
    try {
      const response = await fetch(
        `${baseURL}/recomendaciones/${recId}/votar`,
        {
          method: "POST",
          body: JSON.stringify({ vote: newRating }),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        // Puedes manejar el error aquí
        console.error("Error al enviar el voto:", response.statusText);
        return;
      }

      setRating(newRating);
      onRate(newRating);
    } catch (error) {
      console.error("Error al enviar el voto:", error);
    }
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
            onChange={() => handleRatingChange(value)}
          />
          {value}
        </label>
      ))}
    </div>
  );
};
