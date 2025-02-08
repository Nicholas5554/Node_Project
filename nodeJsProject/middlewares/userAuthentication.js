export const adminOnly = async (req, res, next) => {
    const user = await req.user;
    try {
        if (!user || !user.isAdmin) {
            return res.status(401).send("Unauthorized user");
        }
        next();

    } catch (err) {
        res.status(500).send(err);
    }
};

export const adminOrBizOnly = async (req, res, next) => {
    const user = await req.user;

    try {
        if (!user.isBusiness && !user.isAdmin) {
            res.status(401).send("Unauthorized user")
        }
        next();
    } catch (err) {
        res.status(500).send(err)
    }
}

export const adminOrUser = async (req, res, next) => {
    const user = await req.user;

    try {
        if (user._id !== req.params.id && !user.isAdmin) {
            return res.status(401).send("Unauthorized user");
        }
        next();
    } catch (err) {
        res.status(500).send(err)
    }
};

export const userOnly = async (req, res, next) => {
    const user = await req.user;

    try {
        if (user._id !== req.params.id) {
            return res.status(401).send("Unauthorized user");
        }
        next();
    } catch (err) {
        res.status(500).send(err)
    }
};
