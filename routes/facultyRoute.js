import {getAllFaculty,getFacultyById,deleteFacultyById,createFaculty, updateFaculty} from '../controllers/facultyController.js';

import express  from 'express';

const router = express.Router();

router.get('/' , getAllFaculty);
router.put('/:id' , updateFaculty);
router.get('/:id' , getFacultyById);
router.post('/' , createFaculty);
router.delete('/:id' , deleteFacultyById);


export default router;
