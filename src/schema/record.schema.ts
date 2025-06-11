import { z } from "zod"

export const recordSchema = z.object({
  body: z.object({
    CNIC: z.string({
      required_error: "CNIC is required",
    })
    .min(13, "CNIC must be 13 digits")
    .max(13, "CNIC must be 13 digits")
    .regex(/^[0-9]{13}$/),

    // All other fields are optional strings
    CRMS_No: z.string().optional(),
    FIR_PS_name: z.string().optional(),
    FIR_district: z.string().optional(),
    FIR_no: z.string().optional(),
    FIR_year: z.string().optional(),
    by_others: z.string().optional(),
    by_police: z.string().optional(),
    by_political_person: z.string().optional(),
    category: z.string().optional(),
    cell_number: z.string().optional(),
    dens_location: z.string().optional(),
    district: z.string().optional(),
    operated_by: z.string().optional(),
    police_station: z.string().optional(),
    remarks: z.string().optional(),
    status: z.string().optional(),
    type_of_Narcotics: z.string().optional()
  })  
})

export const recordUpdateSchema = z.object({
  body: z.object({
    CNIC: z.string()
      .min(13, "CNIC must be 13 digits")
      .max(13, "CNIC must be 13 digits")
      .regex(/^[0-9]{13}$/)
      .optional(),

    // All other fields are optional strings
    CRMS_No: z.string().optional(),
    FIR_PS_name: z.string().optional(),
    FIR_district: z.string().optional(),
    FIR_no: z.string().optional(),
    FIR_year: z.string().optional(),
    by_others: z.string().optional(),
    by_police: z.string().optional(),
    by_political_person: z.string().optional(),
    category: z.string().optional(),
    cell_number: z.string().optional(),
    dens_location: z.string().optional(),
    district: z.string().optional(),
    operated_by: z.string().optional(),
    police_station: z.string().optional(),
    remarks: z.string().optional(),
    status: z.string().optional(),
    type_of_Narcotics: z.string().optional()
  })
})

export type RecordInputType = z.infer<typeof recordSchema>;
export type RecordUpdateInputType = z.infer<typeof recordUpdateSchema>;