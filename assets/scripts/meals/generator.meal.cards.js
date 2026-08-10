
import managerMeals from "./manager.meals.js";

class MealCardGenerator {
    static generateCards() {
        return (
            managerMeals
            .getAllMeals()
            .map(meal => this.#generateCard(meal))
        );
    }

    static #generateCard(meal) {
        const card = document.createElement("div");
        card.classList.add("meal_card");
        card.dataset.id = meal.id;

        if (meal.is_premium_meal) {
            card.classList.add("premium");
            card.append(this.#generatePremiumItemTag(meal));
        }

        card.append(
            this.#generateImage(meal),
            this.#generateBody(meal)
        );

        return card;
    }

    static #generatePremiumItemTag(meal) {
        const tag = document.createElement("span");
        tag.classList.add("premium_tag");
        tag.textContent = (meal.premium_tag > 0) ? "+ $" + meal.premium_tag : "- $" + Math.abs(meal.premium_tag);
        return tag;
    }

    static #generateImage(meal) {
        const img = document.createElement("img");
        img.classList.add("top_img");
        img.src = meal.img;
        img.alt = meal.name;

        return img;
    }

    static #generateBody(meal) {
        const body = document.createElement("div");
        body.classList.add("body");

        body.append(
            this.#generateTitle(meal),
            this.#generateIngredients(meal),
            this.#generateInformationPanel(meal)
        );

        return body;
    }

    static #generateTitle(meal) {
        const title = document.createElement("span");
        title.classList.add("title");
        title.textContent = meal.name;

        return title;
    }

    static #generateIngredients(meal) {
        const ingredients = document.createElement("span");
        ingredients.classList.add("special_ingredients");
        ingredients.textContent = "with " + meal.special_ingredients;

        return ingredients;
    }

    static #generateInformationPanel(meal) {
        const panel = document.createElement("div");
        panel.classList.add("information_panel");

        const cells = document.createElement("div");
        cells.classList.add("cells_wrapper");

        cells.append(
            this.#generateCell(meal.tag),
            this.#generateCell(`${meal.calories} Cal`),
            this.#generateCell(`${meal.carbs}g Carbs`),
            this.#generateCell(`${meal.protiens}g Protein`)
        );

        panel.append(
            cells,
            this.#generateAddButton(meal.id)
        );

        return panel;
    }

    static #generateCell(text) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = text;

        return cell;
    }

    static #generateAddButton(id) {
        const button = document.createElement("button");
        button.classList.add("add_button");
        button.type = "button";
        button.textContent = "+ Add";

        button.addEventListener("click", () => {
            managerMeals.addMealToCart(id)
        });

        return button;
    }
}

export default MealCardGenerator;