
import { useState, useEffect } from "react";

import axios from "axios";

export default function GetDog() {
  const [image, setimage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://dog.ceo/api/breeds/image/random`
        );
        setimage(response.data.message);
        console.log(response.data.message);
      } catch (err) {
        setError(err.message);
      } 
    };
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Random dog image</h1>
      {error && <h1>{`The error is ${error}`}</h1>}
      {image && <img src={image} alt="dog" />}
    </div>
  );
}
