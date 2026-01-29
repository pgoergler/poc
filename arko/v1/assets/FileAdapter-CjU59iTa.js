import{c as r}from"./index-CVjwGzJs.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],p=r("plus",l);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],h=r("trash-2",i),m=7;class f{exportToFile(s,e){try{const c=JSON.stringify(s,null,2),a=new Blob([c],{type:"application/json"}),o=URL.createObjectURL(a),t=window.document.createElement("a");return t.href=o,t.download=e||`workflow-${Date.now()}.json`,t.click(),URL.revokeObjectURL(o),{success:!0}}catch(c){return{success:!1,error:{code:"STORAGE_ERROR",message:"Failed to export file",details:c}}}}importFromFile(){return new Promise(s=>{const e=window.document.createElement("input");e.type="file",e.accept=".json",e.onchange=async c=>{var o;const a=(o=c.target.files)==null?void 0:o[0];if(!a){s({success:!1,error:{code:"NOT_FOUND",message:"No file selected"}});return}try{const t=await a.text(),n=JSON.parse(t);s({success:!0,document:n})}catch(t){s({success:!1,error:{code:"PARSE_ERROR",message:"Failed to parse file",details:t}})}},e.oncancel=()=>{s({success:!1,error:{code:"NOT_FOUND",message:"File selection cancelled"}})},e.click()})}}export{m as C,f as F,p as P,h as T};
