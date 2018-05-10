const express = require('express')
const router = express.Router()
const studentActivityRelController = require('../controllers/student-activity-rel')
const verifyToken = require('../middleware/verify-token')

router.post('/studentActivityRel/create', verifyToken, studentActivityRelController.create)
router.post('/studentActivityRel/update', verifyToken, studentActivityRelController.update)
router.get('/studentActivityRel/deletestudentActivityRel', verifyToken, studentActivityRelController.deleteStudentActivityRel)
router.get('/studentActivityRel/view', verifyToken, studentActivityRelController.view)
router.get('/studentActivityRel/studentActivityRelList', verifyToken, studentActivityRelController.studentActivityRelList)
router.get('/studentActivityRel/getActivityStudentList', verifyToken, studentActivityRelController.getActivityStudentList)

module.exports = router
