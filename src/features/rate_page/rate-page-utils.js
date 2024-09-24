export const methods = {
    getNumber(value) {
        return parseFloat(value).toLocaleString("ru-RU");
    },
    getDate(value) {
        if (value != null)
            return (new Date(value)).toLocaleString("ru", {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                timezone: 'UTC'
            });
        else
            return ' '
    },
    getImage(item){
        return item.icon
    },
    CreateChain(item, block) {
        if (block == 0) {
            return (
                item.place_from +
                (item.ext_place_from.length > 0
                    ? "(" + item.ext_place_from + ")"
                    : "")
            );
        } else {
            return (
                item.place_to +
                (item.ext_place_to.length > 0 ? "(" + item.ext_place_to + ")" : "")
            );
        }
    },
    formatItem(item) {
        if (item.days_from != 0) {
            if (item.days_to != 999)
                return 'c ' + item.days_from + ' по ' + item.days_to + ' день, всего дней ' + (item.days_to - item.days_from)
            else
                return 'cвыше ' + item.days_from + ' дней'
        } else
            return ' по ' + item.days_to + ' день, всего дней ' + (item.days_to - item.days_from)
    },
}