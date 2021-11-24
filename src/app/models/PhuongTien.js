
const mongoose = require('mongoose')
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
// var slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

const PhuongTien = new Schema({
  MaPhuongTien: { type: String, maxLength: 100 },
  tenPhuongTien: { type: String },
  ToiDa: { type: String },
},{
  timestamps: true
});

// PhuongTien.plugin(mongooseDelete,{ overrideMethods: 'all' });
module.exports = mongoose.model('PhuongTien', PhuongTien);
