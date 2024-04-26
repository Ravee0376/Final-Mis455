// script.js

document.addEventListener('DOMContentLoaded', () => {
    const inputMealSearch = document.getElementById('mealSearchInput');
    const buttonMealSearch = document.getElementById('mealSearchButton');
    const containerMealResults = document.getElementById('mealResultsContainer');
    const buttonMealShowAll = document.getElementById('mealShowAllButton');
    let mealsList = [];

    buttonMealSearch.addEventListener('click', () => {
        const termMealSearch = inputMealSearch.value.trim();
        if (termMealSearch !== '') {
            searchMeal(termMealSearch);
        }
    });

    async function searchMeal(term) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            mealsList = data.meals || [];
            displayResults(mealsList.slice(0, 5));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function displayResults(meals) {
        containerMealResults.innerHTML = '';
        if (meals.length === 0) {
            containerMealResults.innerHTML = '<p class="meal-not-found">Meal not found</p>';
            buttonMealShowAll.style.display = 'none';
        } else {
            meals.forEach(meal => {
                const mealElement = createMealElement(meal);
                containerMealResults.appendChild(mealElement);
            });
            buttonMealShowAll.style.display = mealsList.length > 5 ? 'block' : 'none';
        }
    }

    function createMealElement(meal) {
        const mealElement = document.createElement('div');
        mealElement.classList.add('meal-item');
        mealElement.innerHTML = `
            <div class="meal-item-info">
                <h2>${meal.strMeal}</h2>
                <p>ID: ${meal.idMeal}</p>
                <p>Name: ${meal.strMeal}</p>
                <p>Category: ${meal.strCategory}</p>
                <p>Tags: ${meal.strTags}</p>
                <p>Area: ${meal.strArea}</p>
            </div>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-item-info">
                <p>Instructions: ${meal.strInstructions}</p>
                <p>Source: ${meal.strSource}</p>
                <p>Watch Video: ${meal.strYoutube}</p>
            </div>
        `;
        return mealElement;
    }

    buttonMealShowAll.addEventListener('click', () => {
        displayResults(mealsList);
        buttonMealShowAll.style.display = 'none'; 
    });
});
