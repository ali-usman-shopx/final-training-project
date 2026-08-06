
import PlanCardGenerator from "./generator.plancards.js";
import { navigateToNextPage } from "../breadcrumbs/manager.breadcrumbs.js";

const generateAndAttachPlanCards = function() {
    let element = document.getElementById("plan-cards-container");
    element.append(...PlanCardGenerator.generateAllCards());
}

const wireGetStartedButton = function() {
    let element = document.getElementById("get-started-button");
    element.addEventListener("click", () => {navigateToNextPage()});
}

export {generateAndAttachPlanCards, wireGetStartedButton};
