
import sessionManager from "../storage/manager.storage.session.js";

const pages = {
    PLANS: "index.html",
    DAY: "day.html",
    MEALS: "meals.html",
    CHECKOUT: "checkout.html"
};

const nextPages = {
    [pages.PLANS]: pages.DAY,
    [pages.DAY]: pages.MEALS,
    [pages.MEALS]: pages.CHECKOUT,
    [pages.CHECKOUT]: pages.PLANS
};

const pageValidators = {
    [pages.PLANS]: () => true,

    [pages.DAY]: function() {
        const val = sessionManager.getPlan();
        return (val != null && val != undefined);
    },

    [pages.MEALS]: function() {
        const val = sessionManager.getDeliveryDay();
        const isThisValid = val != null && val != undefined;
        return (this[pages.DAY]() && isThisValid) == true;
    },

    [pages.CHECKOUT]: function() {
        const val = sessionManager.getMeals();
        const isThisValid = val != null && val != undefined;
        return (this[pages.MEALS]() && isThisValid) == true;
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

const navigateToNextPage = function() {
    let location = window.location.href.split("/");
    const current = location.pop();
    const nextPage = nextPages[current];

    if (validatePage(nextPage) != true) return;
    
    location.push(nextPage);
    window.location.href = location.join("/");
}

const pseudoGateway = function() {
    let location = window.location.href.split("/");
    const current = location.pop();
    if (validatePage(current)) return; // allow access
    
    let lastValidPage = pages.PLANS;
    for (const page of Object.values(pages)) {
        if (validatePage(page)) lastValidPage = page;
    }

    location.push(lastValidPage);
    window.location.href = location.join("/");
}

export {configureBreadcrumbs, navigateToNextPage, pseudoGateway, pages};
