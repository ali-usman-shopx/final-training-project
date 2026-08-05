
import sessionManager from "../storage/manager.storage.session.js";

const pages = {
    DAY: "day.html",
    MEALS: "meals.html",
    CHECKOUT: "checkout.html"
};

const pageValidators = {
    [pages.DAY]: function() {
        return sessionManager.getPlan() == true;
    },

    [pages.MEALS]: function() {
        return (this[pages.DAY]() && sessionManager.getDeliveryDay()) == true;
    },

    [pages.CHECKOUT]: function() {
        return (this[pages.MEALS]() && sessionManager.getMeals()) == true;
    }
};

const validatePage = function(path) {
    const current = path.split("/").pop();
    // console.log(current);
    // console.log(pageValidators["day.html"]);
    return pageValidators[current]();
}

const configureBreadcrumbs = function(breadcrumbs) {
    const links = breadcrumbs.querySelectorAll("a");

    links.forEach(link => {
        const enabled = validatePage(link.getAttribute("href"));

        if (enabled) {
            link.classList.remove("disabled");
            link.removeAttribute("aria-disabled");
        } else {
            link.classList.add("disabled");
            link.setAttribute("aria-disabled", "true");

            link.addEventListener("click", function(event) {
                event.preventDefault();
            });
        }
    });
};

export {configureBreadcrumbs};
