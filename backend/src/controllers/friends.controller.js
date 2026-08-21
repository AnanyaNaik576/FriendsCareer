const mongoose = require('mongoose');
const Friend = require('../models/Friend.model');
const { createFriendSchema } = require('../lib/validation');

async function getFriends(req, res, next) {
  try {
    const friends = await Friend.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    return res.json(friends);
  } catch (error) {
    return next(error);
  }
}

async function getFriendById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      const error = new Error('Friend not found.');
      error.status = 404;
      throw error;
    }

    // Query by both ID and owner so one user cannot access another user's contact by guessing an ID.
    const friend = await Friend.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!friend) {
      const error = new Error('Friend not found.');
      error.status = 404;
      throw error;
    }

    return res.json(friend);
  } catch (error) {
    return next(error);
  }
}

async function createFriend(req, res, next) {
  try {
    const friendData = createFriendSchema.parse(req.body);
    const friend = await Friend.create({
      ...friendData,
      userId: req.user.userId
    });
    return res.status(201).json(friend);
  } catch (error) {
    return next(error);
  }
}

module.exports = { getFriends, getFriendById, createFriend };
