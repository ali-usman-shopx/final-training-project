
import DayElementGenerator from "./generator.day.element.js";
import managerDay from "./manager.day.js";
import { navigateToNextPage } from "../breadcrumbs/manager.breadcrumbs.js";

const generateAndAttachDeliverDayOptions = function() {
    const element = document.getElementById("day_selector");

    element.append(...DayElementGenerator.generateAll());
}

const calculateAvailableDays = function() {
    managerDay.loadDays();
}

const wireDeliveryDaySelectButton = function() {
    const element = document.getElementById("select_day_button");
    element.addEventListener("click", () => {
        navigateToNextPage();
    });
}

export {generateAndAttachDeliverDayOptions, calculateAvailableDays, wireDeliveryDaySelectButton};
