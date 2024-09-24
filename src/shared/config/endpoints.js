export const getterlist = {
    getRateList: {
        uri: "/rate/list/",
    },
    getReferenceData: {
        uri: "/reference/data/",
    },
    getRateByKey: {
        uri: "/rate/key/",
    },
    getShipScheduleByKey: {
        uri: "/ship/schedule/key/",
    },
    getAdditionalExpensesByKey: {
        uri: "/additional/expenses/key/",
    },
};

export const setterlist = {
    auth: {
        uri: "/auth/login",
    },
    check:{
        uri: "/auth/check",
    },
    rateValidate:{
        uri: "/loader/rate/validate"
    },
    shipScheduleValidate:{
        uri: "/loader/ship/schedule/validate"
    },
    additionalExpensesValidate:{
        uri: "/loader/additional/expenses/validate"
    }
};
