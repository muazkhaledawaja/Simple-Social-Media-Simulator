/* eslint-disable prettier/prettier */
export const ERRORS = {
  USER_ALREADY_EXISTS: 'There is already a user registered with this Email or Username.',
  USER_NOT_FOUND: 'The requested user could not be found.',
  INCORRECT_DATA: 'The provided user data is inaccurate.',
  POST_NOT_FOUND: 'The requested post could not be found.',
  PASSWORD_VALIDATION_ERROR:
    'For a valid password, it must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.',
  COMMENT_NOT_FOUND: 'The requested comment could not be found.',
  USER_NOT_AUTHORIZED:"User not authorized",
  USER_BLOCKED:"User is blocked",
  USER_CANNOT_SEND_FRIEND_REQUEST:"User cannot send friend request",
  USER_ALREADY_FRIEND:"User is already friend",
  USER_ALREADY_SENT_FRIEND_REQUEST:"User already sent friend request",
  USER_ALREADY_RECEIVED_FRIEND_REQUEST:"User already received friend request",
  INTERNAL_SERVER_ERROR: 'Internal server error',

};
export const SUCCESS = {};
