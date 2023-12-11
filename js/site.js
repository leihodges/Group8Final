// // Group 8 Final JavaScript
// // for ART101 Fall 2024

// hide and show js
$("#home").click(function() {
    $("#recipeDiv").hide();
});
  
$("#next").click(function() {
    $("#recipeDiv").show();
});

// source: Spoonacular and ChatGPT
function searchRecipes() {
    const query = document.getElementById('query').value;
    const diet = document.getElementById('diet').value;
    const intolerances = document.getElementById('intolerances').value;
    const maxReadyTime = document.getElementById('maxReadyTime').value;

    const apiKey = '01f947a8141b4c8cb4601915e6acf652'; 
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&diet=${diet}&intolerances=${intolerances}&maxReadyTime=${maxReadyTime}`;

    console.log('API URL:', apiUrl);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);

            const recipes = data.results;
            const resultsDiv = document.getElementById('recipeResults');

            if (recipes && recipes.length > 0) {
                // Use Promise.all to fetch details for all recipes
                const fetchPromises = recipes.map(recipe => {
                    const recipeId = recipe.id;
                    const recipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

                    return fetch(recipeDetailsUrl)
                        .then(response => response.json())
                        .then(recipeDetails => {
                            return { ...recipe, instructions: recipeDetails.instructions, ingredients: recipeDetails.extendedIngredients };
                        });
                });

                Promise.all(fetchPromises)
                    .then(recipesWithInstructions => {
                        const recipeWithInstructions = recipesWithInstructions.find(recipe => recipe.instructions && recipe.ingredients);

                        if (recipeWithInstructions) {
                            const ingredientsList = recipeWithInstructions.ingredients.map(ingredient => `<li>${ingredient.original}</li>`).join('');

                            const html = `
                                <div class="recipe">
                                    <h3>${recipeWithInstructions.title}</h3>
                                    <h5>- "Yes, Chef!" -</h5>
                                    <h4>Ingredients:</h4>
                                    <ul>${ingredientsList}</ul>
                                    <h4>Instructions:</h4>
                                    <p>${recipeWithInstructions.instructions}</p>
                                </div>`;
                            resultsDiv.innerHTML = html;
                        } else {
                            resultsDiv.innerHTML = '<p>No results found with instructions and ingredients.</p>';
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching recipe details:', error);
                        resultsDiv.innerHTML = '<p>Error fetching recipe details.</p>';
                    });
            } else {
                resultsDiv.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('recipeResults').innerHTML = 'Error fetching data';
        });
}

