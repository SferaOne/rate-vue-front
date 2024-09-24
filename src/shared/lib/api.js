import axios from "axios";

export const api = {
    methods: {
        get(uri, headers) {
            return axios
                .get(uri, headers)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return error;
                });
        },
        post(uri, params, headers) {
            return axios
                .post(uri + "/", params, headers)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return error;
                });
        }
    }
}