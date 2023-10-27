const router = require('express').Router();
const { User } = require('../../models');

//get route for all users
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get route for single user
router.get('/:id', async (req, res) => {
  try {
    const singleUser = await User.findOne({ _id: req.params.id })
      .populate('thoughts')
      .populate('friends');
    if (!singleUser) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    res.json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting the user');
  }
});

router.post('/create', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit single user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username,
        email: req.body.email,
      },
      { new: true }
    );
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'no user found' });
    }
    // add friend to friends array in user document
    user.friends = user.friends || [];
    // check to see if you're already friends
    if (user.friends.includes(req.params.friendId)) {
      return res.status(409).json({ message: 'already friends' });
    } else {
      user.friends.push(req.params.friendId);
      await user.save();
      res.status(201).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }

  router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID!' });
      }
      const userfriends = user.friends || [];
      if (userfriends.includes(req.params.friendId)) {
        userfriends.forEach((el, index) => {
          if (el === req.params.friendId) {
            userfriends.splice(index, 1);
          }
        });
      } else {
        return res
          .status(404)
          .json({ message: 'User not a friend of this user.' });
      }
      await user.save();
      res.sendStatus(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});
module.exports = router;