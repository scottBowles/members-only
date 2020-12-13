const User = require('../models/user');

exports.users_get = async (req, res) => {
  const users = await User.find();
  res.render('users', { users });
};

exports.user_page_get = async (req, res) => {
  const { currentUser } = req.locals;
  const { id } = req.params;
  const user = await User.findById(id);
  return res.send({ user });
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

exports.new_message_get = (req, res, next) => {
  res.send('new_message_get not yet implemented');
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
