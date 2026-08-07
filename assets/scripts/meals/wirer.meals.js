
import MealCardGenerator from "./generator.meal.cards.js"
import managerMeals from "./manager.meals.js";

const generateAndAttachMealCards = function() {
    const element = document.getElementById("meals_section_container");
    element.append(
        ...MealCardGenerator.generateCards()
    );
}

const generateAndAttachCartCards = function() {
    console.groupCollapsed("Generate Cart Cards");
    console.log("Method not yet implemented!");
    console.log("Cart:", managerMeals.getCart());
    console.groupEnd();
}

const wireCartCardGenerationToCartUpdateEvent = function() {
    document.addEventListener(managerMeals.getCartUpdateEventName(), generateAndAttachCartCards);
}

export {generateAndAttachMealCards, wireCartCardGenerationToCartUpdateEvent}