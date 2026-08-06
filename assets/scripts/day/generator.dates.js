
class DatesGenerator {
    static generate(numberOfDays = 14) {
        const firstMonday = this.getFirstUpcomingMonday();

        return Array.from({ length: numberOfDays }, (_, index) => {
            const date = new Date(firstMonday);
            date.setDate(firstMonday.getDate() + index);

            return {
                date,
                dayOfWeek: date.toLocaleDateString("en-US", {
                    weekday: "long"
                }),
                monthDay: date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit"
                }),
                mostPopular: index === 0
            };
        });
    }

    static getFirstUpcomingMonday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let daysUntilMonday = (8 - today.getDay()) % 7;

        if (daysUntilMonday === 0) {
            daysUntilMonday = 7;
        }

        const monday = new Date(today);
        monday.setDate(today.getDate() + daysUntilMonday);

        return monday;
    }

    static getWeekKey() {
        const monday = this.getFirstUpcomingMonday();

        return `${monday.getFullYear()}-${monday.getMonth() + 1}-${monday.getDate()}`;
    }
}

export default DatesGenerator;
