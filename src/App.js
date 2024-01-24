import "./App.css";
import { useState } from "react";
import RecipeSearch from "./components/RecipeSearch";
import RecipeDetails from "./components/RecipeDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <div className="container">
          <h1 className="mt-3">Recipe App</h1>
          <RecipeSearch onRecipeSelect={handleRecipeSelect} />
          {selectedRecipe && <RecipeDetails recipe={selectedRecipe} />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
