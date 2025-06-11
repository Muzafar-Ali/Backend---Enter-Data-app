import { Document, Types } from "mongoose";

export type TRecord = {
  CNIC: string;
  CRMS_No?: string;
  FIR_PS_name?: string;
  FIR_district?: string;
  FIR_no?: string;
  FIR_year?: string;
  by_others?: string;
  by_police?: string;
  by_political_person?: string;
  category?: string;
  cell_number?: string;
  dens_location?: string;
  district?: string;
  operated_by?: string;
  police_station?: string;
  remarks?: string;
  status?: string;
  type_of_Narcotics?: string;

  user: Types.ObjectId;
};

export type TRecordDocument = TRecord & Document;