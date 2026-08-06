
import wireBreadcrumbs from "./breadcrumbs/wirer.breadcrumbs.js";

import {generateAndAttachPlanCards, wireGetStartedButton} from "./plans/wirer.plancards.js";
import managerPlans from "./plans/manager.plans.js";
import {pages} from "./breadcrumbs/manager.breadcrumbs.js";

import { generateAndAttachDeliverDayOptions, calculateAvailableDays } from "./day/wirer.day.js";

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

const initializeDeliveryDayOptions = function() {
    calculateAvailableDays();
    generateAndAttachDeliverDayOptions();
}

const initializeDayPage = function() {
    initializeDeliveryDayOptions();
}

async function initialize() {
    initializeBreadcrumbs();

    await initializePlansPage();

    initializeDayPage();
}

document.addEventListener("DOMContentLoaded", () => {
    initialize().catch(console.error);
});