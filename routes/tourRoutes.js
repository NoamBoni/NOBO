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

const router = express.Router();

// router.param('id',function)
router.route('/').get(protect, getTours).post(addTour);
router.route('/tours-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(protect, restrictTo('admin', 'lead guide'), deleteTour);

module.exports = router;
