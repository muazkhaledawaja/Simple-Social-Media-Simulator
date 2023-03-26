/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

const hashPassword = (password:string,salt:number)=>{
return bcrypt.hashSync(password,salt)
}

const comparePassword = (password: string, hash: string) => {
    return  bcrypt.compareSync(password, hash);
};

export { comparePassword ,hashPassword};

