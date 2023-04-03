const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtResponse,
    removeThoughtResponse,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(this.getThoughts).post(createThought);

// /api/thought/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/responses
router.route('/:thoughtId/responses').post(addThoughtResponse);

// /api/videos/:thoughtId/responses/:responseId
router.route('/:thoughtId/responses/:responseId').delete(removeThoughtResponse);

module.exports = router;