const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: [String], enum: ['admin', 'member'], default: [] },
});

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'author',
  justOne: false,
  options: { sort: { timestamp: -1 } },
});

UserSchema.virtual('messageCount', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'author',
  count: true,
});

module.exports = mongoose.model('User', UserSchema);
