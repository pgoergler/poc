import{c as r}from"./index-BPf4aqqw.js";import{u as n}from"./WorkflowDocument-BZF0MhPB.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],y=r("download",l);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],f=r("file-text",h);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],k=r("plus",u);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],M=r("trash-2",p);class R{exportToFile(o,s){try{const t=JSON.stringify(o,null,2),c=new Blob([t],{type:"application/json"}),a=URL.createObjectURL(c),e=window.document.createElement("a");return e.href=a,e.download=s||`workflow-${Date.now()}.json`,e.click(),URL.revokeObjectURL(a),{success:!0}}catch(t){return{success:!1,error:{code:"STORAGE_ERROR",message:"Failed to export file",details:t}}}}importFromFile(){return new Promise(o=>{const s=window.document.createElement("input");s.type="file",s.accept=".json",s.onchange=async t=>{var a;const c=(a=t.target.files)==null?void 0:a[0];if(!c){o({success:!1,error:{code:"NOT_FOUND",message:"No file selected"}});return}try{const e=await c.text(),d=JSON.parse(e);o({success:!0,document:d})}catch(e){o({success:!1,error:{code:"PARSE_ERROR",message:"Failed to parse file",details:e}})}},s.oncancel=()=>{o({success:!1,error:{code:"NOT_FOUND",message:"File selection cancelled"}})},s.click()})}}function T(){const i=n(e=>e.showToast),o=n(e=>e.showSuccess),s=n(e=>e.showError),t=n(e=>e.showInfo),c=n(e=>e.showWarning),a=n(e=>e.dismissToast);return{showToast:i,showSuccess:o,showError:s,showInfo:t,showWarning:c,dismissToast:a}}export{y as D,R as F,k as P,M as T,f as a,T as u};
