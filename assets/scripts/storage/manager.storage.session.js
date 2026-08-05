
class Manager {
    #planSessionKey = "plan";
    #daySessionKey =  "day";
    #mealsSessionKey = "meals";

    storageUpdateEventName = "session-storage-updated";
    
    setPlan(plan) {
        sessionStorage.setItem(this.#planSessionKey, JSON.stringify(plan));
        this.notifyUpdate();
    }
    getPlan() {
        return JSON.parse(sessionStorage.getItem(this.#planSessionKey));
    }

    setDeliveryDay(day) {
        sessionStorage.setItem(this.#daySessionKey, JSON.stringify(day));
        this.notifyUpdate();
    }
    getDeliveryDay() {
        return JSON.parse(sessionStorage.getItem(this.#daySessionKey));
    }

    setMeals(meals) {
        sessionStorage.setItem(this.#mealsSessionKey, JSON.stringify(meals));
        this.notifyUpdate();
    }
    getMeals() {
        return JSON.parse(sessionStorage.getItem(this.#mealsSessionKey));
    }

    notifyUpdate() {
        document.dispatchEvent(
            new Event(this.storageUpdateEventName)
        );
    }
};

export default new Manager();
