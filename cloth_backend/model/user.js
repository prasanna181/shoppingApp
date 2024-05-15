import mongoose, { trusted } from 'mongoose';

const userSchema=mongoose.Schema({
    Category:{
        type:String,
        required:true,
        default:'Shirts'
    },


    Brands:{
        type:String,
        required:true,
        default:"PUMA"
    },
    Price:{
        type:Number,
        required:true,
        default:1000
    },
    Size:{
      type:Array,
      required:true,
      default:['M','L','XL']
    },
    Discount:{
        type:Number,
        required:true,
        default:70
    },
    Color:{
        type:Array,
        required:true,
        default:['red','blue','green']
    },
      CategoryType:{
        type:String,
        required:true,
        default:''
    },
    Image:{
         type:Array,
        required:true,
        default:['img_1_1.jpg']
    },
    Likes:{
        type:Number,
        default:1
    },
    Views:{
        type:Number,
        default:0
    }
    
})

const user=mongoose.model('user',userSchema);

// user.insertOne({Category:"shirts",Brands:[0]});


export default user;