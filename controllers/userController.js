require('dotenv').config();
const _ = require('lodash');
const User = require('../models/user');
const Message = require('../models/message');

exports.users_get = async (req, res) => {
  const users = await User.find().populate('messageCount');
  return res.render('users', { users });
};

exports.new_message_get = (req, res, next) => res.render('newMessage');

exports.new_message_post = async (req, res, next) => {
  const { currentUser } = res.locals;
  const message = new Message(_.pick(req.body, ['title', 'text']));
  message.author = res.locals.currentUser._id;
  const savedMessage = await message.save();
  return res.redirect(`/users/${currentUser._id}/messages/${savedMessage._id}`);
};

exports.user_page_get = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('messages');
  return res.render('userPage', { user });
};

exports.user_page_put = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const updates = _.pick(req.body, [
    'username',
    'firstName',
    'lastName',
    'password',
  ]);
  const updatedUser = new User(Object.assign(user, updates));
  await updatedUser.save();
  return res.redirect(`/users/${id}`);
};

exports.user_page_delete = async (req, res, next) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  return res.redirect('/');
};

exports.jointheclub_get = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  return res.render('join-the-club', { user });
};

exports.jointheclub_post = async (req, res, next) => {
  const { password } = req.body;
  const user = await User.findById(req.params.id);
  if (password === process.env.SUPER_SECRET_PASSWORD) {
    if (!user.roles.includes('member')) {
      user.roles.push('member');
      await user.save();
    }
    return res.redirect(`/users/${user._id}`);
  }
  return res.render('join-the-club', { user, msg: 'Incorrect Password' });
};

exports.messages_get = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('messages');
  return res.render('messages', { user });
};

exports.message_get = async (req, res, next) => {
  const { messageid } = req.params;
  const message = await Message.findById(messageid).populate('author');
  return res.render('message', { message });
};

exports.message_put = async (req, res, next) => {
  const { id, messageid } = req.params;
  const message = await Message.findById(messageid);
  const updates = _.pick(req.body, ['title', 'text']);
  const updatedMessage = new Message(Object.assign(message, updates));
  await updatedMessage.save();
  return res.redirect(`/users/${id}/messages/${messageid}`);
};

exports.message_delete = async (req, res, next) => {
  const { id, messageid } = req.params;
  await Message.findByIdAndDelete(messageid);
  return res.redirect(`/users/${id}/messages`);
};
