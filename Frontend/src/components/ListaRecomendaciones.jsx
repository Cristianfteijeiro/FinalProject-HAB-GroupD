import React from "react";
import { Link } from "react-router-dom";

import { Rec } from "./Recomendacion";

import "../Styles/ListaRecomendacion.css";

export const RecList = ({ recs, removeRec }) => {
  return (
    <div className="recomendaciones">
      <h1 className="rec-list-title">Experiencias compartidas.</h1>
      <Link to="/recomendar">
        <button className="recom">Cuéntanos tu experiencia.</button>
      </Link>
      {recs.length ? (
        <ul className="rec-list">
          {recs.map((rec) => {
            return (
              <li className="rec-list-items" key={rec.id}>
                <Rec rec={rec} removeRec={removeRec} />
              </li>
            );
          })}
        </ul>
      ) : (
        <h1 className="rec-list-title">
          Todavía no tenemos ninguna recomendación, ¿Quieres ser el primero?
        </h1>
      )}
    </div>
  );
};
