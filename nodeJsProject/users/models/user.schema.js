import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        first: { type: String, required: true, minlength: 3 },
        middle: { type: String, required: false },
        last: { type: String, required: true, minlength: 3 },
    },
    image: {
        url: { type: String, required: true },
        alt: { type: String, required: true },
    },

    isBusiness: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    address: {
        state: { type: String, required: false },
        country: { type: String, required: true, minlength: 2 },
        city: { type: String, required: true, minlength: 2 },
        street: { type: String, required: true, minlength: 2 },
        houseNumber: { type: Number, required: true, minlength: 2 },
        zip: { type: Number, required: true, minlength: 2 },
    },
});

export default model("User", userSchema);
