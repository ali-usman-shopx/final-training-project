
class Manager {

    #questionAnswers = [];

    async loadData() {

        if (this.#questionAnswers.length > 0) {
            return;
        }

        const response = await fetch("../assets/data/qa/qa.json");

        if (!response.ok) {
            throw new Error("Unable to load QA data.");
        }

        const json = await response.json();

        this.#questionAnswers = Object.freeze(
            json.data.map(item =>
                Object.freeze({
                    question: item.question,
                    answer: item.answer
                })
            )
        );
        // console.log("Got:", this.#questionAnswers);
    }

    getQuestionAnswer(index) {

        if (index < 0 || index >= this.#questionAnswers.length) return null;

        const qa = this.#questionAnswers[index];

        if (!qa) {
            return null;
        }

        return structuredClone(qa);
    }

    getAllQuestionAnswers() {

        return structuredClone(this.#questionAnswers);
    }
}

export default new Manager();