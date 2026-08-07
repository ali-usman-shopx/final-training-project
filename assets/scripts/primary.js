
import wireBreadcrumbs from "./breadcrumbs/wirer.breadcrumbs.js";

import { generateAndAttachAccordionQA } from "./qa/wirer.qa.js";
import managerQA from "./qa/manager.qa.js";

import {generateAndAttachPlanCards, wireGetStartedButton} from "./plans/wirer.plancards.js";
import managerPlans from "./plans/manager.plans.js";
import {pages} from "./breadcrumbs/manager.breadcrumbs.js";

import { generateAndAttachDeliverDayOptions, calculateAvailableDays, wireDeliveryDaySelectButton } from "./day/wirer.day.js";

const initializeBreadcrumbs = function() {
    wireBreadcrumbs();
}

const initializeAccordionQA = async function() {
    await managerQA.loadData();
    generateAndAttachAccordionQA();
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

const initializeDayPage = async function() {
    if (pages.DAY !== window.location.href.split("/").pop()) return;

    initializeDeliveryDayOptions();
    wireDeliveryDaySelectButton();

    await initializeAccordionQA();
}

async function initialize() {
    initializeBreadcrumbs();

    await initializePlansPage();

    await initializeDayPage();
}

document.addEventListener("DOMContentLoaded", () => {
    initialize().catch(console.error);
});