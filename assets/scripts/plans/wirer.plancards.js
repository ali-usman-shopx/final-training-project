
import PlanCardGenerator from "./generator.plancards.js";

const generateAndAttachPlanCards = function() {
    let element = document.getElementById("plan-cards-container");
    element.append(...PlanCardGenerator.generateAllCards());
}

export default generateAndAttachPlanCards;

// const generateAndAttachPlanCards = function() {
//     let element = document.getElementById("plan-cards-container");
    
//     PlanCardGenerator.generateAllCards().then(
//         (plans) => {
//             plans.forEach(plan => {
//                 element.appendChild(
//                     plan
//                 )
//             });
//         }
//     );
// }

