// Instanciate the Classes
const ui = new UI(),
      cocktail = new CocktailAPI(),
      cocktailDB = new CocktailDB();


// Create the Event Listeners
function eventListeners() {
    // Display favorites on load from the storage
    ui.isFavorite();

    // Document Ready
    document.addEventListener('DOMContentLoaded', documentReady);
    
    // Add event listener when form is submitted
    const searchForm = document.querySelector('#search-form');
    if(searchForm) {
        searchForm.addEventListener('submit', getCocktails);
    }

    // The results div listeners
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv) {
        resultsDiv.addEventListener('click', resultsDelegation);
    }

}

eventListeners();

// Get cocktails function
function getCocktails(e) {
    e.preventDefault();

    const searchTerm = document.querySelector('#search').value;

    // Check if there is written something in the search input field
    if(searchTerm === '') {
        // Call User Interface print message
        ui.printMessage('Please add something into the form', 'danger');
    } else {
        // Server response from promise
        let serverResponse;

        // Type of search (ingredients, cocktails or name)
        const type = document.querySelector('#type').value;

        // Evaluate the type of method and then execute the query
        switch(type) {
            case 'name':
                serverResponse = cocktail.getDrinksByName(searchTerm);
                break;
            case 'ingredient':
                serverResponse = cocktail.getDrinksByIngredient(searchTerm);
                break;    
            case 'category':
                serverResponse = cocktail.getDrinksByCategory(searchTerm);
                break;
            case 'alcohol':
                serverResponse = cocktail.getDrinksByAlcohol(searchTerm);
                break;                                
        }

        ui.clearResults();

        // query by the name of the drink
        
            serverResponse.then(cocktails => {
                if(cocktails.cocktails.drinks === null) {
                    ui.printMessage('There\'re are no results. Try a different name', 'danger');
                } else {
                    if(type === 'name') {
                        // Display with ingredients
                        ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
                    } else {
                        // Display without ingredients (category, alcohol, ingredient)
                        ui.displayDrinks(cocktails.cocktails.drinks);
                    }
                }
            })

    }

}

// Delegation for the #results area
function resultsDelegation(e) {
    e.preventDefault();

    if(e.target.classList.contains('get-recipe')) {
        cocktail.getSingleRecipe(e.target.dataset.id)
            .then(recipe => {
                // Displays single recipe into a modal
                ui.displaySingleRecipe(recipe.recipe.drinks[0]);
            })
    }

    // When favorite btn is clicked
    if(e.target.classList.contains('favorite-btn')) {
        if(e.target.classList.contains('is-favorite')) {
            // remove the class
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';

            // Remove from the Local Storage
            cocktailDB.removeFromDB(e.target.dataset.id);

        } else {
            // add the class
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';

            // Get info
            const cardBody = e.target.parentElement;

            const drinkInfo = {
                id: e.target.dataset.id,
                name: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img').src
            }
            
            // Add into the storage
            cocktailDB.saveIntoDB(drinkInfo);
        }
    }
}

// Document Ready
function documentReady() {
    // Select the search category select
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory) {
        ui.displayCategories();
    }

    // When Favorites page is open
    const favoritesTable = document.querySelector('#favorites');
    if(favoritesTable) {
        // Get the favorites from the storage and display them
        const drinks = cocktailDB.getFromDB();
        
        ui.displayFavorites(drinks);

        // When view or remove is clicked
        favoritesTable.addEventListener('click', (e) => {
            e.preventDefault();

            // When view button is clicked
            if(e.target.classList.contains('get-recipe')) {
                cocktail.getSingleRecipe(e.target.dataset.id)
                    .then(recipe => {
                        // Displays single recipe into a modal
                        ui.displaySingleRecipe(recipe.recipe.drinks[0]);
                    })
            }
            // When remove button is clicked
            if(e.target.classList.contains('remove-recipe')) {
                // Remove from DOM
                ui.removeFavorite(e.target.parentElement.parentElement);

                // Remove from the Local storage
                cocktailDB.removeFromDB(e.target.dataset.id);
            }
        })
    }
}