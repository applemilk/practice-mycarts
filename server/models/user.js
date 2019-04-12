var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  'userId': String,
  'userName': String,
  'userPwd': String,
  'orderList': Array,
  'cartList': [{
    'productId': String,
    'productName': String,
    'salePrice': Number,
    'productImg': String,
    'checked': Boolean,
    'productNum': Number
  }],
  'addressList': [
    {
      'addressId': String,
      'userName': String,
      'streetName': String,
      'postCode': String,
      'tel': Number,
      'isDefault': Boolean
    }
  ]
})

module.exports = mongoose.model('User', userSchema)
