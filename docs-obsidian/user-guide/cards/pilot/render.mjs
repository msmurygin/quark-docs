import {createRequire} from 'module';const require=createRequire('/opt/node22/lib/node_modules/');
const {chromium}=require('playwright');
const b=await chromium.launch();const p=await b.newPage({viewport:{width:560,height:794},deviceScaleFactor:2});
await p.goto('file://'+process.cwd()+'/card.html');await p.waitForTimeout(300);
await p.screenshot({path:'card.png',fullPage:true});
await p.pdf({path:'card.pdf',format:'A5',printBackground:true});
await b.close();
