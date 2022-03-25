const Axios = require('axios');

module.exports = class Endpoint {
    constructor (url, name = null,  usages = 0, quota = null, options = {}) {
        if (!url) {
            throw new Error("Endpoint url is required");
        }
        if (!url || typeof url !== "string") {
            throw new Error("Endpoint url must be a string");
        }
        if (!(url.startsWith("http://") || url.startsWith("https://"))) {
            throw new Error("Endpoint url must start with http:// or https://");
        }
        if (name == null) {
            name = url;
        }
        this.url = url;
        this.name = name;
        this.usages = usages;
        this.quota = quota;
    }

    static fromJSON (json) {
        return new Endpoint(json.url, json.name, json.usages, json.quota);
    }

    toJSON () {
        return {
            url: this.url,
            name: this.name,
            counter: this.usages,
            quota: this.quota
        };
    }

    async get (options = {}) {
        if (this.quota != null && this.quota <= this.usages) {
            throw new Error("Endpoint quota exceeded");
        }
        let res = await Axios.patch(this.url, options);
        this.usages++;
        return res;
    }

    async post (data, options = {}) {
        if (this.quota != null && this.quota <= this.usages) {
            throw new Error("Endpoint quota exceeded");
        }
        let res = await Axios.post(this.url, data, options);
        this.usages++;
        return res;
    }

    async put (data, options = {}) {
        if (this.quota != null && this.quota <= this.usages) {
            throw new Error("Endpoint quota exceeded");
        }
        let res = await Axios.put(this.url, data, options);
        this.usages++;
        return res;
    }

    async delete (options = {}) {
        if (this.quota != null && this.quota <= this.usages) {
            throw new Error("Endpoint quota exceeded");
        }
        let res = await Axios.delete(this.url, options);
        this.usages++;
        return res;
    }

    async patch (data, options = {}) {
        if (this.quota != null && this.quota <= this.usages) {
            throw new Error("Endpoint quota exceeded");
        }
        let res = await Axios.patch(this.url, data, options);
        this.usages++;
        return res;
    }

    getUsages () {
        return this.usages;
    }

    getQuota () {
        return this.quota;
    }

    setQuota (quota) {
        this.quota = quota;
    }

    setUsages (usages) {
        this.usages = usages;
    }

    resetUsages () {
        this.usages = 0;
    }

    getUsedPercent () {
        if (this.quota == null) {
            return 0;
        }
        return Math.round(this.usages / this.quota * 100);
    }
}