
import SelectedMealCardsGenerator from "./generator.selected.meal.cards.js";
import managerCheckout from "./manager.checkout.js";

const generateAndAttachSelectedMealCards = function() {
    const element = document.getElementById("selected_meals_container");
    element.append(
        ...SelectedMealCardsGenerator.generateCards()
    );
}

const attachOrderSummary = function() {
    const dateElement = document.getElementById("delivery_date_input");
    const subTotalElement = document.getElementById("meals_sub_total");
    const totalElement = document.getElementById("total_amount");
    const taxElement = document.getElementById("tax_amount");
    const shippingElement = document.getElementById("shipping_amount");
    
    const date = managerCheckout.getDeliveryDay();
    const cart = managerCheckout.getCart();
    const plan = managerCheckout.getPlan();

    dateElement.value = date.dayOfWeek + " " + date.monthDay.split(" ").join(", ");

    let total = plan.planPrice;

    cart.forEach((meal) => {
        if (meal.is_premium_meal) {
            total += meal.premium_tag;
        }
    });
    
    let tax = (total * 0.139).toFixed(2), shipping = 10.99;
    
    subTotalElement.textContent = `$${total.toFixed(2)}`;
    totalElement.textContent = `$${(total + parseFloat(tax) + shipping).toFixed(2)}`;
    taxElement.textContent = `$${tax}`;
    shippingElement.textContent = `$${shipping}`;
}

export { generateAndAttachSelectedMealCards, attachOrderSummary };
