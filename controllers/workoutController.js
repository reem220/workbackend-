const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id

  const workouts = await Workout.find({user_id}).sort({createdAt: -1})

  res.json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.json({error: 'No such workout'})
  }
  
  res.json(workout)
}


// create new workout
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body

  
  

  // add doc to db
  try {
    const user_id = req.user._id
    const workout = await Workout.create({title, load, reps, user_id})
    res.json(workout)
  } catch (error) {
    res.json({error: error.message})
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({error: 'No such workout'})
  }

  const workout = await Workout.findById({_id: id}).deleteOne()

  if (!workout) {
    return res.json({error: 'No such workout'})
  }

  res.json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({error: 'No such workout'})
  }

  const workout = await Workout.findById({_id: id}).updateOne({...req.body})

  if (!workout) {
    return res.json({error: 'No such workout'})
  }

  res.json(workout)
}


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}