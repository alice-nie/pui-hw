
// populating the Glaze dropdown
let glazingDropdown = document.querySelector("#glazing-select");

class GlazingOptions {
    constructor(type, price) {
        this.glazing = type;
        this.priceAdaptation = price;
    }
}

const original = new GlazingOptions("Keep Original", "0")
const sugarMilk = new GlazingOptions("Sugar Milk", "0");
const vanillaMilk = new GlazingOptions("Vanilla Milk", ".50");
const doubleChocolate = new GlazingOptions("Double Chocolate", "1.50"); 

const allGlazingOptions = [original, sugarMilk, vanillaMilk, doubleChocolate]

for (let x of allGlazingOptions)
{
    let option = document.createElement("option");
    option.text = x.glazing
    option.value = x.priceAdaptation
    glazingDropdown.add(option)
}


// populating the Size dropdown
let sizeDropdown = document.querySelector("#size-select")

class SizeOptions {
    constructor(size, price) {
        this.size = size;
        this.priceAdaptation = price;
    }
}

const packSizeOne = new SizeOptions("1", "1")
const packSizeThree = new SizeOptions("3", "3");
const packSizeSix = new SizeOptions("6", "6");
const packSizeTwelve = new SizeOptions("12", "10"); 

const allSizeOptions = [packSizeOne, packSizeThree, packSizeSix, packSizeTwelve]


for (let x of allSizeOptions)
{
    let option = document.createElement("option");
    option.text = x.size
    option.value = x.priceAdaptation
    sizeDropdown.add(option)
}

// calculating and displaying price changes

// rounding to two decimals w/ toFixed learned from
// https://www.w3schools.com/jsref/jsref_tofixed.asp

// debugging with parseFloat from
// https://stackoverflow.com/questions/4937251/why-is-my-tofixed-function-not-working
function displayPrice(price) {
    let priceElement = document.querySelector("#price");
    priceElement.innerText = price.toFixed(2);
}

function glazingChange(element) {
    const basePrice = 2.49;
    const priceChange = parseFloat(element.value);
    const packPrice = parseFloat(document.querySelector("#size-select").value)
    updatedPrice = (basePrice + priceChange) * packPrice;
    displayPrice(updatedPrice);
}

function sizeChange(element) {
    const basePrice = 2.49;
    const priceChange = parseFloat(element.value);
    const glazingPrice = parseFloat(document.querySelector("#glazing-select").value)
    updatedPrice = (basePrice + glazingPrice) * priceChange;
    displayPrice(updatedPrice);
}
  



