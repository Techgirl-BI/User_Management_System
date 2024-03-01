import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    level1: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
    level2: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
    level3: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
    superCommissionPermitted: { type: Boolean,},
    street: { type: String },
    location: { type: String},
    iban: { type: String}
});

const Worker = mongoose.model('Worker', workerSchema);
export default Worker