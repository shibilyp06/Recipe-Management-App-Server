const express = require("express");
const router = express.Router();
const {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/commonController");

router.post("/addRecipe", addRecipe);

router.get("/recipes", getRecipes);

router.get("/recipes/:id", getRecipeById);

router.put("/recipes/:id", updateRecipe);

router.delete("/recipes/:id", deleteRecipe);

module.exports = router;
