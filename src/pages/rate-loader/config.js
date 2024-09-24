export const formElements = {
    fileElement: {
        name: "edLoadFile",
        caption: "Выберите файл для загрузки",
        multiple: false
    },
    choiceElement: {
        name: "rbOperationChoice",
        inline: true,
        items: [
            {
                caption: "Загрузка ставок",
                value: 142
            },
            {
                caption: "Загрузка расписания",
                value: 145
            },
            {
                caption: "загрузка доп расходов",
                value: 146
            }
        ]
    },
}
