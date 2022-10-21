//DOM ELEMENTS 
let recipesContainer = document.querySelector("#recipes-container")
let recipePopup = document.querySelector(".recipe-popup");

//FORM 
let form = document.querySelector("#meals-form");
let mealName = document.querySelector("#meal-name");

//API URLS
const IDURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const NAMEURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';


//EVENTS FUNCTIONS 
window.addEventListener("load", () => {
    mealName.focus();
    getData("");
});

mealBtn.addEventListener("click", async (e) => {
    e.preventDefault(); 
    getData(mealName.value);
})

document.addEventListener("click", (e) => {
    let recipeDetailsContent = document.querySelector(".recipe-popup .content");

    if (recipeDetailsContent && e.target != recipeDetailsContent && !recipeDetailsContent.contains(e.target)) {
        recipePopup.innerHTML = "";
        recipePopup.classList.add("d-none");
    }
})

//GENERAL FUNCTIONS 
async function getData(inputValue) {
    meals = getLocalStorageData(inputValue);
    
    if (!meals) {
        meals = await getAPIData(NAMEURL, inputValue);
        meals.meals ? setLocalStorageData(inputValue, JSON.stringify(meals)) : null;
    }

    renderMeals(meals);
}

function renderMeals(meals) {
    recipesContainer.innerHTML = "";

    if (!meals.meals) {
        document.getElementById("notfound-text").classList.remove("d-none")
        return;
    }

    meals["meals"].forEach((meal) => {
        recipesContainer.innerHTML += `
                <div class="col mb-4">
                    <div class="recipe bg-white rounded-2 shadow-sm" data-id=${meal.idMeal} onclick=renderRecipeDetails(${meal.idMeal})>
                        <div class="img-container">
                            <img
                            src="${meal.strMealThumb}"
                            alt="recipe-img"
                            class="w-100"
                            />
                        </div>
                        <div class="recipe-text mt-3 p-3">
                            <h3 class="recipe-name fw-bold">${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>`
    })
}

async function renderRecipeDetails(recipeId) {
    let mealData = await getAPIData(IDURL, recipeId);
    mealData = mealData["meals"][0];
    let meal = 
            `<div class="container">            
                <div class="row justify-content-center text-center">
                    <div class="col-lg-5">
                        <div class="close-popup">X</div>
                        <div class="content bg-white rounded-1 shadow-sm">
                            <div class="img-cover" style='background-image:url(${mealData.strMealThumb})'></div>
                            <div class="text-block p-4">
                                <h4 class="meal-name">${mealData.strMeal}</h4>
                                <p class="meal-recipe text-black-50 pt-4">${mealData.strInstructions}</p>
                            <a href="${mealData.strSource}" class="recipe-link" target="_blank">${mealData.strSource || ""}</a>
                        </div>
                    </div>
                </div>
            </div>
            `
    document.querySelector(".recipe-popup").innerHTML = meal
    document.querySelector(".recipe-popup").classList.remove("d-none");
}

