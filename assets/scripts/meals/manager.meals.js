
import managerStorageSession from "../storage/manager.storage.session.js";

class Manager {
    #meals = null;
    #cart = [];
    #mealsNeeded = 0;
    
    #cartUpdateEventName = "cart_updated";

    async loadMeals() {
        const response = await fetch("../assets/data/meals/meals.json");
        const data = await response.json();

        if (!response.ok) throw new Error(`${response.statusText}`);

        const meals = {};

        for (const meal of data.meals) {
            const frozenMeal = Object.freeze({
                ...meal,
                img: `../assets/images/meals/${meal.img}`
            });

            meals[meal.id] = frozenMeal;
        }

        this.#meals = Object.freeze(meals);

        this.#mealsNeeded = managerStorageSession.getPlan().mealsCount;
    }

    loadCartFromSession() {
        try {
            this.#cart = managerStorageSession.getMeals();
            if (this.#cart) this.#notifyUpdate();
            else {this.#cart = [];}
        } catch (error) {
            console.log(error);
        }
    }

    getMealById(id) {
        if (this.#meals == null) return null;

        const meal = this.#meals[id];
        return meal ? structuredClone(meal) : null;
    }
    getMealsByIds(ids) {
        if (this.#meals == null) return [];

        return (ids
            .map(id => this.#meals[id])
            .filter(Boolean)
            .map(meal => structuredClone(meal)));
    }
    getAllMeals() {
        if (this.#meals == null) return [];

        return Object.values(this.#meals).map(meal => structuredClone(meal));
    }

    // This method is the source of truth for cart for all outside entities
    getCart() {
        return structuredClone(this.#cart);
    }

    #findMealIndexInCart(id) {
        for (let i = 0; i < this.#cart.length; i++) {
            if (this.#cart[i].id === id) return i;
        }
        return -1;
    }

    addMealToCart(id) {
        const meal = this.getMealById(id);

        if (!meal) throw new Error(`Meal Does Not Exist! ${id}`);

        this.#cart.push(
            meal
        );

        this.#notifyUpdate();
    }

    removeMealFromCart(id) {
        if (this.#cart.length == 0) return;

        let index = this.#findMealIndexInCart(id);
        if (index < 0) return;

        this.#cart.splice(index, 1);

        this.#notifyUpdate();
    }

    clearCart() {
        this.#cart = [];
        this.#notifyUpdate();
    }

    finalizeCart() {
        if (this.#cart.length !== this.#mealsNeeded) throw new Error(`Plan's Required Number of Meals Not Selected! ${this.#cart.length} vs ${this.#mealsNeeded}`);

        managerStorageSession.setMeals(structuredClone(this.#cart));
    }

    getCartUpdateEventName() {
        return this.#cartUpdateEventName;
    }

    #notifyUpdate() {
        document.dispatchEvent(
            new Event(this.#cartUpdateEventName)
        );
    }
}

export default new Manager();