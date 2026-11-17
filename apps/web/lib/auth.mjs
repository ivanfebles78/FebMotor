import {randomBytes,scryptSync,timingSafeEqual,createHash} from 'node:crypto';
export const token=()=>randomBytes(32).toString('hex');
export const hashToken=t=>createHash('sha256').update(t).digest('hex');
export function passwordHash(password){const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(password,salt,64).toString('hex');}
export function passwordValid(password,stored){try{const [salt,hash]=stored.split(':');return timingSafeEqual(Buffer.from(hash,'hex'),scryptSync(password,salt,64));}catch{return false;}}
export function publicUser(u){const {passwordHash,...safe}=u;return safe;}
