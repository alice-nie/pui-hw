
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// important variables for reference in app.js
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll')
const newBasePrice = rolls[rollType].basePrice


// populating the Glaze dropdown
let glazingDropdown = document.querySelector("#glazing-select");

for (let x of allGlazingOptions)
{
    let option = document.createElement("option");
    option.text = x.glazing;
    option.value = x.priceAdaptation;
    glazingDropdown.add(option);
}

// populating the Size dropdown
let sizeDropdown = document.querySelector("#size-select")

for (let x of allSizeOptions)
{
    let option = document.createElement("option");
    option.text = x.size;
    option.value = x.priceAdaptation;
    sizeDropdown.add(option);
}


// calculating and displaying price changes

// rounding to two decimals w/ toFixed learned from
// https://www.w3schools.com/jsref/jsref_tofixed.asp
function displayPrice(price) {
    let priceElement = document.querySelector("#price");
    priceElement.innerText = price.toFixed(2);
}
displayPrice(newBasePrice); //so that it's updated right away

function glazingChange(element) {
    basePrice = newBasePrice;
    const priceChange = parseFloat(element.value);
    const packPrice = parseFloat(document.querySelector("#size-select").value)
    updatedPrice = (basePrice + priceChange) * packPrice;
    displayPrice(updatedPrice);
}

function sizeChange(element) {
    basePrice = newBasePrice;
    const priceChange = parseFloat(element.value);
    const glazingPrice = parseFloat(document.querySelector("#glazing-select").value)
    updatedPrice = (basePrice + glazingPrice) * priceChange;
    displayPrice(updatedPrice);
}
  


// ------------- Adding URL and Cart Console functionality -------------

// Update the header text
const headerElement = document.querySelector('#product-detail-title');
headerElement.innerText = rollType + " Cinnamon Roll" 

// Update the image
const donutImage = document.querySelector('#product-detail-img');
donutImage.src = '../assets/products/' + rolls[rollType].imageFile;

function retrieveFromLocalStorage() {
    const cartArrayString = localStorage.getItem('storedRolls');
    const cartArray = JSON.parse(cartArrayString);
    return cartArray;
}

let cartArray = [];
if (localStorage.getItem('storedRolls') != null) {
    cartArray = retrieveFromLocalStorage();
} 

// learned how to get the key value from dictionary here using options and selectedIndex
// https://www.w3schools.com/jsref/coll_select_options.asp
function onCartClick() {
    const glazingSelectElement = document.querySelector("#glazing-select");
    const glazingSelectedOption = glazingSelectElement.options[glazingSelectElement.selectedIndex]
    const sizeSelectElement = document.querySelector("#size-select");
    const sizeSelectedOption = sizeSelectElement.options[sizeSelectElement.selectedIndex]
    const newDonut = new Roll(rollType, glazingSelectedOption.textContent, sizeSelectedOption.textContent, newBasePrice)
    cartArray.push(newDonut)
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const cartArrayString = JSON.stringify(cartArray);
    localStorage.setItem('storedRolls', cartArrayString);

    console.log(localStorage.getItem('storedRolls'));
}

document.querySelector("#to-cart").addEventListener('click', onCartClick);



