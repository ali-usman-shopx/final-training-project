
import manager from "./manager.day.js";
import { navigateToNextPage } from "../breadcrumbs/manager.breadcrumbs.js";

class DayElementGenerator {

    static activeElement = undefined;

    static generate(day, index) {
        const element = document.createElement("button");
        element.classList.add("day_element");

        const dateInfo = document.createElement("div");
        dateInfo.classList.add("date_info");

        const dayOfWeek = document.createElement("span");
        dayOfWeek.classList.add("day-of-week");
        dayOfWeek.textContent = day.dayOfWeek;

        dateInfo.append(dayOfWeek);
        dateInfo.append(`, ${day.monthDay}`);

        element.appendChild(dateInfo);

        if (day.mostPopular) {
            const tag = document.createElement("div");
            tag.classList.add("most_popular_tag");

            tag.innerHTML = `
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.7L12 16.8 5.8 20.1l1.6-6.7L2.2 8.9l6.9-.6L12 2z"/>
                            </svg>
                            <span>Most Popular</span>
                        `;

            element.appendChild(tag);
            element.classList.add("active");
            DayElementGenerator.activeElement = element;
            (() => {
                const i = index;
                manager.selectDay(i);
            })();
        }

        element.addEventListener("click", () => {
            let i = index;
            manager.selectDay(i);
            
            if (DayElementGenerator.activeElement) {
                DayElementGenerator.activeElement.classList.remove("active");
            }

            element.classList.add("active");
            DayElementGenerator.activeElement = element;
        });

        return element;
    }

    static generateAll() {
        const days = manager.getAvailableDays();
        return days.map((day, index) => this.generate(day, index));
    }
}

export default DayElementGenerator;
