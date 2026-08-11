
import SelectedMealCardsGenerator from "./generator.selected.meal.cards.js";
import managerCheckout from "./manager.checkout.js";
import validate from "./validator.checkout.form.js";
import PromoFieldGenerator from "./generator.promo.field.js";

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

const validateOnFormSubmit = function() {
    document.getElementById("checkout_form_submit_button").addEventListener(
        "click",
        (event) => {
            event.preventDefault();

            if (!validate()) return;

            console.log("Submitting the form!");
            // document.getElementById("checkout_form").submit();
        }
    );
}

const generateAndAttachPromoFields = function() {
    const element = document.getElementById("promo_link");
    element.append(PromoFieldGenerator.generate());
}

const wirePromoFieldGeneration = function() {
    const element = document.getElementById("true_promo_link");
    element.addEventListener("click", generateAndAttachPromoFields);
}

export { generateAndAttachSelectedMealCards, attachOrderSummary, validateOnFormSubmit, wirePromoFieldGeneration };
