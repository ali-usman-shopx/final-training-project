import QAGenerator from "./generator.qa.js";

const generateAndAttachAccordionQA = function() {
    const element = document.getElementById("qa_accordion_wrapper");
    QAGenerator.generateAccordion(element);
}

export {generateAndAttachAccordionQA};