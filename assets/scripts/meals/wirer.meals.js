
import MealCardGenerator from "./generator.meal.cards.js"
import CartCardGenerator from "./generator.cart.card.js";
import CartSummaryGenerator from "./generator.cart.summary.js";
import managerMeals from "./manager.meals.js";
import { navigateToNextPage } from "../breadcrumbs/manager.breadcrumbs.js";
import CartDrawerGenerator from "./generator.cart.drawer.js";
import CartDrawerScrollController from "./controller.cart.drawer.scroll.js";

const generateAndAttachMealCards = function() {
    const element = document.getElementById("meals_section_container");
    element.append(
        ...MealCardGenerator.generateCards()
    );
}

const generateAndAttachCardCards = function() {
    const element = document.getElementById("cart_cards_container");
    element.replaceChildren();
    element.append(
        ...CartCardGenerator.generateCards()
    );
}

const generateAndAttachCartCards = function() {
    console.groupCollapsed("Generate Cart Cards");
    // console.log("Method not yet implemented!");
    console.log("Cart:", managerMeals.getCart());
    generateAndAttachCardCards();
    console.groupEnd();
}

const wireCartSummaryGeneration = function() {
    document.addEventListener(managerMeals.getCartUpdateEventName(), CartSummaryGenerator.generate);
}

const invokeCartSummaryGeneration = function() {
    CartSummaryGenerator.generate();
}

const wireCartCardGenerationToCartUpdateEvent = function() {
    document.addEventListener(managerMeals.getCartUpdateEventName(), generateAndAttachCartCards);
}

const wireClearCart = function() {
    const element = document.getElementById("clear_all");
    element.addEventListener("click", managerMeals.clearCart.bind(managerMeals));
}

const loadDeliveryDate = function() {
    const element = document.querySelector(".delivery_info #date");
    CartSummaryGenerator.loadDeliveryDateIntoElement(element);
}

const wireNextButton = function() {
    const element = document.getElementById("next_button");
    element.addEventListener("click", () => {
        managerMeals.finalizeCart();
        navigateToNextPage();
    });
}

const wireCartDrawer = function() {

    const cartSection = document.getElementById(
        "cart_section_container"
    );

    const toggle = document.getElementById(
        "cart_drawer_toggle"
    );

    const cartPill = document.getElementById(
        "cart_pill"
    );

    CartDrawerGenerator.attachToggleIcon();
    CartDrawerScrollController.initialize();

    cartPill.addEventListener("click", () => {
        cartSection.classList.add("drawer_open");
    });

    toggle.addEventListener("click", () => {
        cartSection.classList.remove("drawer_open");
    });
};

export {generateAndAttachMealCards, wireCartCardGenerationToCartUpdateEvent, wireClearCart, wireCartSummaryGeneration, invokeCartSummaryGeneration, loadDeliveryDate, wireNextButton, wireCartDrawer}
