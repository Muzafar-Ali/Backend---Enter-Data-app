import { z } from "zod"

export const recordSchema = z.object({
  body: z.object({
    category: z.string({
      required_error: "Category is required",
    }),
    district: z.string({
      required_error: "District is required",
    }),
    
    police_station: z.string({
      required_error: "Police Station is required",
    }),
    
    crime: z.string({
      required_error: "Crime is required",
    }),
    
    operated_by: z.string({
      required_error: "Operated By is required",
    }),
    
    CNIC: z.string({
      required_error: "CNIC is required",
    })
    .min(13, "CNIC must be 13 digits")
    .max(13, "CNIC must be 13 digits")
    .regex(/^[0-9]{13}$/),

    dens_location: z.string({
      required_error: "Dens Location is required",
    }),

    cell_number: z.string({
      required_error: "Cell Number is required",
    }),
    
    by_police: z.object({
      name: z.string({
        required_error: "by_police field name is required",
      }).default(''),
      rank: z.string({
        required_error: "by_police field Rank is required",
      }).default(''),
      posting: z.string({
        required_error: "by_police field Posting is required",
      }).default(''),
    }).optional(),

    by_political_person: z.object({
      details: z.string({
        required_error: "by Political Person Details is required",
      }).default(''),
    }).optional(),

    by_others_private: z.object({
      details: z.string({
        required_error: "By Others Private Details is required",
      }).default(''),
    }).optional(),

    status: z.enum(
      ['Active', 'Inactive', 'Reactive'], 
      { required_error: "Status is required" }
    ),

    CRMS_No: z.string({
      required_error: "CRMS No is required",
    }),

    FIR: z.object({
      FIR_no: z.string({
        required_error: "FIR No is required",
      }),
      FIR_year: z.string({
        required_error: "FIR Year is required",
      }),
      FIR_PS: z.string({
        required_error: "FIR PS is required",
      }),
      FIR_district: z.string({
        required_error: "FIR District is required",
      }),
    }, {
      required_error: "FIR is required",
    }).optional()

  })  
})

export const recordUpdateSchema = z.object({
  body: z.object({
    district: z.string().optional(),

    police_station: z.string().optional(),

    crime: z.string().optional(),

    operated_by: z.string().optional(),

    CNIC: z.string()
    .min(13, "CNIC must be 13 digits")
    .max(13, "CNIC must be 13 digits")
    .regex(/^[0-9]{13}$/)
    .optional(),

    dens_location: z.string().optional(),

    cell_number: z.string().optional(),

    by_police: z.object({
      name: z.string().optional(),
      rank: z.string().optional(),
      posting: z.string().optional(),
    }).optional(),

    by_political_person: z.object({
      details: z.string().optional(),
    }).optional(),

    by_others_private: z.object({
      details: z.string().optional(),
    }).optional(),

    status: z.enum(['Active', 'Inactive', 'Reactive']).optional(),

    CRMS_No: z.number().optional(),

    FIR: z.object({
      FIR_No: z.number().optional(),
      FIR_year: z.number().optional(),
      FIR_PS: z.string().optional(),
      FIR_district: z.string().optional(),
    }).optional()

  })
});

export type RecordInputType = z.infer<typeof recordSchema>;
export type RecordUpdateInputType = z.infer<typeof recordUpdateSchema>;
