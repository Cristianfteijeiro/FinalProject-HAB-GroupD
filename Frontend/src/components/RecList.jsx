import { Rec } from "./Rec";

export const RecList = ({ recs, removeRec }) => {
  return recs.length ? (
    <ul className="rec-list">
      {recs.map((rec) => {
        return (
          <li key={rec.id}>
            <Rec rec={rec} removeRec={removeRec} />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>No hay recomendaciones...</p>
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