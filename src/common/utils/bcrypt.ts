/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';


const comparePassword = (password: string, hash: string)=>{
    return bcrypt.compare(password, hash);
}

export { comparePassword };