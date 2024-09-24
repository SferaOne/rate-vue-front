export const methods = {
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
}