import axios from "axios";

export async function searchFoods(category?: string) {
  const response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
  );

  const meals = response.data.meals ?? [];

  if (!category) {
    return meals;
  }

  return meals.filter(
    (meal: any) =>
      meal.strCategory?.toLowerCase() === category.toLowerCase()
  );
}