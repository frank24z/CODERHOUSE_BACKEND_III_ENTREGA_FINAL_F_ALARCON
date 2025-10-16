import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    pet: { type: String, required: true }
}, { timestamps: true });

const Adoption = mongoose.model('Adoption', adoptionSchema);
export default Adoption;