class CartDrawerScrollController {
    #mealsSection;
    #cartSection;

    #lastScrollTop = 0;

    constructor() {
        this.#mealsSection = document.getElementById("meals_section_container");
        this.#cartSection = document.getElementById("cart_section_container");
    }

    initialize() {
        this.#mealsSection.addEventListener(
            "scroll",
            () => this.#handleScroll()
        );
    }

    #handleScroll() {
        const currentScrollTop = this.#mealsSection.scrollTop;

        if (currentScrollTop < this.#lastScrollTop) {
            this.#hideCart();
        }
        else if (currentScrollTop > this.#lastScrollTop) {
            this.#showCart();
        }

        this.#lastScrollTop = currentScrollTop;
    }

    #hideCart() {
        this.#cartSection.classList.add("cart_scroll_hidden");
    }

    #showCart() {
        this.#cartSection.classList.remove("cart_scroll_hidden");
    }
}

export default new CartDrawerScrollController();