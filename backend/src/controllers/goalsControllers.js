const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalsModels')

const getGoal = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    res.status(200).json(goals);
});
const setGoal = asyncHandler(async (req,res)=>{
    if (!req.body.text) {
    res.status(400);
        throw new Error('please Add a text field')
    }

    const goals = await Goal.create({
        text : req.body.text
    })

    res.status(200).json(goals)
})

const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    // Check if goal exists
    if (!goal) {
        res.status(400);
        throw new Error('Goal with this ID not found');
    }

    console.log('Request Body:', req.body); // Log request body to see what is coming in

    const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        { text: req.body.text }, // Only update the text field explicitly
        { new: true, runValidators: true }
    );

    res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('can not find error')
    }
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id, {new:true})
    res.status(200).json(deletedGoal)
})

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}