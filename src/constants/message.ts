 const USERS_MESSAGE = {
  VALIDATION_ERROR:"Validation error",
  NAME_IS_REQUIRE: "Name is required",
  NAME_MUST_BE_A_STRING:"Name must be a string",
  NAME_LENGTH_MUST_BE_FROM_1_TO_100:"Name length must be from 1 to 100",
  EMAIL_IS_REQUIRED:"Email is required",
  EMAIL_IS_INVALID:"Email is invalid",
  EMAIL_ALREADY_EXISTS:"Email already exists",
  PASSWORD_MUST_BE_A_STRING:"Password must be a string",
  PASSWORD_IS_REQUIRED:"Password is required",
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50:"Password length must be from 6 to 50",
  PASSWORD_MUST_BE_STRONG:"Password must be from 6-50 character long and contain at least 1 lowercase,1 upercase,1 number, 1 special character",
  CONFIRM_PASSWORD_IS_REQUIRED:"Confirm Password is required",
  CONFIRM_PASSWORD_MUST_BE_A_STRING:"Confirm Password must be a string",
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50:"Confirm Password length must be from 6 to 50",
  CONFIRM_PASSWORD_MUST_BE_STRONG:"Confirm Password must be from 6-50 character long and contain at least 1 lowercase,1 upercase,1 number, 1 special character",
  CONFIRM_PASSWORD_MUST_BE_SAME_PASSWORD:"Confirm Password must be same password",
  DATE_OF_BIRTH_MUST_BE_ISO8601:"Date of birth must be ISO8601",
  USER_NOT_FOUND:"User not found",
  LOGIN_SUCCESS:"Login success",
  REGISTER_SUCCESS:"register success"
} as const
export default USERS_MESSAGE