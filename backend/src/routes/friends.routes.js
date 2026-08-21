const express = require('express');
const authenticateToken = require('../middleware/auth.middleware');
const {
  getFriends,
  getFriendById,
  createFriend
} = require('../controllers/friends.controller');

const router = express.Router();

router.use(authenticateToken);
router.get('/', getFriends);
router.get('/:id', getFriendById);
router.post('/', createFriend);

module.exports = router;
