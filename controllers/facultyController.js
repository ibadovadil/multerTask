import UniversityUtils from '../models/universityModel.js';
const University = UniversityUtils.universityModel;


import FacultytUtils from '../models/facultyModel.js';
const Faculty = FacultytUtils.facultyModel;
const facultyValidation = FacultytUtils.facultyValidation;


export const getAllFaculty = async (req, res) => {
    const faculty = await Faculty.find().populate({
        path: 'students',
        select: 'name surname age -_id',
        populate: ({
            path: 'university',
            select: 'name -_id'
        })
    }).populate({
        path: 'universities',
        select: 'name -_id'
        // populate: ({
        //     path: 'students',
        //     select: 'name surname age -_id'
        // })
    })
    res.status(200).send(faculty);
};

export const getFacultyById = async (req, res) => {
    const faculty = await Faculty.findById(req.params.id);
    res.status(200).send(faculty);
}
export const deleteAllFaculty = async (req, res) => {
    await Faculty.deleteMany();
    res.status(200).send("All university deleted");
}

export const deleteFacultyById = async (req, res) => {
    const id = req.params.id;
    if (id === "all") {
        await Faculty.deleteMany();
        res.status(200).send("All faculties deleted");
    } else {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        res.status(200).send(faculty);
    }

}
export const createFaculty = async (req, res) => {
    const { error } = facultyValidation(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const faculty = new Faculty(req.body);
        await faculty.save();
        if (req.body.universities && req.body.universities.length > 0) {
            await University.updateMany(
                { _id: { $in: req.body.universities } },
                { $addToSet: { faculties: faculty._id } }
            );
        }
        res.status(201).send(faculty);
    }
}
export const updateFaculty = async (req, res) => {
    const { error } = facultyValidation(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const faculty = await Faculty.findByIdAndUpdate(req.params.id, {
            name : req.body.name,
            students : req.body.students,
            universities: req.body.universities
        })
        res.status(200).send(faculty)
    }
}