import "../Styles/RecList.css";

import { Rec } from "./Recomendacion";

export const RecList = ({ recs, removeRec }) => {
  return recs.length ? (
    <>
      <h1 className="rec-list-title">Últimas recomendaciones.</h1>
      <ul className="rec-list">
        {recs.map((rec) => {
          return (
            <li className="rec-list-items" key={rec.id}>
              <Rec rec={rec} removeRec={removeRec} />
            </li>
          );
        })}
      </ul>
    </>
  ) : (
    <h1 className="rec-list-title">No hay recomendaciones...</h1>
  );
};

/*export const RecList = ({ recs, removeRec }) => {
  if (!Array.isArray(recs)) {
    return <p>Error: recs no es una matriz válida.</p>;
  }

  if (recs.length === 0) {
    return <p>No hay recomendaciones...</p>;
  }

  return (
    <ul className="rec-list">
      {recs.map((rec) => {
        if (!rec || !rec.id) {
          console.error("Rec sin propiedad 'id':", rec);
          return null; // Ignorar elementos sin id
        }

        return (
          <li key={rec.id}>
            <Rec rec={rec} removeRec={removeRec} />
          </li>
        );
      })}
    </ul>
  );
};*/
