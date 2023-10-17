
// glazing

class GlazingOptions {
    glazing;
    priceAdaptation;
    constructor(glazing, priceAdaptation) {
        this.glazing = glazing;
        this.priceAdaptation = priceAdaptation;
    }
}

const original = new GlazingOptions("Keep Original", "0")
const sugarMilk = new GlazingOptions("Sugar Milk", "0");
const vanillaMilk = new GlazingOptions("Vanilla Milk", ".50");
const doubleChocolate = new GlazingOptions("Double Chocolate", "1.50"); 

const allGlazingOptions = [original, sugarMilk, vanillaMilk, doubleChocolate]

// sizing

class SizeOptions {
    size;
    priceAdaptation;

    constructor(size, priceAdaptation) {
        this.size = size;
        this.priceAdaptation = priceAdaptation;
    }
}

const packSizeOne = new SizeOptions("1", "1")
const packSizeThree = new SizeOptions("3", "3");
const packSizeSix = new SizeOptions("6", "5");
const packSizeTwelve = new SizeOptions("12", "10"); 

const allSizeOptions = [packSizeOne, packSizeThree, packSizeSix, packSizeTwelve]

// sizing


