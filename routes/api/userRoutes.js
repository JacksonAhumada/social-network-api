const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriends,
  deleteFriends
} = require('../../controllers/user-controller');

router
  .route('/')
  .get(getAllUser)
  .post(createUser);

router
  .route('/:id/:friendsId')
  .post(addFriends)
  .delete(deleteFriends)

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);