var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')

mongoose.connect('mongodb://127.0.0.1:27017/dumall')

mongoose.connection.on('connected', function () {
  console.log('connected!')
})

mongoose.connection.on('error', function () {
  console.log('failed!')
})

mongoose.connection.on('disconnected', function () {
  console.log('disconnected!')
})

router.post('/addCart', function (req, res, next) {
  var userId = '10001'
  var productId = req.body.productId
  var User = require('../models/user')
  User.findOne({userId: userId}, function (err, userDoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (userDoc) {
        let goodsItem = ''
        userDoc.cartList.forEach(function (item) {
          if (item.productId === productId) {
            goodsItem = item
            item.productNum++
          }
        })
        if (goodsItem) {
          userDoc.save(function (err2, doc2) {
            if (err2) {
              res.json({
                status: '1',
                msg: err2.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          })
        } else {
          Goods.findOne({productId: productId}, function (err, productDoc) {
            if (err) {
              res.json({
                status: '1',
                msg: err.message
              })
            } else {
              if (productDoc) {
                productDoc.productNum = 1
                productDoc.checked = 1
                console.log('doc:' + productDoc)
                userDoc.cartList.push(productDoc)
                console.log('userDoc:' + userDoc)
                userDoc.save(function (err2, doc2) {
                  if (err2) {
                    res.json({
                      status: '1',
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: 'suc'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})

router.get('/', function (req, res, next) {
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let sort = req.param('sort')
  let skip = (page - 1) * pageSize
  let priceLevel = req.param('priceLevel')
  let params = {}
  var priceGt = ''
  var priceLte = ''
  if (priceLevel !== 'all') {
    switch (priceLevel) {
      case '0':priceGt = 0
        priceLte = 100
        break
      case '1':priceGt = 100
        priceLte = 500
        break
      case '2':priceGt = 500
        priceLte = 1000
        break
      case '3':priceGt = 1000
        priceLte = 5000
        break
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  goodsModel.sort(({'salePrice': sort}))
  goodsModel.exec(({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  }))
})

module.exports = router