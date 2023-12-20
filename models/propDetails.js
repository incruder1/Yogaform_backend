import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    propertyDetails:[{
      price: {
        type: String,
        required: true,
      },
      location: 
        [
          {
            address:{
              type:String,
              required:true,
            },
            city:{
              type:String,
              required:true,
            },
            country:{
              type:String,
              required:true,
              default:"India"
            }
            
          }],
      bedroom: {
        type: Number,
        required: true,
      },
      bathroom: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      type:{
        type:String,
        required:false
      },
      date:{
        type:String,
        required:false
      }

      // photo: {
      //   data: Buffer,
      //   contentType: String,
      // },
    }]
    },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
