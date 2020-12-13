const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.users_get);

router.get('/:id', userController.user_page_get);
router.put('/:id', userController.user_page_put);
router.delete('/:id', userController.user_page_delete);

router.get('/:id/join-the-club', userController.jointheclub_get);
router.put('/:id/join-the-club', userController.jointheclub_put);

router.get('/:id/new-message', userController.new_message_get);

router.get('/:id/messages', userController.messages_get);
router.put('/:id/messages', userController.messages_put);
router.delete('/:id/messages', userController.messages_delete);

router.get('/:id/messages/:messageid', userController.message_get);
router.put('/:id/messages/:messageid', userController.message_put);
router.delete('/:id/messages/:messageid', userController.message_delete);

module.exports = router;
