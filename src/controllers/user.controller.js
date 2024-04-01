import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from '../utils/ApiResponse.js'


const generateAccessAndRefreshToken = async (userId)=>{
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})

    return { accessToken, refreshToken }


  } catch (error) {
    throw new ApiError(500,'something went wrong while generating refresh and access token')
  }
}




const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "hello from pranav 👋 ",
  // });

  //todo 1> get user details from frontend
  //todo 2> validation - not empty
  //todo 3> check if user already exists : username , email
  //todo 4> check for images, check for avatar
  //todo 5> upload them to cloudinary , avatar
  //todo 6> create user object - create an entry in db
  //todo 7> remove password and refresh token filed from response
  //todo 8> check for user creation
  //todo 9> return res

  const { fullname, email, username, password } = req.body;
  // console.log("email : ", email);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required !");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, " User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath 
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
    coverImageLocalPath = req.files.coverImage[0]
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avata Image is required ");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "AVATARE FILE IS REQUIRED ");
  }

  const user = await User.create({
    fullname ,
    avatar : avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500,'Something Went Wrong While Registering the User ')
  }

  return  res.status(201).json(
    new ApiResponse(200, createdUser , "User has been registerd ✅✅😎")
  )

});


const loginUser = asyncHandler( async (req,res)=>{
  //todo 1> req body -> data 
  //todo 2> username or email
  //todo 3> find the user 
  //todo 4> password check 
  //todo 5> access and refresh token 
  //todo 6> send cookies 

  const { email, username , password } = req.body
  if( !email || !username){
    throw new ApiError(400,"username or email is required ")
  };

  const user = await User.findOne({
    $or: [{username} , {email}]
  });

  if(!user){
    throw new ApiError(404, "User does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)
  
  if(!isPasswordValid){
    throw new ApiError(401,"Invalid Passwrod ")
  };


  const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id)

  





  
})

export { registerUser };
