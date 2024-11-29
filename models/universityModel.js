import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const universitySchema = Schema({
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    images:{
        type: [String],
    },
    faculties: [{ //may to many
        type: Schema.Types.ObjectId,
        ref: "Faculty"
    }],
    students: [{ //one to many
        type: Schema.Types.ObjectId,
        ref: "Student"
    }]
})



const uniValidation = (university) => {
    const schema = new Joi.object({
        name: Joi.string(),
        adress: Joi.string(),
        faculties: Joi.array(),
        students: Joi.array(),
        images:Joi.array().items(Joi.string())
    })
    return schema.validate(university);
};
const universityModel = mongoose.model("University", universitySchema);
export default { universityModel, uniValidation };


