import {spawn} from 'node:child_process';
const args=process.argv.slice(2);const value=(name,fallback)=>{const i=args.indexOf(name);return i<0?fallback:args[i+1]};
const child=spawn(process.execPath,['../../node_modules/next/dist/bin/next','dev','--hostname',value('--host','0.0.0.0'),'--port',value('--port',process.env.PORT||'3000')],{cwd:new URL('../apps/web/',import.meta.url),stdio:'inherit',env:process.env});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));child.on('exit',code=>process.exit(code||0));
