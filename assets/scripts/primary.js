
import wireBreadcrumbs from "./breadcrumbs/wirer.breadcrumbs.js";
import {generateAndAttachPlanCards, wireGetStartedButton} from "./plans/wirer.plancards.js";
import managerPlans from "./plans/manager.plans.js";
import {pages} from "./breadcrumbs/manager.breadcrumbs.js"

const initializeBreadcrumbs = function() {
    wireBreadcrumbs();
}

const initializePlanCards = async function() {
    await managerPlans.loadPlans();
    generateAndAttachPlanCards();
}

const initializePlansPage = async function() {
    if (pages.PLANS !== window.location.href.split("/").pop()) return;

    await initializePlanCards();
    wireGetStartedButton();
}

async function initialize() {
    initializeBreadcrumbs();

    await initializePlansPage();
}

document.addEventListener("DOMContentLoaded", () => {
    initialize().catch(console.error);
});