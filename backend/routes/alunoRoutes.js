express = require('express');
const router = express.Router();
const AlunosController = require('../controller/AlunosController');
const upload = require('../db/upload')




router.get('/all', AlunosController.getAllAluno);
router.post('/create', upload, AlunosController.createAluno);

module.exports = router;