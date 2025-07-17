"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSubscriberToNewsletter = addSubscriberToNewsletter;
const brevo_1 = require("@getbrevo/brevo");
async function addSubscriberToNewsletter(email) {
    // Validate environment variables first
    if (!process.env.BREVO_API_KEY) {
        throw new Error("BREVO_API_KEY environment variable is not set");
    }
    if (!process.env.BREVO_LIST_ID) {
        throw new Error("BREVO_LIST_ID environment variable is not set");
    }
    const listId = parseInt(process.env.BREVO_LIST_ID);
    if (isNaN(listId)) {
        throw new Error("BREVO_LIST_ID must be a valid number");
    }
    // Configure API key authentication using the default method
    const contactsApi = new brevo_1.ContactsApi();
    contactsApi.setApiKey(0, process.env.BREVO_API_KEY);
    const createContact = {
        email,
        listIds: [listId],
        updateEnabled: true,
    };
    try {
        await contactsApi.createContact(createContact);
    }
    catch (error) {
        // If contact already exists, Brevo will return a 400 error
        // We'll re-throw the error to let the calling function handle it
        throw error;
    }
}
//# sourceMappingURL=newsletter.js.map