
import wireBreadcrumbs from "./breadcrumbs/wirer.breadcrumbs.js";

const initializeBreadcrumbs = function() {
    document.addEventListener("DOMContentLoaded", wireBreadcrumbs);
}

const initialize = function() {
    initializeBreadcrumbs();
}

initialize();