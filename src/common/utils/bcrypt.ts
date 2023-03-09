/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

const hashedPassword = (password: string): string => {
    return bcrypt.hash(password, 10);
};

const comparePassword = (password: string, hash: string)=>{
    return bcrypt.compare(password, hash);
}

export { hashedPassword, comparePassword };