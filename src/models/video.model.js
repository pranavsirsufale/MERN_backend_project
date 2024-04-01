import mongoose , { Schema} from 'mongoose';
import mongooseAggregatepaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema(
    {
        videoFile : {
            type : String, // cloudnary url 
            required  : true,

        },
        thumbnail : {
            type : String,
            required : true,
        },
        title : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true,
        },
        duration : {
            type : Number , // cloudnary 
            required : true,
        },
        views : {
            type : Number,
            default : 0
        },
        isPublished : {
            type : Boolean,
            default : true ,
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    },
    {
        timestamps : true
    }
)

videoSchema.plugin(mongooseAggregatepaginate)

export const Video = mongoose.model("Video", videoSchema)









