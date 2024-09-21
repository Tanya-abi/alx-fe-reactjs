import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
    const { id } = useParams ();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch("/data.json")
        .then((response) => response.json())
        .then((data) => {
            const selectedRecipe = data.find((recipe) => recipe.id === parseInt(id));
            setRecipe(selectedRecipe);
        })
        .catch((error) => console.error("Error fetching recipe details:", error));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>

        <img
          src={recipe.image} // Assuming 'image' is a property in the recipe data
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc ml-6">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-lg text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal ml-6">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="text-lg text-gray-700 mb-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
