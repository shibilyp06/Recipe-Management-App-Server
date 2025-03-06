const Recipe = require("../model/recipeSchema");

module.exports = {
  // Add a new recipe
  addRecipe: async (req, res) => {
    const { title, ingredients, steps } = req.body;

    if (!title || !ingredients || !steps) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const newRecipe = new Recipe({ title, ingredients, steps });
      await newRecipe.save();

      res.status(201).json({ message: "Recipe added successfully!", recipe: newRecipe });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add recipe" });
    }
  },

  // Get all recipes with optional search and filter
  getRecipes: async (req, res) => {
    const { search } = req.query;

    try {
      const query = search ? { title: { $regex: search, $options: "i" } } : {};
      const recipes = await Recipe.find(query);

      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch recipes" });
    }
  },

  // Get a single recipe by ID
  getRecipeById: async (req, res) => {
    const { id } = req.params;

    try {
      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      res.status(200).json(recipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch recipe" });
    }
  },

  // Update a recipe
  updateRecipe: async (req, res) => {
    const { id } = req.params;
    const { title, ingredients, steps } = req.body;

    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        { title, ingredients, steps },
        { new: true, runValidators: true }
      );

      if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      res.status(200).json({ message: "Recipe updated successfully", recipe: updatedRecipe });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update recipe" });
    }
  },

  // Delete a recipe
  deleteRecipe: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(id);

      if (!deletedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete recipe" });
    }
  }
};
