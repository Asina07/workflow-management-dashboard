const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the destination directory
    },
    filename: function (req, file, cb) {
    cb(null,`${Date.now()}-${file.originalname}`); // specify the file name
    }
});

//file filer
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
    } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'), false);
    }
};


const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;