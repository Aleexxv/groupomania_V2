const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');

router.post('/signin', usersCtrl.signIn);
router.post('/login', usersCtrl.logIn);
router.get('/', usersCtrl.getOneUsers);
router.post('/logout', usersCtrl.logOut);
router.put('/update/:id', usersCtrl.updateUsers);
router.delete('/delete/:id', usersCtrl.deleteUsers);


module.exports = router;