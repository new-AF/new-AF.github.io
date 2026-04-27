import{j as m,m as g}from"./chunk-Clv6YUs4.js";/**
 * mergeClassNames - A straightforward utility for merging CSS class names in React + Tailwind, and other JavaScript projects.
 *
 * @license AGPL-3.0
 * Copyright (C) 2025 Abdullah Fatota
 *
 * Example usage:
 * import { mergeClassNames } from "simple-merge-class-names";
 *
 * function MyComponent() {
 *   return (
 *     <div
 *       className={mergeClassNames(
 *         "app",
 *         "min-h-dvh",
 *         "grid",
 *         "grid-rows-[auto_1fr_auto]",
 *         "outline"
 *       )}
 *     >
 *       Hello, world!
 *     </div>
 *   );
 * }
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */const c=(s,t)=>{const e=[],r=[];for(const a of s)(t(a)?e:r).push(a);return[e,r]},u=s=>{const t=n=>{const o=typeof n;if(n===!1)return{valid:!0,value:n};if(o==="string"){const l=n.trim();return l===""?{valid:!1,value:n,isString:!0,isValidString:!1}:{valid:!0,value:l,isString:!0,isValidString:!0}}return{valid:!1,value:n,isString:!1,valueType:o}},e=s.map(n=>t(n)),[r,a]=c(e,({valid:n})=>n===!0),[i]=c(r,({value:n})=>n!==!1);return{validArguments:i,invalidArguments:a}},f=({value:s,isString:t,valueType:e,isValidString:r},a)=>{if(t===!1)return`[${a}] Ignored non-string >${s}< (${e})`;if(r===!1)return`[${a}] Ignored empty string "${s}"`},d=(s,t,e)=>s.forEach(r=>{const a=f(r,t);console.warn(`${a}`)}),p=s=>s.map(({value:r})=>r).join(" "),x=s=>s===""?!1:s,y=(...s)=>{const{validArguments:t,invalidArguments:e}=u(s);d(e,"mergeClassNames");const r=p(t);return x(r)},$=({className:s,text:t,children:e})=>m.jsx("article",{className:g("text-xl","font-medium","grid","gap-y-[var(--spacing-sm)]","content-start","text-balance","lg:px-0",s),children:t||e});export{$ as I,y as m};
