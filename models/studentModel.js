import Joi from "joi";
import mongoose, { Schema } from "mongoose";

const studentSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
        default: "XXX"
    },
    avatar:{
        type: String
    },
    age: {
        type: Number,
        required: true
    },
    university: {//one to many
        type: Schema.Types.ObjectId,
        ref: "University"
    },
    faculty: { //one to many
        type: Schema.Types.ObjectId,
        ref: "Faculty"
    }
});

const studentValidation = (student) => {
    const schema = new Joi.object({
        name: Joi.string(),
        surname: Joi.string(),
        age: Joi.number(),
        university: Joi.string(),
        faculty: Joi.string(),
        avatar:Joi.string()
    })
    return schema.validate(student);
};

const studentModel = mongoose.model("Student", studentSchema);
export default { studentModel, studentValidation };