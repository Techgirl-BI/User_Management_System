import Joi from "joi"
const workerJoiSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    level1: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), 
    supervisor: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), 
    level2: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    level3: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    superCommissionPermitted: Joi.boolean(),
    street: Joi.string(),
    location: Joi.string(),
    iban: Joi.string()
});
export const validateWorker = (workerData) => {
    return workerJoiSchema.validate(workerData);
};
export default workerJoiSchema