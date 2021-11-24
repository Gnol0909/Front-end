
const mongoose = require('mongoose')
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
// var slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

const PhuongTienDoan = new Schema({
  MaPhuongTien: { type: String, maxLength: 100 },
  MaDoan: { type: String },
},{
  timestamps: true
});

// PhuongTienDoan.plugin(mongooseDelete,{ overrideMethods: 'all' });
module.exports = mongoose.model('PhuongTienDoan', PhuongTienDoan);
