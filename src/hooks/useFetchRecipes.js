import { useCallback, useState } from "react";
import { BASE_URL_SPOONACULAR_API } from "../constants/constants";

const useFetchRecipes = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL_SPOONACULAR_API}/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchRecipes, data, loading, error };
};

export default useFetchRecipes;
