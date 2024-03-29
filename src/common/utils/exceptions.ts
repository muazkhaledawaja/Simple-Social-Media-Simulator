/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import {ERRORS}from '../constants';

const EXCEPTIONS = {
  USER_NOT_FOUND: () => {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: ERRORS.USER.NOT_FOUND,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  LOGIN_ERROR: () => {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: ERRORS.USER.INCORRECT_DATA
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  USER_ALREADY_EXIST: () => {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: ERRORS.USER.ALREADY_EXISTS,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  USER_NOT_AUTHORIZED: () => {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: ERRORS.USER.NOT_AUTHORIZED,
      },
      HttpStatus.BAD_REQUEST,
    );
  },

  PASSWORD_INCORRECT: () => {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: ERRORS.USER.INCORRECT_DATA,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
};

export { EXCEPTIONS };
