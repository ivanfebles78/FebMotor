import {verify,randomUUID} from 'node:crypto';
import {assert} from '../../../packages/domain/index.mjs';
import {publicUser} from './auth.mjs';

// Provisioning requires a signed, short-lived instruction. Public registration
// never accepts superadmin, and a completed bootstrap can never overwrite it.
export function verifyProvisioning(envelope,publicKey,audience,now=Date.now()){
 assert(envelope&&typeof envelope.payload==='string'&&envelope.payload.length<5000&&typeof envelope.signature==='string'&&envelope.signature.length<200,'Solicitud de alta inválida',403);
 let valid=false;try{valid=verify(null,Buffer.from(envelope.payload),publicKey,Buffer.from(envelope.signature,'base64url'));}catch{}
 assert(valid,'Firma de aprovisionamiento inválida',403);
 let claims;try{claims=JSON.parse(envelope.payload)}catch{assert(false,'Solicitud de alta inválida',403)}
 assert(claims.purpose==='febmotor:first-superadmin'&&claims.audience===audience,'Destino de aprovisionamiento inválido',403);
 assert(Number.isFinite(claims.expiresAt)&&claims.expiresAt>now&&claims.expiresAt<=now+60*60*1000,'Solicitud de alta caducada',403);
 assert(claims.username==='superadmin'&&claims.email==='superadmin@febmotor.invalid'&&typeof claims.name==='string'&&claims.name.length<=100,'Identidad de aprovisionamiento inválida',403);
 assert(/^[a-f0-9]{32}:[a-f0-9]{128}$/.test(claims.passwordHash),'Hash de contraseña inválido',403);
 return claims;
}
export function provisionFirstSuperadmin(state,claims){
 assert(!state.users.some(u=>u.role==='superadmin'),'El superadmin ya está configurado',409);
 assert(!state.users.some(u=>u.username===claims.username||u.email===claims.email),'La identidad reservada ya existe',409);
 const user={id:randomUUID(),username:claims.username,email:claims.email,name:claims.name,role:'superadmin',centerIds:[],passwordHash:claims.passwordHash};
 state.users.push(user);
 state.audit.push({id:randomUUID(),userId:user.id,actorRole:'superadmin',action:'platform.superadmin.provisioned',entityId:user.id,at:new Date().toISOString()});
 return publicUser(user);
}
