const router = require('express').Router();
const {
    getThoughts,
    getThoughtId,
    newThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
}=require('../../controllers/thoughtControl')

router.route('/').get(getThoughts).post(newThought);
router.route('/:id').get(getThoughtId).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(newReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
