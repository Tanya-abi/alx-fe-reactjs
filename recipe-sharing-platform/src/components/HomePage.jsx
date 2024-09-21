import React, {useState, useEffect } from "react";

const recipesList = () => {
    const[recipes, setRecipes] = useState([]);

    useEffect(() => {

        fetch("/data.json")
        .then(response => response.json())
        .then(data => setRecipes(data))
        .catch(error => console.error("Error loading recipes:", error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className=" text-3xl font-bold text-center mb-6">Recipe List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipes.map(recipe => (
                <div key={recipe.id} className="bg-white shadow-md rounded-lg p-4 transform transition duration-300 hover:shadow-lg hover:scale-105">
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                <p className="text-gray-700">{recipe.summary}</p>
                </div>
            ))}
        </div>
        </div>
    );
};

export default recipesList;
