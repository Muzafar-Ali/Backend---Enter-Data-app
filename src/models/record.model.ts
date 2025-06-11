import mongoose from "mongoose";
import { TRecordDocument } from "../types/record.types";

const recordSchema = new mongoose.Schema<TRecordDocument>(
  {
    CNIC: {
      type: String,
      required: true,
      match: /^[0-9]{13}$/,
      minlength: 13,
      maxlength: 13,
    },
    CRMS_No: { type: String },
    FIR_PS_name: { type: String },
    FIR_district: { type: String },
    FIR_no: { type: String },
    FIR_year: { type: String },
    by_others: { type: String },
    by_police: { type: String },
    by_political_person: { type: String },
    category: { type: String },
    cell_number: { type: String },
    dens_location: { type: String },
    district: { type: String },
    operated_by: { type: String },
    police_station: { type: String },
    remarks: { type: String },
    status: { type: String },
    type_of_Narcotics: { type: String },

    // Keep user reference (assuming it's for internal tracking)
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

const RecordModel = mongoose.model<TRecordDocument>("Record", recordSchema);
export default RecordModel;