
import wireBreadcrumbs from "./breadcrumbs/wirer.breadcrumbs.js";

import { generateAndAttachAccordionQA } from "./qa/wirer.qa.js";
import managerQA from "./qa/manager.qa.js";

import {generateAndAttachPlanCards, wireGetStartedButton} from "./plans/wirer.plancards.js";
import managerPlans from "./plans/manager.plans.js";
import {pages} from "./breadcrumbs/manager.breadcrumbs.js";

import { generateAndAttachDeliverDayOptions, calculateAvailableDays, wireDeliveryDaySelectButton } from "./day/wirer.day.js";

import { generateAndAttachMealCards, wireCartCardGenerationToCartUpdateEvent } from "./meals/wirer.meals.js";
import managerMeals from "./meals/manager.meals.js";

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

const initializeMealCards = async function() {
    await managerMeals.loadMeals();
    generateAndAttachMealCards();
}

const initializeCartCards = function() {
    wireCartCardGenerationToCartUpdateEvent();
}

const initializeMealsPage = async function() {
    if (pages.MEALS !== window.location.href.split("/").pop()) return;

    await initializeMealCards();
    initializeCartCards();
}
 
async function initialize() {
    initializeBreadcrumbs();

    await initializePlansPage();

    await initializeDayPage();

    await initializeMealsPage();
}

document.addEventListener("DOMContentLoaded", () => {
    initialize().catch(console.error);
});