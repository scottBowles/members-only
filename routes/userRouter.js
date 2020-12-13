const express = require('express');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

// Note: auth always allows admin users through

router.get('/', auth('member'), userController.users_get);

router.get('/:id', auth('member'), userController.user_page_get);
router.put('/:id', auth('self'), userController.user_page_put);
router.delete('/:id', auth('self'), userController.user_page_delete);

router.get('/:id/join-the-club', userController.jointheclub_get);
router.post('/:id/join-the-club', userController.jointheclub_post);

router.get('/:id/messages/new', auth('self'), userController.new_message_get);
router.post('/:id/messages/new', auth('self'), userController.new_message_post);

router.get('/:id/messages', auth('member'), userController.messages_get);

router.get(
  '/:id/messages/:messageid',
  auth('member'),
  userController.message_get
);
router.put(
  '/:id/messages/:messageid',
  auth('self'),
  userController.message_put
);
router.delete(
  '/:id/messages/:messageid',
  auth('self'),
  userController.message_delete
);

module.exports = router;
