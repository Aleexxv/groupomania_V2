const User = require('../models/Users');
require('dotenv').config();


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signIn = (req, res, next) => {
    (async () => {
        try {
            await User.sync ({ alter: true })
            const salt = await bcrypt.genSalt(10);
            const test = req.body.password
            const hash = await bcrypt.hash(test, salt);
            const user = User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                img: "https://i.pravatar.cc/300",
                email: req.body.email,
                password: hash,
            });
            res.send(await user);
            console.log(user)
            } catch (error) {
            console.error(error)
        }
    })()
};

exports.logIn = (req, res, next) => {
    (async () => {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                }
            });
            if (user) {
            const valid = await bcrypt.compare(req.body.password, user.password); 
                if (valid) {
                    res.status(200).json({
                        // id: user.id,
                        // message: 'Vous êtes connecté',
                        token: token = jwt.sign({ id: user.id }, 'process.env.SERCRET_TOKEN', { expiresIn: '1h' }),
                    });
                    res.send();
                    try {
                        const verify = jwt.verify(token, 'process.env.SERCRET_TOKEN')
                        if (!verify) {
                            res.status(401).json({ message: 'Vous n\'êtes pas connecté' });
                        } else {
                            const user = await User.findOne({
                                where: {
                                    id: verify.id,
                                }
                            });
                            res.send(user);
                        }
                    } catch (err) {
                        console.log({ message: err })
                    }
                } else {
                    res.status(401).json({ message: 'Mot de passe incorrect' });
                }
            } else {
                    res.status(401).json({ message: 'Email incorrect' });
            }
        } catch (err) {
            console.log({message : err})
        }
    })()
};

exports.getOneUsers = (req, res, next) => {
    (async () => {
        try {
            const verify = jwt.verify(token, 'process.env.SERCRET_TOKEN')
            if (!verify) {
                res.status(401).json({ message: 'Vous n\'êtes pas connecté' });
            } else {
                const user = await User.findOne({
                    where: {
                        id: verify.id,
                    }
                });
                res.send(user);
            }
        } catch (err) {
            console.log({ message: err })
        }
    })()
};

exports.logOut = (req, res, next) => {
    const verify = jwt.verify(token, 'process.env.SERCRET_TOKEN')
    const user = User.findOne({
        where: {
            id: verify.id,
        }
    })
    res.status(200).json({
        id: verify.id,
        message: 'Vous êtes déconnecté',
        // token: token = jwt.sign({ id: user.id }, 'process.env.SERCRET_TOKEN', { expiresIn: '0h' }),
    });
    res.send('Vous êtes déconnecté');
};

exports.updateUsers = (req, res, next) => {
    (async () => {
        try {
            const salt = await bcrypt.genSalt(10);
            const test = req.body.password
            const hash = await bcrypt.hash(test, salt);
            const logout = await User.update(
                
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash
                },
                {
                    where: {
                        id: req.params.id,
                    }
                }
            );
            res.send('update success')
            console.log(logout)
            } catch (error) {
            console.error(error)
        }
    })()
};

exports.deleteUsers = (req, res, next) => {
    (async () => {
        try {
            const user = await User.destroy({
                where: {
                    id: req.params.id,
                }
            });
            res.send('delete success')
            console.log(user)
            } catch (error) {
            console.error(error)
        }
    })()
};
