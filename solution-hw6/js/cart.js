
class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;

        this.element = null;
    }
}

// retrieve cart from local storage and populate the cart list
function retrieveFromLocalStorage() {
    const cartArrayString = localStorage.getItem('storedRolls');
    const cartArray = JSON.parse(cartArrayString);
    //replace current roll with computed roll
    for (let i=cartArray.length-1; i >= 0 ; i--) {
        let rollData = cartArray[i];
        cartArray[i] = addComputedRoll(rollData.type, rollData.glazing, rollData.size, rollData.basePrice);
        createElement(cartArray[i]);
    }
    return cartArray;
    
}

// find how to convert an array to a set
// https://stackoverflow.com/questions/28965112/javascript-array-to-set
let cartSet = new Set();
if (localStorage.getItem('storedRolls') != null) {
    let cartArray = retrieveFromLocalStorage();
    cartSet = new Set(cartArray);
} 

// function to get the price of glaze, takes in a string
function getGlazingPrice(rollGlazing) {
    for (let i = 0; i < allGlazingOptions.length; i++) {
        glazeType = allGlazingOptions[i];
        if (glazeType.glazing.includes(rollGlazing)) {
            const glazingPrice = glazeType.priceAdaptation;
            return parseFloat(glazingPrice);
        }
    }
    return 0;

}

// function to get the price of pack size, takes in a number
function getSizePrice(packSize) {
    for (let i = 0; i < allSizeOptions.length; i++) {
        sizeOpt = allSizeOptions[i];
        if (sizeOpt.size == packSize) {
            const packPrice = sizeOpt.priceAdaptation;
            return parseFloat(packPrice);
        }
    }
    return 0;
}

// function to add a roll to the cart set
// takes in baseprice and builds object with calculated price
function addComputedRoll(rollType, rollGlazing, packSize, rollPrice) {
    glazingPrice = getGlazingPrice(rollGlazing);
    sizePrice = getSizePrice(packSize);
    calculatedPrice = (rollPrice + glazingPrice) * sizePrice;
    calculatedPrice = calculatedPrice.toFixed(2);

    const computedRoll = new Roll(rollType, rollGlazing, packSize, calculatedPrice);
    cartSet.add(computedRoll);

    return computedRoll; 
}


// Display cart items on the page, uses template
function createElement(roll) {
    const template = document.querySelector("#checkout-item-template");
    const clone = template.content.cloneNode(true);
    roll.element = clone.querySelector(".checkout-item");

    const btnRemove = roll.element.querySelector(".remove");
    btnRemove.addEventListener("click", () => {
        deleteRoll(roll);
        const sumElement = document.querySelector("#total-price");
        sumElement.innerText = "$ " + cartPrice(cartSet)
    });

    const cartListElement = document.querySelector("#shopping-cart");
    cartListElement.prepend(roll.element);

    updateElement(roll);
}

// find the final price
function cartPrice(cartSet) {
    let sum = 0;
    for (const roll of cartSet) {
        const num = parseFloat(roll.basePrice);
        sum += num; 
    }
    return sum.toFixed(2);
}

// delete roll from the set and the screen
function deleteRoll(roll) {
    roll.element.remove();
    cartSet.delete(roll);
    saveToLocalStorage();
    console.log(localStorage.getItem('storedRolls'));
}

// learned about template literals to use variables inside strings
// https://www.shecodes.io/athena/8931-creating-a-string-with-variables-in-javascript#:~:text=To%20add%20a%20variable%20to%20a%20string%2C%20you%20can,string%20concatenation%20or%20string%20interpolation.&text=let%20name%20%3D%20%22John%22%3B,Output%3A%20%22Hello%20John!%22&text=let%20name%20%3D%20%22John%22%3B%20let%20greeting%20%3D%20%60Hello,%24%7Bname%7D!%60%3B%20console.
// updates the checkout items 
function updateElement(roll) {
    const rollImageElement = roll.element.querySelector(".checkout-img");
    const rollDescElement = roll.element.querySelector(".item-description");
    const rollPriceElement = roll.element.querySelector(".item-price");

    rollImageElement.src = "../assets/products/" + rolls[roll.type].imageFile;
    rollDescElement.innerText = 
    `${roll.type} Cinnamon Roll
    ${roll.glazing} 
    Pack Size: ${roll.size}`;
    rollPriceElement.innerText = "$ " + roll.basePrice; //calculated with function

    //final price sum
    const sumElement = document.querySelector("#total-price");
    sumElement.innerText = "$ " + cartPrice(cartSet)
}


function saveToLocalStorage() {
    const cartArray = Array.from(cartSet);

    const cartArrayString = JSON.stringify(cartArray);
    localStorage.setItem('storedRolls', cartArrayString);
}
