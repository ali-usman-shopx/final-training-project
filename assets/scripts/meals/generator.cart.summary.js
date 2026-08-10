
import managerMeals from "./manager.meals.js";
import sessionManager from "../storage/manager.storage.session.js";

class CartSummaryGenerator {
    static generate() {
        const wrapper = document.getElementById("order_summary");
        const cart = managerMeals.getCart();

        const drawerSubTotal = document.querySelector(".footer #cart_row #subtotal");
        const drawerCartPill = document.querySelector(".footer #cart_row #cart_pill #cart_count");
        const instruction = document.querySelector(".footer #instruction_text #instruction");
        const over_under_amount = document.querySelector(".footer #instruction_text #over_under_amount");
        const trailing_instruction_text = document.querySelector(".footer #instruction_text #remaining_text");
        const next_button = document.getElementById("next_button");
        
        const plan = sessionManager.getPlan();

        next_button.disabled = (plan.mealsCount !== cart.length);
        
        if (cart.length === 0) {
            wrapper.classList.add("inactive");
            drawerSubTotal.textContent = "0";
            drawerCartPill.textContent = "0";
            instruction.textContent = "Please add";
            over_under_amount.textContent = plan.mealsCount + " more";
            trailing_instruction_text.textContent = "meals.";
            return;
        }
        wrapper.classList.remove("inactive");

        const countElement = document.querySelector("#order_summary #count");
        const amountElement = document.querySelector("#order_summary #amount");
        const subtotalElement = document.querySelector("#order_summary #subtotal");


        const mealCount = cart.length;

        const premiumTotal = cart
            .filter(meal => meal.is_premium_meal)
            .reduce(
                (total, meal) => total + meal.premium_tag,
                0
            );

        const subtotal = plan.planPrice + premiumTotal;

        countElement.textContent = `${mealCount} Meals`;
        amountElement.textContent = `$${plan.planPrice.toFixed(2)}${(premiumTotal > 0)?" + " + premiumTotal.toFixed(2): ""}`;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

        drawerSubTotal.textContent = subtotalElement.textContent;
        drawerCartPill.textContent = "" + mealCount;
        
        let instructionText = "", over_under_amount_text = "Read to go!", remaining_text = "";

        if (mealCount > plan.mealsCount) {
            instructionText = "Please remove";
            over_under_amount_text = (mealCount - plan.mealsCount) + ((mealCount - plan.mealsCount > 1) ? " meals": " meal");
            remaining_text = "to continue.";
        }
        else if (mealCount < plan.mealsCount) {
            instructionText = "Please add";
            over_under_amount_text = (plan.mealsCount - mealCount) + " more";
            remaining_text = (plan.mealsCount - mealCount > 1) ? "meals.": "meal.";
        }

        instruction.textContent = instructionText;
        over_under_amount.textContent = over_under_amount_text;
        trailing_instruction_text.textContent = remaining_text;
    }

    static loadDeliveryDateIntoElement(element) {
        const date = sessionManager.getDeliveryDay();
        element.textContent = `${date.dayOfWeek}, ${date.monthDay}`;
    }
}

export default CartSummaryGenerator;
