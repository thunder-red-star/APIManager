const Axios = require('axios');

module.exports = class Endpoint {
    /**
     * @param {string} url
     * @param {string} name
     * @param {number} usages
     * @param {number} quota
     * @param options
     */
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

    /**
     * @param {string} json
     * @returns {Endpoint}
     * @description Returns an endpoint parsed from a json string
     */
    static fromJSON (json) {
        return new Endpoint(json.url, json.name, json.usages, json.quota);
    }

    /**
     * @returns {string}
     * @description Returns a json string representation of the endpoint
     */
    toJSON () {
        return {
            url: this.url,
            name: this.name,
            counter: this.usages,
            quota: this.quota
        };
    }

    /**
     * @param options
     * @returns {Promise<*>}
     * @description Returns the GET response from the endpoint
     */
    async get (options = {}) {
        if (this.quota != null && this.quota <= this.usages) {
            throw new Error("Endpoint quota exceeded");
        }
        let res = await Axios.get(this.url, options);
        this.usages++;
        return res;
    }


    /**
     * @param data
     * @param options
     * @returns {Promise<*>}
     * @description Returns the POST response from the endpoint
     */
    async post (data, options = {}) {
        if (this.quota != null && this.quota <= this.usages) {
            throw new Error("Endpoint quota exceeded");
        }
        let res = await Axios.post(this.url, data, options);
        this.usages++;
        return res;
    }

    /**
     * @param data
     * @param options
     * @returns {Promise<*>}
     * @description Returns the PATCH response from the endpoint
     */
    async put (data, options = {}) {
        if (this.quota != null && this.quota <= this.usages) {
            throw new Error("Endpoint quota exceeded");
        }
        let res = await Axios.put(this.url, data, options);
        this.usages++;
        return res;
    }

    /**
     * @param options
     * @returns {Promise<*>}
     * @description Returns the DELETE response from the endpoint
     */
    async delete (options = {}) {
        if (this.quota != null && this.quota <= this.usages) {
            throw new Error("Endpoint quota exceeded");
        }
        let res = await Axios.delete(this.url, options);
        this.usages++;
        return res;
    }

    /**
     * @param options
     * @returns {Promise<*>}
     * @description Returns the PATCH response from the endpoint
     */
    async patch (data, options = {}) {
        if (this.quota != null && this.quota <= this.usages) {
            throw new Error("Endpoint quota exceeded");
        }
        let res = await Axios.patch(this.url, data, options);
        this.usages++;
        return res;
    }

    /**
     * @returns {number}
     * @description Returns the number of usages of the endpoint
     */
    getUsages () {
        return this.usages;
    }

    /**
     * @returns {number}
     * @description Returns the quota of the endpoint
     */
    getQuota () {
        return this.quota;
    }

    /**
     * @param quota
     * @description Sets the quota of the endpoint
     */
    setQuota (quota) {
        this.quota = quota;
    }

    /**
     * @description Sets the usages of the endpoint
     * @param usages
     */
    setUsages (usages) {
        this.usages = usages;
    }

    /**
     * @description Sets the usages to 0.
     */
    resetUsages () {
        this.usages = 0;
    }

    /**
     * @description Returns the percent of quota used.
     * @returns {number}
     */
    getUsedPercent () {
        if (this.quota == null) {
            return 0;
        }
        return Math.round(this.usages / this.quota * 100);
    }
}