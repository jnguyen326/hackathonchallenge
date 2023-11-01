import nextConnect from 'next-connect';
import multer from 'multer';

// If using cloud storage like Google Cloud Storage or AWS S3, you'd
// set up your storage adapters here. For simplicity, let's assume local storage.
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.pdf');
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Check File Type for PDF
function checkFileType(file, cb) {
    const filetypes = /pdf/;
    const extname = filetypes.test(file.originalname.toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: PDFs Only!');
    }
}

const handler = nextConnect()
    .use(upload.single('file'))
    .post((req, res) => {
        // File is stored at req.file.path now
        // If you're using cloud storage, this is where you'd upload the file
        // to your storage provider and then return the file's URL.

        // For now, assuming local storage:
        const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;

        // Respond with the URL of the file.
        res.json({ success: true, fileUrl });
    });

export default handler;
