
import wireBreadcrumbs from "./breadcrumbs/wirer.breadcrumbs.js";

import { generateAndAttachAccordionQA } from "./qa/wirer.qa.js";
import managerQA from "./qa/manager.qa.js";

import {generateAndAttachPlanCards, wireGetStartedButton} from "./plans/wirer.plancards.js";
import managerPlans from "./plans/manager.plans.js";
import {pages} from "./breadcrumbs/manager.breadcrumbs.js";

import { generateAndAttachDeliverDayOptions, calculateAvailableDays, wireDeliveryDaySelectButton } from "./day/wirer.day.js";

import {
    generateAndAttachMealCards,
    wireCartCardGenerationToCartUpdateEvent,
    wireClearCart,
    wireCartSummaryGeneration,
    invokeCartSummaryGeneration,
    loadDeliveryDate,
    wireNextButton,
    wireCartDrawer
} from "./meals/wirer.meals.js";
import managerMeals from "./meals/manager.meals.js";

import {
    generateAndAttachSelectedMealCards,
    attachOrderSummary,
    validateOnFormSubmit,
    wirePromoFieldGeneration
} from "./checkout/wirer.checkout.js"

const getVersion = function() {
    return "0.4.14";
}

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
    wireClearCart();
    wireCartSummaryGeneration();
    invokeCartSummaryGeneration();
    loadDeliveryDate();
    wireCartDrawer();
    managerMeals.loadCartFromSession();
}

const initializeMealsPage = async function() {
    if (pages.MEALS !== window.location.href.split("/").pop()) return;

    await initializeMealCards();
    initializeCartCards();
    wireNextButton();
}

const initializeCheckoutPage = async function() {
    if (pages.CHECKOUT !== window.location.href.split("/").pop()) return;

    initializeAccordionQA();
    generateAndAttachSelectedMealCards();
    attachOrderSummary();
    validateOnFormSubmit();
    wirePromoFieldGeneration();
}
 
async function initialize() {
    console.log("v"+getVersion());
    initializeBreadcrumbs();

    await initializePlansPage();

    await initializeDayPage();

    await initializeMealsPage();

    await initializeCheckoutPage();
}

document.addEventListener("DOMContentLoaded", () => {
    initialize().catch(console.error);
});