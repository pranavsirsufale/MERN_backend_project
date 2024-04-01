import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'

const registerUser = asyncHandler( async ( req, res )=>{
    res.status(200)
    .json({
        message : "hello from pranav 👋 "
    })

    //todo 1> get user details from frontend
    //todo 2> validation - not empty 
    //todo 3> check if user already exists : username , email
    //todo 4> check for images, check for avatar 
    //todo 5> upload them to cloudinary , avatar 
    //todo 6> create user object - create an entry in db
    //todo 7> remove password and refresh token filed from response
    //todo 8> check for user creation 
    //todo 9> return res

    const {fullname , email, username , password } = req.body
    console.log("email : ", email );

   if(
    [fullname , email,username , password].some((field)=>
    field?.trim() === ""
    )
   ){
    throw new ApiError(400, "All fields are required !")
   }

})


export { registerUser }






