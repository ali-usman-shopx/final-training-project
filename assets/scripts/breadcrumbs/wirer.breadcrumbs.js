
import { configureBreadcrumbs } from "./manager.breadcrumbs.js";
import managerStorageSession from "../storage/manager.storage.session.js";

const wireBreadcrumbs = function() {
    const breadcrumbs = document.querySelector(".breadcrumb");

    if (!breadcrumbs) {
        return;
    }

    // Configure immediately on page load
    configureBreadcrumbs(breadcrumbs);

    // Reconfigure whenever session storage changes
    document.addEventListener(managerStorageSession.storageUpdateEventName, function() {
        configureBreadcrumbs(breadcrumbs);
    });
};

export default wireBreadcrumbs;