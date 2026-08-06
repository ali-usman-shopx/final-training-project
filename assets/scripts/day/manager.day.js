
import managerStorageSession from "../storage/manager.storage.session.js";
import DatesGenerator from "./generator.dates.js";

class Manager {
    #days = [];

    loadDays() {
        this.#days = DatesGenerator.generate();
    }

    selectDay(index) {
        if (index >= this.#days.length || index < 0) return
        console.log(index, this.#days);
        managerStorageSession.setDeliveryDay(this.#days[index]);
    }

    getAvailableDays() {
        return structuredClone(this.#days);
    }
}

export default new Manager();
