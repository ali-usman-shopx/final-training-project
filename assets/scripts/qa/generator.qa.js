import manager from "./manager.qa.js";

class QAGenerator {

    static generateAccordion(container) {

        const accordion = document.createElement("div");
        accordion.classList.add("accordion");

        const questionAnswers = manager.getAllQuestionAnswers();

        questionAnswers.forEach((qa, index) => {
            accordion.appendChild(
                this.#generateElement(qa, index)
            );
        });

        container.appendChild(accordion);
    }

    static #generateArrowIcon() {

        const svgNS = "http://www.w3.org/2000/svg";

        const svg = document.createElementNS(svgNS, "svg");
        svg.classList.add("accordion_arrow");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("aria-hidden", "true");

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M6 9l6 6 6-6");

        svg.appendChild(path);

        return svg;
    }

    static #generateBody(answer) {

        const body = document.createElement("div");
        body.classList.add("accordion_body");

        (answer.split("\n")
            .filter(line => line.trim().length > 0)
            .forEach(line => {
                const paragraph = document.createElement("p");
                paragraph.textContent = line.trim();
                body.appendChild(paragraph);
            }));

        return body;
    }

    static #generateElement(qa, index) {

        const element = document.createElement("div");
        element.classList.add("accordion_element");

        const head = document.createElement("button");
        head.classList.add("accordion_head");
        head.type = "button";

        const question = document.createElement("span");
        question.classList.add("question");
        question.textContent = qa.question;

        const arrow = this.#generateArrowIcon();

        head.append(question, arrow);

        const body = this.#generateBody(qa.answer);

        head.addEventListener("click", () => {
            element.classList.toggle("open");
        });

        element.append(head, body);

        return element;
    }
}

export default QAGenerator;