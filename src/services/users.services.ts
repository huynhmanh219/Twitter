import { RegisterRequestBody } from "../models/requests/User.requests";
import databaseService from "./database.service"
import User from "../models/Schema/User.schema";
import { passwordHash } from "../utils/crypto";
import { signToken } from "../utils/jwt";
import { TokenType } from "../constants/enums";

class UsersService{
  private async signAccessToken(userId:string)
  {
    return await signToken({
      payload:{
        userId,
        token_type:TokenType.AccessToken
      },
      options:{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as any
      }
    });
  }
  private async signRefreshToken(userId:string)
  {
    return await signToken({
      payload:{
        userId,
        token_type:TokenType.RefreshToken
      },
      options:{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as any
      }
    })
  }
  async signAccessAndRefreshToken(user_id:string){
     return Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
  }

  async register(payload:RegisterRequestBody)
  {
    const result = await databaseService.users.insertOne(new User({
      ...payload,
      date_of_birth:new Date(payload.date_of_birth),
      password:passwordHash(payload.password),
    }))
    const user_id = result.insertedId.toString();

    const [access_token,refresh_token] = await this.signAccessAndRefreshToken(user_id);
   
    
    return {
      access_token,
      refresh_token}
  }

  async checkEmailExist(email:string):Promise<boolean | null>{
    const emailExist = await databaseService.users.findOne({email})
    return Boolean(emailExist)
  }

  async login(user_id:string){
    const [access_token,refresh_token] = await this.signAccessAndRefreshToken(user_id);
   
    return {
      access_token,
      refresh_token}
  }

}


const usersService = new UsersService()
export default usersService