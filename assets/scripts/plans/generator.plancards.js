
import managerPlans from "./manager.plans.js";

class PlanCardGenerator {

    static generate(plan) {
        const card = document.createElement("div");
        card.classList.add("plan-card");

        if (plan.isSpecial) {
            const pill = document.createElement("div");
            pill.classList.add("special-text-pill");
            pill.textContent = plan.specialText;

            card.appendChild(pill);
        }

        const image = document.createElement("img");
        image.classList.add("top-img");
        image.src = `./assets/images/plans/${plan.img}`;
        image.alt = `${plan.mealsCount} Meals`;

        card.appendChild(image);

        const title = document.createElement("span");
        title.classList.add("card-title");

        title.innerHTML = (`${plan.mealsCount} Meals<span class="subtext"> (per week)</span>`);

        const body = document.createElement("div");
        const child1 = document.createElement("span");
        child1.innerHTML = (
            `Plan Price: <span class="accent-text">$${plan.planPrice}</span>`
        );
        body.append(
            child1
        );
        body.append(document.createElement("br"));
        body.append(`$${plan.pricePerMeal.toFixed(2)}/meal`);

        card.appendChild(title);
        card.appendChild(body);

        return card;
    }

    static generateAllCards() {
        const plans = managerPlans.getPlans();
        return plans.map(plan => this.generate(plan));
    }

}

export default PlanCardGenerator;

// static async generateAllCards() {
//         let plans;
//         managerPlans.loadPlans().then(
//             () => {
//                 plans = managerPlans.getPlans();
//                 plans = plans.map(plan => this.generate(plan));
//             }
//         );
//         return plans;
//     }
