import { useState, useEffect, useContext } from "react";
import ThemeContext from "./ThemeContext";
import { useParams } from "react-router";

const Details = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState([]);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    requestPet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPet() {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
    const json = await res.json();
    setLoading(false);
    setPet(json.pets[0]);
  }

  if (loading) {
    return <h2>Loading details...</h2>;
  }
  const { animal, breed, city, state, description, name } = pet;
  return (
    <div className="details">
      <div>
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {city}, {state}
        </h2>
        <button style={{ backgroundColor: theme }}>Adopt {name}</button>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Details;
