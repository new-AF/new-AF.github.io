import{j as r,m as N,e as A,d as b,L as S}from"./chunk-CRuJHMpD.js";import{S as $,M as C}from"./chunk-BNBiHF3T.js";/**
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
 */const x=(s,e)=>{const t=[],a=[];for(const i of s)(e(i)?t:a).push(i);return[t,a]},R=s=>{const e=n=>{const m=typeof n;if(n===!1)return{valid:!0,value:n};if(m==="string"){const g=n.trim();return g===""?{valid:!1,value:n,isString:!0,isValidString:!1}:{valid:!0,value:g,isString:!0,isValidString:!0}}return{valid:!1,value:n,isString:!1,valueType:m}},t=s.map(n=>e(n)),[a,i]=x(t,({valid:n})=>n===!0),[c]=x(a,({value:n})=>n!==!1);return{validArguments:c,invalidArguments:i}},E=({value:s,isString:e,valueType:t,isValidString:a},i)=>{if(e===!1)return`[${i}] Ignored non-string >${s}< (${t})`;if(a===!1)return`[${i}] Ignored empty string "${s}"`},I=(s,e,t)=>s.forEach(a=>{const i=E(a,e);console.warn(`${i}`)}),M=s=>s.map(({value:a})=>a).join(" "),V=s=>s===""?!1:s,o=(...s)=>{const{validArguments:e,invalidArguments:t}=R(s);I(t,"mergeClassNames");const a=M(e);return V(a)},h=({className:s,text:e,children:t})=>r.jsx("article",{className:N("text-xl","font-medium","grid","gap-y-[var(--spacing-sm)]","content-start","text-balance","lg:px-0",s),children:e||t}),k=()=>typeof window>"u"?!0:window.location.pathname==="/",H=s=>r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 320 512",...s,children:r.jsx("path",{d:"M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"})}),L=({className:s,text:e,image:t,imageAlt:a,to:i,options:c={svg:"/arrow-right-solid.svg"}})=>r.jsxs(S,{noUnderline:!0,to:i,className:o("font-semibold","text-md","w-full","flex","p-(--spacing-sm)","transition-all","hover:bg-(--bg-base-200)","group","my-transition","md:rounded-md","lg:w-[fit-content]",s),children:[r.jsx("span",{className:o("text-(--custom-color-accent)/90","group-hover:text-(--custom-color-accent)"),children:e}),r.jsx(H,{className:o("text-(--custom-color-accent)/90","group-hover:text-(--custom-color-accent)","inline-block","w-(--spacing-xs)","ms-2")})]}),U=({id:s,className:e,classes:t={listNotHome:o(),leftCard:o("rounded-tr-none","rounded-br-none"),rightCard:o("rounded-tl-none","rounded-bl-none")},beforeList:a,afterList:i,title:c,intro:n,limitCardCountOnHomePage:m,cards:g,children:w,moreObject:y})=>{const d=k(),u=(()=>{const l=g??w;return d&&A(m)&&Array.isArray(l)?l.slice(0,m):l})(),j=(()=>{if(!b(n)){if(Array.isArray(n)){const l=n.map(v=>r.jsx("p",{children:v}));return r.jsx(h,{children:l})}return r.jsx(h,{children:n})}})(),p=r.jsx("ul",{className:o("@container","grid","w-full","items-start","gap-x-(--spacing-lg)","gap-y-(--spacing-lg)","grid-flow-row","justify-items-center",d?!1:t.listNotHome),children:Array.isArray(u)?u.map((l,f)=>r.jsx("li",{className:o("contents"),children:l},`index - ${f}`)):u});return d?r.jsxs("div",{id:s,className:o("flex","flex-col","justify-center","gap-y-(--spacing-sm)","min-h-screen","snap-start","snap-always",e),children:[r.jsx(L,{...y,className:!1}),p]}):r.jsx($,{children:r.jsxs(C,{title:c,wrap:!0,className:o("justify-self-center","lg:w-7xl","lg:px-(--spacing-sm)",e),children:[r.jsxs("div",{className:o("px-(--spacing-sm)","lg:px-0"),children:[j,a]}),p,i]})})};export{U as S,o as m};
