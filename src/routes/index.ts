import * as express from "express";
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '.png');
  },
});

const upload = multer({ storage: storage });

const PagesController = require('../controllers/PagesController');
const MarkerController = require('../controllers/MarkerController');

router.get('/', PagesController.home);

router.get('/markers', MarkerController.get);
router.post('/markers',  upload.any(), MarkerController.post);

module.exports = router;
