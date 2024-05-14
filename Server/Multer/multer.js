import multer from "multer";

const diskStorage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

export const upload = multer({ storage: diskStorage })