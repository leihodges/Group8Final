// By Leilah Hodges
// API

function searchRecipes() {
  const query = document.getElementById('query').value;
  const diet = document.getElementById('diet').value;
  const intolerances = document.getElementById('intolerances').value;
  const maxReadyTime = document.getElementById('maxReadyTime').value;

  const apiKey = 'ecfa945105af4846adacaa27a4d44ff8'; // Replace with your actual Spoonacular API key
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&diet=${diet}&intolerances=${intolerances}&maxReadyTime=${maxReadyTime}`;

  console.log('API URL:', apiUrl);

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          console.log('API Response:', data);

          const recipes = data.results;
          const resultsDiv = document.getElementById('results');

          if (recipes && recipes.length > 0) {
              // Use Promise.all to fetch details for all recipes
              const fetchPromises = recipes.map(recipe => {
                  const recipeId = recipe.id;
                  const recipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

                  return fetch(recipeDetailsUrl)
                      .then(response => response.json())
                      .then(recipeDetails => {
                          return { ...recipe, instructions: recipeDetails.instructions };
                      });
              });

              Promise.all(fetchPromises)
                  .then(recipesWithInstructions => {
                      const recipeWithInstructions = recipesWithInstructions.find(recipe => recipe.instructions);

                      if (recipeWithInstructions) {
                          const html = `
                              <div class="recipe">
                                  <h3>${recipeWithInstructions.title}</h3>
                                  <h5>"Yes,Chef!"</h5>
                                  <p>Instructions: ${recipeWithInstructions.instructions}</p>
                              </div>`;
                          resultsDiv.innerHTML = html;
                      } else {
                          resultsDiv.innerHTML = '<p>No results found with instructions.</p>';
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
          document.getElementById('results').innerHTML = 'Error fetching data';
      });
}


// navigation JS
document.getElementById('next').addEventListener('click', function() {
  // Set the new URL for the next page
  window.location.href = 'https://leihodges.github.io/Group8Final/';
});