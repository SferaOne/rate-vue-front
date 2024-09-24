import md5 from "md5";

export const auth = {
    methods: {
        mixed(mstring1, mstring2, mstring3) {
            return mstring3.substr(0, 5) +
                mstring2.substr(24) +
                mstring1.substr(5, 8) +
                mstring2.substr(8, 8) +
                mstring1.substr(21, 8) +
                mstring2.substr(0, 8) +
                mstring1.substr(13, 8) +
                mstring2.substr(16, 8) +
                mstring3.substr(5);
        },
        getepoch() {
            return Math.round(new Date().getTime() / 1000);
        },
        gethex(epoch) {
            return epoch.toString(16);
        },
        getmixed(login, password, key) {
            return this.mixed(md5(login), md5(password), this.gethex(key))
        },
    }
}