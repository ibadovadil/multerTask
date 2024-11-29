import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const facultySchema = Schema({
    name: {
        type: String,
        required: true
    },
    students: [{ //one to many
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    universities: [{ //many to many
        type: Schema.Types.ObjectId,
        ref: 'University'
    }]
})
const facultyValidation = (faculty) => {
    const schema = new Joi.object({
        name: Joi.string(),
        students: Joi.array().items(Joi.string()), 
        universities: Joi.array().items(Joi.string())
    })
    return schema.validate(faculty);
};
const facultyModel = mongoose.model("Faculty", facultySchema);
export default {facultyModel , facultyValidation};
