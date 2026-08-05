
import wireBreadcrumbs from "./breadcrumbs/wirer.breadcrumbs.js";
import generateAndAttachPlanCards from "./plans/wirer.plancards.js";
import managerPlans from "./plans/manager.plans.js";

const initializeBreadcrumbs = function() {
    wireBreadcrumbs();
}

const initializePlanCards = function() {
    generateAndAttachPlanCards();
}

async function initialize() {
    await managerPlans.loadPlans();

    initializeBreadcrumbs();
    initializePlanCards();
}

document.addEventListener("DOMContentLoaded", () => {
    initialize().catch(console.error);
});