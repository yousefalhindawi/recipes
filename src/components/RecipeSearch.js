import React, { useCallback, useState } from "react";
import useFetchRecipes from "../hooks/useFetchRecipes";
import { BASE_URL_SPOONACULAR_API } from "../constants/constants";

const RecipeSearch = ({ onRecipeSelect }) => {
  const [query, setQuery] = useState("");
  const { fetchRecipes, data, loading, error } = useFetchRecipes();

  const handleSearch = useCallback(() => {
    onRecipeSelect(null);
    fetchRecipes(query);
  }, [onRecipeSelect, fetchRecipes, query]);

  const handleRecipeSelect = useCallback(
    async (recipe) => {
      try {
        const response = await fetch(
          `${BASE_URL_SPOONACULAR_API}/${recipe.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
        );
        const recipeDetails = await response.json();
        onRecipeSelect(recipeDetails);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    },
    [onRecipeSelect]
  );

  return (
    <div className="container mt-3">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for delicious recipes, e.g., 'Hummus'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <ul className="list-group">
        {data && data.results.length > 0
          ? data.results.map((recipe) => (
              <li
                key={recipe.id}
                className="list-group-item"
              >
                <button
                  className="btn btn-link p-0 text-left"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRecipeSelect(recipe)}
                >
                  {recipe.title}
                </button>
              </li>
            ))
          : !loading &&
            data && (
              <p className="text-muted">
                No recipes found. Try a different search term.
              </p>
            )}
      </ul>
    </div>
  );
};

export default RecipeSearch;
