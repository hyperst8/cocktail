class CocktailAPI {
    // Get drinks by name from search input field
    async getDrinksByName(name) {
        // Search by name
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

        // Return a json response
        const cocktails = await apiResponse.json();

        return {
            cocktails
        }

    }

    // Get drinks by ingredients
    async getDrinksByIngredient(ingredient) {
        // Search by ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        // Return a json response
        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    }

    // Get single recipe
    async getSingleRecipe(id) {
        // Search by id
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        // Return a json response
        const recipe = await apiResponse.json();

        return {
            recipe
        }
    }

    // Retrieve all categories from the REST API
    async getCategories() {
        const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        // Wait for the response and return JSON
        const categories = await apiResponse.json();

        return {
            categories
        }
    }

    // Get drinks by category
    async getDrinksByCategory(category) {
        // Search by category
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

        // Return a json response
        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    }

    // Get alcohol or non-alcohol drinks
    async getDrinksByAlcohol(term) {
        // Search by category
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);

        // Return a json response
        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    }
}