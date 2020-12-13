const _ = require('lodash');
const User = require('../models/user');
const Message = require('../models/message');

exports.users_get = async (req, res) => {
  const users = await User.find().populate('messageCount');
  res.render('users', { users });
};

exports.new_message_get = (req, res, next) => {
  res.render('newMessage');
};

exports.new_message_post = async (req, res, next) => {
  const { currentUser } = res.locals;
  const message = new Message(_.pick(req.body, ['title', 'text']));
  message.author = res.locals.currentUser._id;
  const savedMessage = await message.save();
  res.redirect(`/users/${currentUser._id}/messages/${savedMessage._id}`);
};

exports.user_page_get = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('messages');
  return res.render('userPage', { user });
};

exports.user_page_put = (req, res, next) => {
  res.send('user_page_put not yet implemented');
};

exports.user_page_delete = (req, res, next) => {
  res.send('user_page_delete not yet implemented');
};

exports.jointheclub_get = (req, res, next) => {
  res.send('jointheclub_get not yet implemented');
};

exports.jointheclub_put = (req, res, next) => {
  res.send('jointheclub_put not yet implemented');
};

exports.messages_get = (req, res, next) => {
  res.send('messages_get not yet implemented');
};

exports.message_get = (req, res, next) => {
  res.send('message_get not yet implemented');
};

exports.message_put = (req, res, next) => {
  res.send('message_put not yet implemented');
};

exports.message_delete = (req, res, next) => {
  res.send('message_delete not yet implemented');
};
