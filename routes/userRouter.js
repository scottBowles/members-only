const express = require('express');
const auth = require('../middleware/auth');
const authIdOrAdmin = require('../middleware/authIdOrAdmin');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', auth('member'), userController.users_get);

router.get('/new-message', auth('member'), userController.new_message_get);
router.post('/new-message', auth('member'), userController.new_message_post);

router.get('/:id', auth('member'), userController.user_page_get);
router.put('/:id', authIdOrAdmin, userController.user_page_put);
router.delete('/:id', authIdOrAdmin, userController.user_page_delete);

router.get('/:id/join-the-club', userController.jointheclub_get);
router.put('/:id/join-the-club', userController.jointheclub_put);

router.get('/:id/messages', auth('member'), userController.messages_get);

router.get(
  '/:id/messages/:messageid',
  auth('member'),
  userController.message_get
);
router.put(
  '/:id/messages/:messageid',
  authIdOrAdmin,
  userController.message_put
);
router.delete(
  '/:id/messages/:messageid',
  authIdOrAdmin,
  userController.message_delete
);

module.exports = router;
