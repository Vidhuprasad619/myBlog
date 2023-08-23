const ADMIN = require('../models/adminModel').admins;
const multer = require("multer");
const BLOGS = require('../models/blogSchema');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { log } = require('console');


const loginPage = (req, res) => {
    res.render('admin/login.hbs');
}

const uploadPage = (req, res) => {
    res.render('admin/uploads.hbs');
}


const doLogIn = (req, res) => {
    try {
        ADMIN.find({ email: req.body.email, password: req.body.password }).then((response) => {
            if (response.length > 0) {

                const token = jwt.sign({ adminId: response[0]._id }, process.env.JWT_KEY2, {
                    expiresIn: '2d'
                })
                res.cookie('adminJwt', token, {
                    httpOnly: true,
                    samSite: 'lax',
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000
                })

                res.status(200).json({ login: true });
            } else {
                res.redirect('error/error.hbs');
            }
        })
    } catch (err) {
        console.error('Error during login:', err);
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
                    createdByAdmin: req.query.id,
                    content: req.body.content,
                    images: req.files,
                }).save().then(() => {
                    res.redirect('/admin/uploads')
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

const logout = (req, res) => {
    try {
        res.cookie('adminJwt', null, {
            httpOnly: true,
            samSite: 'lax',
            secure: false,
            maxAge: 1
        })
        req.cookies.adminJwt = null;
        res.redirect('/admin');
    } catch (err) {
        console.error('Error during logout:', err);
        res.render('error/error.hbs');
    }

}

const homePage = (req, res) => {
    try {
        BLOGS.find().then((response) => {
            res.render('admin/home.hbs', { homeData: response });
        }).catch(err => {
            res.status(404).send('home page not found');
            res.render('error/error.hbs');
        });
    } catch (err) {
        console.error('Error fetching blog posts:', err);
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
                res.render('admin/detailedView.hbs', { detailedData : response });
            }).catch(err => {
                res.status(404).send('Blog not found', err);
                res.render('error/error.hbs');
            });
    } catch (err) {
        console.error('Error fetching blog posts:', err);
        res.render('error/error.hbs');
    }


}


const removePost = (req, res) => {
    try {
        BLOGS.findOne({ _id: req.body.postId }).then((selectedFileData) => {
            BLOGS.deleteOne({ _id: req.body.postId }).then((resp) => {
                for (let i = 0; i < selectedFileData.images.length; i++) {
                    const filePath = path.join(__dirname, '..', 'public/uploads', selectedFileData.images[i].filename)
                    fs.unlink(filePath, (err) => {
                        console.log(err);
                    })
                }
                res.json({ delete: true });
            }).catch(err => {
                res.json({ delete: false, msg: err })
            })

        })


    } catch (err) {
        console.error('Error deleting post:', err);
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



module.exports = { loginPage, doLogIn, uploadPage, createBlog, logout, homePage, detailedView, removePost };