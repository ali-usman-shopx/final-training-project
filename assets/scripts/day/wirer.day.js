
import DayElementGenerator from "./generator.day.element.js";
import managerDay from "./manager.day.js";

const generateAndAttachDeliverDayOptions = function() {
    const element = document.getElementById("day_selector");

    element.append(...DayElementGenerator.generateAll());
}

const calculateAvailableDays = function() {
    managerDay.loadDays();
}

export {generateAndAttachDeliverDayOptions, calculateAvailableDays};
