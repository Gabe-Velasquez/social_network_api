const { Thought, User } = require('../models');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate({
        path: 'thoughts',
        select: '-__v',
      });
      res.status(202).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id }).populate({
        path: 'thoughts',
        select: '-__v',
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.status(201).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, runValidators: true }
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      const friend = await User.findById(req.params.friendId);
      if (
        !user.friends.includes(friend._id) ||
        !friendId.friends.includes(user._id)
      ) {
        const newFriend1 = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { friends: req.params.friendId } },
          { new: true }
        );
        res.status(200).json(newFriend1);
      } else {
        res.status(200).json({ message: `You're already friends with them` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const deleteFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.status(200).json(deleteFriend);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
