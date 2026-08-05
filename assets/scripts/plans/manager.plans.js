
import sessionStorageManager from "../storage/manager.storage.session.js";

class Manager {
    #plansDataPath = "../../assets/data/plans/plans.json";
    #plans = null; // keep this immutable, and each inner element immutable as well

    async loadPlans() {
        const response = await fetch(this.#plansDataPath);

        if (!response.ok) {
            throw new Error(`Failed to load plans: ${response.status}`);
        }

        const data = await response.json();

        this.#plans = new Map(
            data.plans.map(plan => [plan.id, Object.freeze(plan)])
        );
    }

    getPlans() {
        return structuredClone([...this.#plans.values()]);
    }
    getPlanById(id) {
        try {
            const plan = this.#plans.get(id);
            return plan ? structuredClone(plan) : null;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }

    selectPlan(id) {
        sessionStorageManager.setPlan(this.getPlanById(id));
    }
};

export default new Manager();