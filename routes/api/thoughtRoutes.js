const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  addThoughts,
  deleteThoughts,
  updateThoughts,
  addReactions,
  deleteReactions
} = require('../../controllers/thoughts-controller');

// /api/courses
router.route('/').get(getAllThoughts).post(addThoughts);

// /api/courses/:courseId
router
  .route('/:id')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

router
  .route('/:id/reactions')
  .post(addReactions)
  .delete(deleteReactions)

module.exports = router;
