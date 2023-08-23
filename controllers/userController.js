const mongoose = require('mongoose');
const USER = require('../models/userModel').users;
const HOMEDATA = require('../pageData/homPageData').homeData;
const BLOGS = require('../models/blogSchema');
const jwt = require('jsonwebtoken');
const multer = require("multer");


const homePage = (req, res) => {
    res.render("user/home.hbs", { homeData: HOMEDATA });
}

const signupPage = (req, res) => {
    res.render('user/signup.hbs');
}

const loginPage = (req, res) => {
    try {
        if (req.cookies.userJwt) {
            res.redirect('/home');
        } else {
            res.render('user/login.hbs');
        }
    } catch (err) {
        console.error('Error rendering login page:', err);
        res.render('error/error.hbs');
    }
}

const detailedView = (req, res) => {
    try {
        BLOGS.findOne({ _id: req.query.id })
            .populate({
                path: 'createdByUser',
                select: ['name', 'email']
            })
            .populate({
                path: 'createdByAdmin',
                select: ['name', 'email']
            }).then((response) => {
                response.day = convertISODateToCustomFormat(response.createdAt);  
                res.render('user/detailedView.hbs', {detailedData:response});
            }).catch(err => {
                res.status(404).send('Blog not found', err);
                res.render('error/error.hbs');
            });
    } catch (err) {
        console.error('Error fetching blog posts:', err);
        res.render('error/error.hbs');
    }


}

const homePage2 = (req, res) => {
    try {
        BLOGS.find().then((response) => {
            res.render('user/home2.hbs', { home2Data: response });
        }).catch(err => {
            res.status(404).send('home page not found');
            res.render('error/error.hbs');
        });
    } catch (err) {
        console.error('Error fetching blog posts:', err);
        res.render('error/error.hbs');
    }

}

const uploadPage = (req, res) => {
    res.render('user/uploads.hbs');
}


const logout = (req, res) => {
    try {
        res.cookie('userJwt', null, {
            httpOnly: true,
            samSite: 'lax',
            secure: false,
            maxAge: 1
        })
        req.cookies.userJwt = null;
        res.redirect('/loginPage');
    } catch (err) {
        console.error('Error during logout:', err);
        res.render('error/error.hbs');
    }

}


const createBlog = (req, res) => {
    try {
        const fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "public/uploads");
            },
            filename: (req, files, cb) => {
                cb(null, Date.now() + "-" + files.originalname);
            }
        })
        const upload = multer({ storage: fileStorage }).array("image", 4);

        upload(req, res, (err) => {
            if (err) {
                console.error('Error uploading images:', err);
                return res.redirect('error/error.hbs');
            }
            try {
                BLOGS({
                    title: req.body.title,
                    category: req.body.category,
                    createdByUser: req.query.id,
                    content: req.body.content,
                    images: req.files,
                }).save().then(() => {
                    res.redirect('/uploads')
                })
            } catch (err) {
                console.error('Error saving blog:', err);
                res.redirect('error/error.hbs');
            }
        });
    } catch (err) {
        console.error('Error uploading images:', err);
        res.render('error/error.hbs');
    }

}


const doSignUp = (req, res) => {
    try {
        USER({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).save().then(() => {
            res.json({ signup: true })
        })
    } catch (err) {
        console.error('Error saving user:', err);
        res.render('error/error.hbs');
    }

}

const doLogIn = (req, res) => {
    try {
        USER.find({ email: req.body.email, password: req.body.password }).then((response) => {
            if (response.length > 0) {

                const token = jwt.sign({ userId: response[0]._id }, process.env.JWT_KEY, {
                    expiresIn: '2d'
                })
                res.cookie('userJwt', token, {
                    httpOnly: true,
                    samSite: 'lax',
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000
                })

                res.status(200).json({ login: true });
            } else {
                res.redirect('error/error.hbs');
                res.render('error/error.hbs');
            }
        })
    } catch (err) {
        console.error('Error during login:', err);
        res.render('error/error.hbs');
    }

}


function convertISODateToCustomFormat(isoDate) {
    const dateObj = new Date(isoDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj).slice(4, 7);
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours() % 12 || 12;
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const amOrPm = dateObj.getHours() >= 12 ? 'PM' : 'AM';

    return `${day}-${month}-${year} ${hours}:${minutes} ${amOrPm}`
}


module.exports = { signupPage, loginPage, homePage, doSignUp, doLogIn, homePage2, detailedView, logout, uploadPage, createBlog }