const getAPIData = async (url, query) => {
    let res = await fetch(`${url}${query}`);
    meals = await res.json();
    return meals
}

function getLocalStorageData(inputValue) {
    inputValue = inputValue || "allMeals";
    let meals = JSON.parse(localStorage.getItem(inputValue));
    return meals;
}

function setLocalStorageData(inputValue, value) {
    inputValue = inputValue || "allMeals";
    localStorage.setItem(inputValue, value);
}


