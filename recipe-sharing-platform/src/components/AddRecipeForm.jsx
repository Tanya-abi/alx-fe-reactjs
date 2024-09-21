import React, { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({}); // For error tracking

  // Validate function to check for input errors
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Recipe title is required.";
    }
    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    } else if (ingredients.split(",").length < 2) {
      newErrors.ingredients = "Please include at least two ingredients.";
    }
    if (!steps.trim()) {
      newErrors.steps = "Preparation steps are required.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate(); // Call the validate function
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if there are any
      return;
    }

    // If no validation errors, reset errors and proceed
    setErrors({});
    
    // Simulate form submission or add logic to post data
    console.log({
      title,
      ingredients: ingredients.split(","),
      steps: steps.split("."),
    });

    // Clear form fields after successful submission
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg bg-white rounded-lg"> {/* Added shadow and background */}
      <h1 className="text-3xl font-bold text-center mb-6">Add a New Recipe</h1>

      <form onSubmit={handleSubmit}>
        {/* Recipe Title */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="title">
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.title ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring ${
              errors.title ? "focus:ring-red-500" : "focus:ring-blue-200"
            }`}
            placeholder="Enter recipe title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="ingredients"
          >
            Ingredients (comma separated)
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.ingredients ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring ${
              errors.ingredients ? "focus:ring-red-500" : "focus:ring-blue-200"
            }`}
            placeholder="Enter ingredients separated by commas"
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Preparation Steps */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="steps">
            Preparation Steps (period separated)
          </label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.steps ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring ${
              errors.steps ? "focus:ring-red-500" : "focus:ring-blue-200"
            }`}
            placeholder="Enter steps separated by periods"
          />
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
