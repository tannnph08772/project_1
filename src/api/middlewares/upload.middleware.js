const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/uploads')
    },
    filename: function(req, file, cb) {
        let filename = `${Date.now()}-tann-${file.originalname}`;
        cb(null, filename);
    }
})
let math = ["image/png", "image/jpeg"];
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (math) {
            callback(null, true)
        } else {
            console.log("only jpg and png file supported")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload;