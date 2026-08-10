
import managerMeals from "./manager.meals.js";

class CartCardGenerator {
    static generateCards() {
        return (
            managerMeals
            .getCart()
            .map(meal => this.#generateCard(meal))
        );
    }

    static #generateCard(meal) {
        const card = document.createElement("div");
        card.classList.add("cart_item_card");
        card.dataset.id = meal.id;

        card.append(
            this.#generateContent(meal)
        );

        if (meal.is_premium_meal) {
            card.classList.add("premium_item");
            card.append(
                this.#generatePremiumItemTag(meal)
            );
        }

        return card;
    }

    static #generatePremiumItemTag(meal) {
        const tag = document.createElement("span");
        tag.classList.add("premium_tag");
        tag.textContent = (meal.premium_tag > 0) ? "+ $" + meal.premium_tag : "- $" + Math.abs(meal.premium_tag);
        return tag;
    }

    static #generateContent(meal) {
        const content = document.createElement("div");
        content.classList.add("content");

        content.append(
            this.#generateItemInfo(meal),
            this.#generateActionButtons(meal.id)
        );

        return content;
    }

    static #generateItemInfo(meal) {
        const itemInfo = document.createElement("div");
        itemInfo.classList.add("item_info");

        itemInfo.append(
            this.#generateImage(meal),
            this.#generateTitle(meal)
        );

        return itemInfo;
    }

    static #generateImage(meal) {
        const img = document.createElement("img");
        img.classList.add("img");
        img.src = meal.img;
        img.alt = meal.name;

        return img;
    }

    static #generateTitle(meal) {
        const title = document.createElement("span");
        title.classList.add("title");
        title.textContent = meal.name;

        return title;
    }

    static #generateActionButtons(id) {
        const buttons = document.createElement("div");
        buttons.classList.add("action_buttons");

        buttons.append(
            this.#generateAddAnotherButton(id),
            this.#generateRemoveButton(id)
        );

        return buttons;
    }

    static #generateAddAnotherButton(id) {
        const button = document.createElement("button");
        button.classList.add("action_button");
        button.type = "button";

        button.append(this.#generatePlusIcon());

        button.addEventListener("click", () => {
            managerMeals.addMealToCart(id);
        });

        return button;
    }

    static #generateRemoveButton(id) {
        const button = document.createElement("button");
        button.classList.add("action_button");
        button.type = "button";

        button.append(this.#generateMinusIcon());

        button.addEventListener("click", () => {
            managerMeals.removeMealFromCart(id);
        });

        return button;
    }

    static #generatePlusIcon() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "14");
        svg.setAttribute("height", "14");
        svg.setAttribute("viewBox", "0 0 14 14");
        svg.setAttribute("fill", "none");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M7 1V13M1 7H13");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("stroke-linecap", "round");

        svg.append(path);

        return svg;
    }

    static #generateMinusIcon() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "14");
        svg.setAttribute("height", "14");
        svg.setAttribute("viewBox", "0 0 14 14");
        svg.setAttribute("fill", "none");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M1 13H13");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("stroke-linecap", "round");

        svg.append(path);

        return svg;
    }
}

export default CartCardGenerator;
