const multer = require('multer');
const shortid = require('shortid')
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});


exports.upload = multer({ storage });












// const shortid = require('shortid')
// const path = require('path');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join(path.dirname(__dirname), 'uploads'));
//         console.log(__dirname)
//     },
//     filename: function(req, file, cb) {
//         cb(null, shortid.generate() + "-" + file.originalname);
//     },
// });


// const upload = multer({ storage });

// const ch = () => {
//     console.log("working")
//     console.log(path.join(path.dirname(__dirname), 'uploads'))
// }