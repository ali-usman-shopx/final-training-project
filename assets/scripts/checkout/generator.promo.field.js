
class PromoFieldGenerator {
    static generate() {
        const element = document.createElement("input");
        element.classList.add("input_field");
        element.classList.add("promo_field");
        return element;
    }
}

export default PromoFieldGenerator;
