/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

const comparePassword = (password: string, hash: string) => {
    return  bcrypt.compareSync(password, hash);
};

export { comparePassword };

