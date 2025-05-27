import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  district: { type: String, required: true },
  police_station: { type: String, required: true },
  crime: { type: String, required: true },
  operated_by: { type: String, required: true },
  CNIC: { type: String, required: true, match: /^[0-9]{13}$/ },
  dens_location: { type: String, required: true },
  cell_number: { type: String, required: true },
  by_police: { 
    name: { type: String, default: '' },
    rank: { type: String, default: '' },
    posting: { type: String, default: '' },
  },
  by_political_person: {
  details: { type: String, default: '' },
  },
  by_others_private: {
    details: { type: String, default:'' },
  },
  status: { type: String, enum: ['Active', 'Inactive', 'Reactive'] },
  CRMS_No: { type: String, required: true },
  FIR: { 
    FIR_no: { type: String },
    FIR_year: { type: String },
    FIR_PS: { type: String },
    FIR_district: { type: String },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const RecordModel = mongoose.model('Record', recordSchema);
export default RecordModel;