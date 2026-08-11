
import managerStorageSession from "../storage/manager.storage.session.js";

class Manager {
    #cart = [];
    #delivery_date = {};
    #plan = {};

    #promoCodes = []; // ignore this for now

    constructor() {
        this.#cart = Object.freeze(managerStorageSession.getMeals());
        this.#delivery_date = Object.freeze(managerStorageSession.getDeliveryDay());
        this.#plan = Object.freeze(managerStorageSession.getPlan());
    }

    getCart() {
        return structuredClone(this.#cart);
    }

    getDeliveryDay() {
        return structuredClone(this.#delivery_date);
    }

    getPlan() {
        return structuredClone(this.#plan);
    }
}

export default new Manager();
