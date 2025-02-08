import User from "../models/user.schema.js";
import lodash from "lodash";

const { pick } = lodash;

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const returnUser = pick(user, [
            "_id",
            "name",
            "email",
            "image",
            "phone",
            "address",
            "isBusiness"
        ]);

        return returnUser;

    } catch (err) {
        throw new Error(err.message);
    }
};

const getAllUsers = async (allUsers) => {
    try {
        const users = await User.find(allUsers);
        if (!users) {
            throw new Error("users not found");
        }

        const returnUsers = users.map((eachUser) => {
            return pick(eachUser, [
                "_id",
                "name",
                "email",
                "image",
                "phone",
                "address",
                "isBusiness"
            ]);
        });

        return returnUsers;

    } catch (err) {
        throw new Error(err.message);
    }
};

const createUser = async (newUser) => {
    try {
        const user = new User(newUser);
        await user.save();
        if (!user) {
            throw new Error("user was not added");
        }
        const returnUser = pick(user, [
            "_id",
            "name",
            "email",
            "image",
            "phone",
            "address",
            "isBusiness"
        ]);

        return returnUser;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateUser = async (userId, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

        if (!user) {
            throw new Error("user was not updated");
        }
        const returnUser = pick(user, [
            "_id",
            "name",
            "email",
            "image",
            "phone",
            "address",
            "isBusiness"
        ]);

        return returnUser;
    } catch (err) {
        throw new Error(err.message)
    }
};

const changeAuthLevel = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("was not able to find user")
        }

        if (user.isAdmin) {
            return;
        }
        if (user.isBusiness) {
            user.isBusiness = false;
        }
        else if (!user.isBusiness) {
            user.isBusiness = true;
        }
        await user.save();

        const returnUser = pick(user, [
            "_id",
            "name",
            "email",
            "image",
            "phone",
            "address",
            "isBusiness"
        ]);

        return returnUser;

    } catch (err) {
        throw new Error(err.message);
    }
};

export { getUserById, getAllUsers, createUser, updateUser, changeAuthLevel };