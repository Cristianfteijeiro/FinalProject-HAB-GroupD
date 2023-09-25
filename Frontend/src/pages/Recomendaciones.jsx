import useRecs from "../hooks/useRecs";
import { RecList } from "../components/RecList";
import { MensajeError } from "../components/MensajeError";
/*import { NewTweet } from "../components/NewTweet";*/
import { useContext } from "react";
import { useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { Loading } from "../components/Loading";
import RecSearchForm from "../components/RecSearchForm";

export const Recomendaciones = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { recs, error, loading, addTweet, removeRec } = useRecs();
  /*const { user } = useContext(AuthContext);*/
  const visibleRecs = searchResults.length > 0 ? searchResults : recs;

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  const handleSearch = (query) => {
    // Filtrar las recomendaciones por título
    const results = recs.filter((rec) =>
      rec.titulo.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <section>
      <RecSearchForm onSearch={handleSearch} />
      <RecList recs={visibleRecs} removeRec={removeRec} />
      {/*{user ? <NewTweet addTweet={addTweet} /> : null}*/}
      {/* <h1>Últimas recomendaciones.</h1> */}
      {/* <RecList recs={recs} removeRec={removeRec} /> */}
    </section>
  );
};
