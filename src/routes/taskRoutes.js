const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/tasks/start', taskController.startTask);
router.post('/tasks/stop', taskController.stopTask);
router.get('/tasks', taskController.getTaskDetails);

module.exports = router;