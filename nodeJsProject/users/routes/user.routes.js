import { Router } from "express";
import { getUserById, getAllUsers, createUser, updateUser, changeAuthLevel } from "../services/dataAccessServicesUser.service.js";
import userValidation from "../models/userValidation.schema.js";
import { validate } from "../../middlewares/validation.js";
import loginSchema from "../validations/loginSchema.js";
import registerSchema from "../validations/registerSchema.js";
import updateUserSchema from "../validations/updateUserSchema.js";
import User from "../models/user.schema.js";
import { comparePassword, hashPassword } from "../services/password.service.js";
import { generateToken } from "../../services/auth.service.js";
import { auth } from "../../middlewares/auth.js";
import { adminOnly, adminOrUser, userOnly } from "../../middlewares/userAuthentication.js";

const userRouter = Router();

// getting all the users (only for admin)
userRouter.get("/", auth, adminOnly, async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// register a new user / add a new user to the database
userRouter.post("/register", validate(registerSchema), async (req, res) => {
    const { error } = userValidation.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({ errors: error.details.map((p) => p.message) });
    }

    try {
        const data = req.body;
        data.password = await hashPassword(data.password);
        const newUser = await createUser(data);

        res.json(newUser);

    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// login a user
userRouter.post("/login", validate(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("Invalid credentials");
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            res.status(401).send("Invalid password");
        }

        const token = generateToken(user);

        return res.send(token);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
});




// getting a user by his id (registerd user or admin)
userRouter.get("/:id", auth, adminOrUser, async (req, res) => {
    try {
        const id = req.params.id;

        const userById = await getUserById(id);
        return res.json(userById);
    } catch (err) {
        res.status(400).send(err.message);
    }
});


// updating a user by his id (the registered user only)
userRouter.put("/:id", auth, userOnly, validate(updateUserSchema), async (req, res) => {

    try {
        const data = req.body;
        const id = req.params.id;

        const updatedUser = await updateUser(id, data);
        return res.json(updatedUser);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// deleting a user by his id (only the registered user or admin)
userRouter.delete("/:id", auth, adminOrUser, async (req, res) => {

    const id = req.params.id;

    try {
        const user = await getUserById(id);
        res.json({ message: "User Deleted", user });
        await User.findByIdAndDelete(user._id);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// changing the user's authentication level (only the registered user or admin)
userRouter.patch("/:id", auth, adminOrUser, async (req, res) => {
    try {
        const user = await changeAuthLevel(req.params.id);
        return res.json({ message: "Biz Status changed to " + user.isBusiness, user });
    } catch (err) {
        res.status(400).send(err.message)
    }
});

export default userRouter;
