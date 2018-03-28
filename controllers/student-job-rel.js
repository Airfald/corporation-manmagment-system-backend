/*
 * @Author: 欧贺福
 * @Date: 2018-03-13 20:40:39
 * @Last Modified by: 欧贺福
 * @Last Modified time: 2018-03-28 18:14:08
 */
const RESPONSE_STATUS = require('../config/status')
const studentJobRelModel = require('../models/student-job-rel')
const utils = require('../utils/common')
/**
 * 新建一个学生职位关联表
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
function create (req, res, next) {
  let data = req.body
  studentJobRelModel.create({
    studentJobRelId: data.studentJobRelId,
    departmentId: data.departmentId,
    studentId: data.studentId,
    jobId: data.jobId
  }).then(studentJobRel => {
    res.json({
      errCode: 0,
      errMsg: RESPONSE_STATUS[0],
      value: studentJobRel
    })
  })
}
/**
 * 删除一学生职位关联表
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
function deleteStudentJobRel (req, res, next) {
  let studentJobRelId = req.query.id
  studentJobRelModel.findOne({
    where: { id: studentJobRelId }
  }).then(studentJobRel => {
    if (studentJobRel !== null) {
      studentJobRelModel.destroy({
        where: { id: studentJobRelId }
      }).then(data => {
        res.json({
          errCode: 0,
          errMsg: RESPONSE_STATUS[0],
          value: studentJobRel
        })
      })
    } else {
      res.json({
        errCode: 1,
        errMsg: RESPONSE_STATUS[1],
        value: studentJobRel
      })
    }
  })
}
/**
 * 更学生职位关联表信息
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
function update (req, res, next) {
  let data = req.body
  let studentJobRelId = req.body.id
  let filedObj = {}
  for (let key in data) {
    if (key !== 'id') {
      filedObj[key] = data[key]
    }
  }
  studentJobRelModel.update(filedObj, {
    where: { id: studentJobRelId }
  }).then(studentJobRel => {
    res.json({
      errCode: 0,
      errMsg: RESPONSE_STATUS[0],
      value: studentJobRel
    })
  })
}
/**
 * 查看详情
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
function view (req, res, next) {
  let studentJobRelId = req.query.id
  studentJobRelModel.findOne({
    where: { id: studentJobRelId }
  }).then(studentJobRel => {
    if (studentJobRel !== null) {
      res.json({
        errCode: 0,
        errMsg: RESPONSE_STATUS[0],
        value: studentJobRel
      })
    } else {
      res.json({
        errCode: 1,
        errMsg: RESPONSE_STATUS[1],
        value: studentJobRel
      })
    }
  })
}
/**
 * 获取学生职位的列表
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
function studentJobRelList (req, res, next) {
  let pageSize = req.query.pageSize
  let pageNum = req.query.pageNum
  utils.getModelList(pageSize, pageNum, studentJobRelModel, {}).then(value => {
    res.json({
      errCode: 0,
      errMsg: RESPONSE_STATUS[0],
      value: value
    })
  })
}

module.exports = {
  create,
  deleteStudentJobRel,
  update,
  view,
  studentJobRelList
}
