import Errors from './Errors';
import Settings from './Settings';
import Reject from "./Reject";

export default class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
     constructor(data,reset = null,settings = []) {
        this.originalData = data;

        for (let field in data) {
            this[field] = data[field];
        }

        this.errors = new Errors();
        this.settings = new Settings();
    }


    /**
     * Fetch all relevant data for the form.
     */
     data() {
        let data = {};

        for (let property in this.originalData) {
            data[property] = this[property];
        }

        return data;
    }


    /**
     * Reset the form fields.
     */
     reset() {
        for (let field in this.originalData) {
            this[field] = this.originalData[field];
        }

        this.errors.clear();
    }

    /**
     * Reset the form fields.
     */
     clear() {
        this.reset();
    }

    /**
     * Deletes the error for specified field
     */
     set(field,value){
        this[field] = value

        this.errors.clear(field)
    }


    /**
     * Send a POST request to the given URL.
     * .
     * @param {string} url
     */
     post(url) {
        return this.submit('post', url);
    }


    /**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     */
     update(url) {
        return this.submit('put', url);
    }

    /**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     */
     put(url) {
        return this.submit('put', url);
    }


    /**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     */
     patch(url) {
        return this.submit('patch', url);
    }


    /**
     * Send a DELETE request to the given URL.
     * .
     * @param {string} url
     */
     delete(url) {
        return this.submit('delete', url);
    }


     static get(url){
        return (new Form({})).submit('get',url);
    }


    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     */
     submit(requestType, url) {
        return new Promise((resolve, reject) => {
            axios[requestType](url, this.data())
            .then(response => {

                this.onSuccess(response.data);
                resolve(response.data);
            })
            .catch(error => {

                this.onFail(error.response.data);

                let rejectable = new Reject(error,this.errors);

                reject(rejectable);
            });
        });
    }

    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
     onSuccess(data) {
        this.reset();
    }

    /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     */
     onFail(errors) {
        //Execute Notification stuff
        this.errors.record(errors.errors);
    }
}
