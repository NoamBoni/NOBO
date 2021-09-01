const express = require('express');
const {
    getReviews,
    createReview,
    deleteReview,
    setUserAndId,
    getOneReview,
    updateReview,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').get(getReviews).post(protect, setUserAndId, createReview);
router
    .route('/:id')
    .get(getOneReview)
    .patch(restrictTo('admin', 'lead guide'), updateReview)
    .delete(restrictTo('admin'), deleteReview);

module.exports = router;
