
const mongoose = require('mongoose');

// Define schema
const GoalModel = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'please add a text value']
    },
}, {
    timestamps: true // Corrected capitalization: 'timestamps'
});

module.exports = mongoose.model('Goal', GoalModel)