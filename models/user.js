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

// Make sure this is working once we have messages

// UserSchema.virtual('messageCount', {
//   ref: 'Message',
//   localField: '_id',
//   foreignField: 'author',
//   count: true,
// });
// Until then:
UserSchema.virtual('messageCount').get(function () {
  return `1 (temp)`;
});

module.exports = mongoose.model('User', UserSchema);
