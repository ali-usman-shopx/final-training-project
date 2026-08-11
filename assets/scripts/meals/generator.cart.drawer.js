
class CartDrawerGenerator {

    static generateToggleIcon() {
        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

        svg.setAttribute("viewBox", "0 0 18 10");
        svg.setAttribute("fill", "none");

        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

        path.setAttribute("d", "M1 1L9 9L17 1");

        svg.append(path);

        return svg;
    }

    static attachToggleIcon() {
        const toggle = document.getElementById("cart_drawer_toggle");

        toggle.replaceChildren(
            this.generateToggleIcon()
        );
    }
}

export default CartDrawerGenerator;
