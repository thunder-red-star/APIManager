const nodeFetch = require('node-fetch');
const Axios = require('axios');
const request = require('request');
const superagent = require('superagent');
const fs = require('fs');

module.exports = class {
    constructor (options = {}) {
        if (!options.fetcher) {
            console.log("No fetcher option provided, using node-fetch as default");
            this.fetcher = nodeFetch;
        }
        else {
            if (options.fetcher == "node-fetch") {
                this.fetcher = nodeFetch;
            }
            else if (options.fetcher == "axios") {
                this.fetcher = Axios;
            }
            else if (options.fetcher == "request") {
                this.fetcher = request;
            }
            else if (options.fetcher == "superagent") {
                this.fetcher = superagent;
            }
            else {
                console.log("Invalid fetcher type, using node-fetch as default");
                this.fetcher = nodeFetch;
            }
        }
    }
}