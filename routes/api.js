const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/workouts/:id", ({ body, params : {id} }, res) => {
  console.log(id);
  console.log(body);

  Workout.findOneAndUpdate({_id: id}, { $push: { exercises: body } })
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/workouts", (req, res) => {
  Workout.aggregate(
    [{ $addFields: { totalDuration: {$sum: "$exercises.duration"}} }]
  )
    .sort({ date: -1 })
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/workouts/range", (req, res) => {
  Workout.aggregate(
    [{ $addFields: { totalDuration: {$sum: "$exercises.duration"}} }]
  )
    .sort({ date: -1 })
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
