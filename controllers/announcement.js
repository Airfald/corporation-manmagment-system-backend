/*
 * @Author: 欧贺福
 * @Date: 2018-03-13 20:40:39
 * @Last Modified by: 欧贺福
 * @Last Modified time: 2018-03-26 18:31:00
 */
var RESPONSE_STATUS = require('../config/status')
var announcementModel = require('../models/announcement')
/**
 * 新建一个公告     谁创建的公告，通过获取用户信息来判断
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
function create (req, res, next) {
  let data = req.body
  announcementModel.create({
    corporationId: data.corporationId,
    name: data.name,
    content: data.content
  }).then(announcement => {
    res.json({
      errCode: 0,
      errMsg: RESPONSE_STATUS[0],
      value: announcement
    })
  })
}
/**
 * 删除一个公告
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
function deleteAnnounce (req, res, next) {
  let announcementId = req.query.id
  announcementModel.findOne({
    where: { id: announcementId }
  }).then(announcement => {
    if (announcement !== null) {
      announcementModel.destroy({
        where: { id: announcementId }
      }).then(data => {
        res.json({
          errCode: 0,
          errMsg: RESPONSE_STATUS[0],
          value: announcement
        })
      })
    } else {
      res.json({
        errCode: 1,
        errMsg: RESPONSE_STATUS[1],
        value: announcement
      })
    }
  })
}
/**
 * 更新公告
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
function update (req, res, next) {
  let data = req.body
  let announcementId = req.body.id
  let filedObj = {}
  for (let key in data) {
    if (key !== 'id') {
      filedObj[key] = data[key]
    }
  }
  announcementModel.update(filedObj, {
    where: { id: announcementId }
  }).then(announcement => {
    res.json({
      errCode: 0,
      errMsg: RESPONSE_STATUS[0],
      value: announcement
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
  let announcementId = req.query.id
  announcementModel.findOne({
    where: { id: announcementId }
  }).then(announcement => {
    res.json({
      errCode: 0,
      errMsg: RESPONSE_STATUS[0],
      value: announcement
    })
  })
}

module.exports = {
  create,
  deleteAnnounce,
  update,
  view
}