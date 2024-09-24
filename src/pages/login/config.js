export const rules = {
    login_required: value => !!value || 'Вы не указали логин...',
    login_counter: value => value.length >= 3 || 'Длина не менее 3 символов',
    login_match: value => {
        const pattern = /^[0-9a-zA-Z]+$/
        return pattern.test(value) || 'Длина не менее 3 символов, цифры и буквы латинского алфавита...'
    },
    pass_required: value => !!value || 'Вы не указали пароль...',
    pass_counter: value => value.length >= 5 || 'Длина не менее 5 символов',
    pass_match: value => {
        const pattern = /^[0-9a-zA-Z{},.<>;:$*!?^]+$/
        return pattern.test(value) || 'Длина не менее 5 символов, цифры, символы и буквы латинского алфавита...'
    }
}