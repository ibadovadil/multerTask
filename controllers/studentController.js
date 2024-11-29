import StudentUtils from '../models/studentModel.js';

const Student = StudentUtils.studentModel;
const studentValidation = StudentUtils.studentValidation;
import FacultyUtils from '../models/facultyModel.js';
const Faculty = FacultyUtils.facultyModel;
import UniversityUtils from '../models/universityModel.js';
import { deleteSingleOldImage } from '../utils/deleteOldImage.js';
const University = UniversityUtils.universityModel;


export const GetAllStudents = async (req, res) => {
    const students = await Student.find().populate("university", "name -_id").populate("faculty", "name -_id"); //!Optional
    res.status(200).send(students);
};
export const GetStudentById = async (req, res) => {
    const students = await Student.findById(req.params.id);
    res.status(200).send(students);
};
export const deleteStudentById = async (req, res) => {
    const id = req.params.id;
    if (id === "all") {
        await Student.deleteMany();
        res.status(200).send("All students deleted");
    } else {
        const student = await Student.findByIdAndDelete(req.params.id);
        res.status(200).send(student);
    }

}
export const createStudent = async (req, res) => {
    const { error } = studentValidation(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const { faculty, university } = req.body;
        const isFacultyInUniversity = await Faculty.find({ _id: faculty, universities: university });
        if (!isFacultyInUniversity) {
            res.status(400).send("The faculty does not belong to the given university")
        }
        //avatar
        const student = new Student(req.body);
        student.avatar = req.file.path;
        await student.save();
        // add student to uni
        await University.findByIdAndUpdate(university, {
            $addToSet: { students: student._id }
        });

        //add student to faculty
        await Faculty.findByIdAndUpdate(faculty, {
            $addToSet: { students: student._id }
        });
        res.status(201).send(student);
    }
}


export const updateStudent = async (req, res) => {
    const { error } = studentValidation(req.body);
    const paramsId = req.params.id;
    if (error) {
        res.status(400).send(error.message);
    } else {
        let student;
        student = await Student.findById(paramsId);
        if (!student) {
            return res.status(404).send("Cannot find studend");
        } else {
            let fileObj = req.files;
            let filesObjLength = Object.keys(fileObj).length;
            if (filesObjLength === 0) {
                student = await Student.findByIdAndUpdate(paramsId, {
                    ...req.body
                });
                await student.save();
                res.status(200).json(student);
            } else {
                student = await Student.findByIdAndUpdate(paramsId, {
                    ...req.body
                });
                deleteSingleOldImage(student.avatar);
                student.avatar = req.files.avatar.path;
                const result = await student.save();
                res.status(201).send(result);

            }
        }
    }
}
