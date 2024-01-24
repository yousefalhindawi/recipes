import { useEffect, useRef } from "react";

const RecipeDetails = ({ recipe }) => {
  const cardRef = useRef();
  console.log(recipe);
  useEffect(() => {
    cardRef.current.scrollIntoView({ behavior: "smooth" });
  }, [recipe]);
  return (
    <div className="container mt-3">
      <div
        ref={cardRef}
        className="card d-flex justify-content-center align-items-center"
      >
        <img
          src={recipe?.image}
          alt={recipe?.title}
          className="card-img-top"
          style={{ height: "300px", width: "300px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe?.title}</h5>
          <p
            className="card-text"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          ></p>
          <h6>Instructions:</h6>
          <p
            className="card-text"
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
