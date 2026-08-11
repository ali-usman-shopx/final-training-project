import manager from "./manager.checkout.js";

class SelectedMealCardsGenerator {
    static generateCards() {
        const meals = manager.getCart();

        const mealCounts = meals.reduce((counts, meal) => {
            counts[meal.id] = (counts[meal.id] || 0) + 1;
            return counts;
        }, {});

        const uniqueMeals = meals.filter(
            (meal, index, array) =>
                array.findIndex(item => item.id === meal.id) === index
        );

        return uniqueMeals.map(meal =>
            this.#generateCard(meal, mealCounts[meal.id])
        );
    }

    static #generateCard(meal, count) {
        const card = document.createElement("div");
        card.classList.add("selected_meal_card");
        card.dataset.id = meal.id;

        card.append(
            this.#generateCountSection(count),
            this.#generateCardSection(meal)
        );

        if (meal.is_premium_meal) {
            card.classList.add("premium_item");
        }

        return card;
    }

    static #generateCountSection(count) {
        const section = document.createElement("div");
        section.classList.add("count_section");

        const countElement = document.createElement("span");
        countElement.classList.add("count");
        countElement.textContent = count;

        section.append(countElement);

        return section;
    }

    static #generateCardSection(meal) {
        const section = document.createElement("div");
        section.classList.add("item_info");

        section.append(
            this.#generateImage(meal),
            this.#generateTextSection(meal)
        );

        if (meal.is_premium_meal) {
            section.append(
                this.#generatePremiumItemTag(meal)
            );
        }

        return section;
    }

    static #generateImage(meal) {
        const img = document.createElement("img");
        img.classList.add("img");
        img.src = meal.img;
        img.alt = meal.name;

        return img;
    }

    static #generateTextSection(meal) {
        const textSection = document.createElement("div");
        textSection.classList.add("text_wrapper");
        textSection.append(
            this.#generateTitle(meal),
            this.#generateSpecialIngredients(meal)
        );
        return textSection;
    }

    static #generateTitle(meal) {
        const title = document.createElement("span");
        title.classList.add("title");
        title.textContent = meal.name;

        return title;
    }

    static #generateSpecialIngredients(meal) {
        const ingredients = document.createElement("span");
        ingredients.classList.add("special_ingredients");
        ingredients.textContent = "with " + meal.special_ingredients;

        return ingredients;
    }

    static #generatePremiumItemTag(meal) {
        const tag = document.createElement("span");
        tag.classList.add("premium_tag");
        tag.textContent =
            (meal.premium_tag > 0)
                ? "+ $" + meal.premium_tag
                : "- $" + Math.abs(meal.premium_tag);

        return tag;
    }
}

export default SelectedMealCardsGenerator;