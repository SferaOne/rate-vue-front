export const storage = {
    methods:{
        set(key, value) {
            window.localStorage.setItem(key, value)
        },
        get(key) {
            return window.localStorage.getItem(key);
        },
        clear(){
            window.localStorage.clear();
        },
        remove(key){
            window.localStorage.removeItem(key);
        }
    }
}