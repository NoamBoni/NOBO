const express = require('express');
const {
    getTours,
    addTour,
    getTour,
    updateTour,
    deleteTour,
    getTourStats,
    getMonthlyPlan,
} = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// router.param('id',function)
router.use('/:tourId/reviews', reviewRouter);

router
    .route('/')
    .get(getTours)
    .post(protect, restrictTo('admin', 'lead guide'), addTour);

router.route('/tours-stats').get(getTourStats);

router.use(protect, restrictTo('admin', 'lead guide'));
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

router.use(restrictTo('admin'));
router.route('/monthly-plan/:year').get(getMonthlyPlan);

module.exports = router;
