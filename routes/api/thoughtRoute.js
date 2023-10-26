const router = requre('express').Router();
const { index } = require('../../controllers/reaction');
const { user, thought } = require('../../models');

// get all users and thoughts
router.get('/', async (req, res) => {
  try {
    const allThoughts = await User.find({});
    res.json(allThoughts);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get route for single thought
router.get('/:id', async (req, res) => {
  try {
    const thought = await thought.findone({ _id: req.params.id });
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with that ID' });
    }
    res.json(thought);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//post route to create a new thought
router.post('/create', async (req, res) => {
  try {
    const thought = await thought.create(req.body);
    const user = await user.findone({ _id: req.body.userId });
    await user.thoughts.push(thought.id);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//edit route for single thought
router.put('/:id', async (req, res) => {
  try {
    const thought = await thought.findOneAndUpdate(
      { _id: req.params.id },
      { thoughtText: req.body.thoughtText },
      { new: true }
    );
    await thought.save();
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//delete route for a thought
router.delete('/:id', async (req, res) => {
  try {
    await thought.findByIdAndDelete(req.params.id);
    const user = await user.findOne({ username: req.body.username });
    const userThoughts = user.thoughts;
    if (userThoughts.includes(req.params.id)) {
      userThoughts.forEach((el, index) => {
        if (el === req.params.id) {
          userThoughts.splice(index, 1);
        }
      });
    } else {
      return res
        .status(400)
        .json({ message: 'Not a valid thought, cannot complete request' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// create a reaction

// delete a reaction 