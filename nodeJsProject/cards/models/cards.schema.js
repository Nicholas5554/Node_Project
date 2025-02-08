import { Schema, model } from "mongoose";

const cardSchema = new Schema({
    title: { type: String, required: true, minlength: 3 },
    subTitle: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 3 },
    phone: { type: Number, required: true, minlength: 9 },
    email: { type: String, required: true, unique: true },
    web: { type: String, required: true },
    image: {
        url: { type: String, required: true },
        alt: { type: String, required: true }
    },
    address: {
        state: { type: String, required: false },
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        houseNumber: { type: Number, required: true },
        zip: { type: Number, required: true }
    },
    bizNumber: { type: Number, maxlength: 99, default: Math.floor(Math.random() * 99) + 10 },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    likes: { type: [Schema.Types.ObjectId], ref: "user" }
});

export default model("Card", cardSchema);