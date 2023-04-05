/* eslint-disable prettier/prettier */
export const ERRORS = {
  USER: {
    ALREADY_EXISTS: 'There is already a user registered with this Email or Username.',
    NOT_FOUND: 'The requested user could not be found.',
    INCORRECT_DATA: 'The provided user data is inaccurate.',
    NOT_AUTHORIZED: 'User not authorized',
    BLOCKED: 'User is blocked',
    CANNOT_SEND_FRIEND_REQUEST: 'User cannot send friend request',
    ALREADY_FRIEND: 'User is already friend',
    ALREADY_SENT_FRIEND_REQUEST: 'User already sent friend request',
    ALREADY_RECEIVED_FRIEND_REQUEST: 'User already received friend request',
  },
  POST: {
    NOT_FOUND: 'The requested post could not be found.',
  },
  PASSWORD: {
    VALIDATION_ERROR: 'For a valid password, it must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.',
  },
  COMMENT: {
    NOT_FOUND: 'The requested comment could not be found.',

  }
};
export const SUCCESS = {
  USER_CREATED: 'User created successfully.',
  POST_CREATED: 'Post created successfully.',
  COMMENT_CREATED: 'Comment created successfully.',
  FRIEND_REQUEST_SENT: 'Friend request sent successfully.',
  FRIEND_REQUEST_ACCEPTED: 'Friend request accepted successfully.',
};
