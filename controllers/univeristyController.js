import UniveristyUtils from '../models/universityModel.js';
import { deleteManyOldImage } from '../utils/deleteOldImage.js';
const University = UniveristyUtils.universityModel;
const uniValidation = UniveristyUtils.uniValidation;


export const getUniversity = async (req, res) => {
    const university = await University.find().populate('faculties', 'name -_id').populate({
        path: "students",
        select: "name surname  ,-_id",
        populate: {
            path: "faculty",
            select: "name ,-_id",
        }
    });
    res.status(200).send(university);
};

export const getUniversityById = async (req, res) => {
    const university = await University.findById(req.params.id);
    res.status(200).send(university);
}
export const deleteAllUniversity = async (req, res) => {
    await University.deleteMany();
    res.status(200).send("All university deleted");
}
export const deleteUniversityById = async (req, res) => {
    await University.findByIdAndDelete(req.params.id);
    res.status(200).send("University deleted");
}

export const createUniveristy = async (req, res) => {
    const { error } = uniValidation(req.body);
    if (error) {
        res.status(400).send(error.message)
    } else {
        let fileObj = req.files;
        let filesObjLength = Object.keys(fileObj).length
        if (filesObjLength === 0 ) {
            const university = new University(req.body);
            const result = await university.save();
            res.status(201).send(result);
        }else{
            const university = new University(req.body);
            const uploadFiles = [];
            req.files.images.map(async item =>{
                uploadFiles.push(item.path)
            })
            university.images = uploadFiles
            const result = await university.save();
            res.status(201).send(result);
        }
      
    }
}
// export const updateUniversity = async (req, res) => {
//     const { error } = uniValidation(req.body);
//     if (error) {
//         res.status(400).send(error.message)
//     } else {
//         const univeristy = await University.findByIdAndUpdate(req.params.id, {
//             name: req.body.name,
//             adress: req.body.adress
//         })
//         res.status(200).send(univeristy)
//     }
// }

export const updateUniversity = async (req, res) => {
    const { error } = uniValidation(req.body);
    const paramsId = req.params.id;
    if (error) {
        res.status(400).send(error.message);
    } else {
        let university;
        university = await University.findById(paramsId);
        if (!university) {
            return res.status(404).send("No university");
        } else {
            let fileObj = req.files;
            let filesObjLength = Object.keys(fileObj).length;
            if (filesObjLength === 0) {
                university = await University.findByIdAndUpdate(paramsId, {
                    ...req.body
                });
                await university.save();
                res.status(200).json(university);
            } else {
                university = await University.findByIdAndUpdate(paramsId, {
                    ...req.body
                });
                deleteManyOldImage(university.images);
                const uploadFiles = [];
                req.files.images.map(async item => {
                    uploadFiles.push(item.path)
                })
                university.images = uploadFiles;
                const result = await university.save();
                res.status(201).send(result);

            }
        }
    }
}