const router = require("express").Router();
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const isAuth = require("../middlewares/isAuth");

const UserModel = require("../models/User.model");
const GoalModel = require("../models/Goal.model");

router.post("/create-goal", isAuth, attachCurrentUser, async (req, rse) => {
    try {

        const loggedInUser = req.currentUser; 

        const createGoal = GoalModel.create({ 
            ...req.body, 
            owner: loggedInUser._id,
        });

        const updatedUser = await UserModel.findOneAndUpdate({ 
            _id: loggedInUser._id,
        }, { 
            $push: {goals: createGoal._id },
        },
        { new: true, runValidators: true }
            );

            return res.status(201).json(createdGoal);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: JSON.stringify(error) });
    }
});

module.exports = router;
