function q(){}function F(t,n){for(const e in n)t[e]=n[e];return t}function B(t){return t()}function C(){return Object.create(null)}function p(t){t.forEach(B)}function H(t){return typeof t=="function"}function lt(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let g;function ct(t,n){return g||(g=document.createElement("a")),g.href=n,t===g.href}function I(t){return Object.keys(t).length===0}function ut(t,n,e,i){if(t){const r=T(t,n,e,i);return t[0](r)}}function T(t,n,e,i){return t[1]&&i?F(e.ctx.slice(),t[1](i(n))):e.ctx}function ot(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const a=[],l=Math.max(n.dirty.length,r.length);for(let o=0;o<l;o+=1)a[o]=n.dirty[o]|r[o];return a}return n.dirty|r}return n.dirty}function at(t,n,e,i,r,a){if(r){const l=T(n,e,i,a);t.p(l,r)}}function ft(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let w=!1;function G(){w=!0}function J(){w=!1}function W(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function K(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let u=0;u<n.length;u++){const s=n[u];s.claim_order!==void 0&&c.push(s)}n=c}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let c=0;c<n.length;c++){const u=n[c].claim_order,s=(r>0&&n[e[r]].claim_order<=u?r+1:W(1,r,y=>n[e[y]].claim_order,u))-1;i[c]=e[s]+1;const f=s+1;e[f]=c,r=Math.max(f,r)}const a=[],l=[];let o=n.length-1;for(let c=e[r]+1;c!=0;c=i[c-1]){for(a.push(n[c-1]);o>=c;o--)l.push(n[o]);o--}for(;o>=0;o--)l.push(n[o]);a.reverse(),l.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<l.length;c++){for(;u<a.length&&l[c].claim_order>=a[u].claim_order;)u++;const s=u<a.length?a[u]:null;t.insertBefore(l[c],s)}}function Q(t,n){if(w){for(K(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function st(t,n,e){w&&!e?Q(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function R(t){t.parentNode.removeChild(t)}function _t(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function U(t){return document.createElement(t)}function A(t){return document.createTextNode(t)}function dt(){return A(" ")}function ht(){return A("")}function mt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function pt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function V(t){return Array.from(t.childNodes)}function X(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function L(t,n,e,i,r=!1){X(t);const a=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const o=t[l];if(n(o)){const c=e(o);return c===void 0?t.splice(l,1):t[l]=c,r||(t.claim_info.last_index=l),o}}for(let l=t.claim_info.last_index-1;l>=0;l--){const o=t[l];if(n(o)){const c=e(o);return c===void 0?t.splice(l,1):t[l]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,o}}return i()})();return a.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,a}function Y(t,n,e,i){return L(t,r=>r.nodeName===n,r=>{const a=[];for(let l=0;l<r.attributes.length;l++){const o=r.attributes[l];e[o.name]||a.push(o.name)}a.forEach(l=>r.removeAttribute(l))},()=>i(n))}function yt(t,n,e){return Y(t,n,e,U)}function Z(t,n){return L(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>A(n),!0)}function gt(t){return Z(t," ")}function xt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function bt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}let m;function h(t){m=t}function O(){if(!m)throw new Error("Function called outside component initialization");return m}function $t(t){O().$$.on_mount.push(t)}function wt(t){O().$$.after_update.push(t)}const d=[],k=[],b=[],M=[],P=Promise.resolve();let v=!1;function z(){v||(v=!0,P.then(D))}function Et(){return z(),P}function N(t){b.push(t)}const E=new Set;let x=0;function D(){const t=m;do{for(;x<d.length;){const n=d[x];x++,h(n),tt(n.$$)}for(h(null),d.length=0,x=0;k.length;)k.pop()();for(let n=0;n<b.length;n+=1){const e=b[n];E.has(e)||(E.add(e),e())}b.length=0}while(d.length);for(;M.length;)M.pop()();v=!1,E.clear(),h(t)}function tt(t){if(t.fragment!==null){t.update(),p(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}const $=new Set;let _;function vt(){_={r:0,c:[],p:_}}function Nt(){_.r||p(_.c),_=_.p}function nt(t,n){t&&t.i&&($.delete(t),t.i(n))}function At(t,n,e,i){if(t&&t.o){if($.has(t))return;$.add(t),_.c.push(()=>{$.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function St(t){t&&t.c()}function jt(t,n){t&&t.l(n)}function et(t,n,e,i){const{fragment:r,on_mount:a,on_destroy:l,after_update:o}=t.$$;r&&r.m(n,e),i||N(()=>{const c=a.map(B).filter(H);l?l.push(...c):p(c),t.$$.on_mount=[]}),o.forEach(N)}function it(t,n){const e=t.$$;e.fragment!==null&&(p(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function rt(t,n){t.$$.dirty[0]===-1&&(d.push(t),z(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Ct(t,n,e,i,r,a,l,o=[-1]){const c=m;h(t);const u=t.$$={fragment:null,ctx:null,props:a,update:q,not_equal:r,bound:C(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(c?c.$$.context:[])),callbacks:C(),dirty:o,skip_bound:!1,root:n.target||c.$$.root};l&&l(u.root);let s=!1;if(u.ctx=e?e(t,n.props||{},(f,y,...S)=>{const j=S.length?S[0]:y;return u.ctx&&r(u.ctx[f],u.ctx[f]=j)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](j),s&&rt(t,f)),y}):[],u.update(),s=!0,p(u.before_update),u.fragment=i?i(u.ctx):!1,n.target){if(n.hydrate){G();const f=V(n.target);u.fragment&&u.fragment.l(f),f.forEach(R)}else u.fragment&&u.fragment.c();n.intro&&nt(t.$$.fragment),et(t,n.target,n.anchor,n.customElement),J(),D()}h(c)}class kt{$destroy(){it(this,1),this.$destroy=q}$on(n,e){const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!I(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{Et as A,Q as B,ut as C,at as D,ft as E,ot as F,_t as G,ct as H,mt as I,p as J,kt as S,dt as a,st as b,gt as c,Nt as d,ht as e,nt as f,vt as g,R as h,Ct as i,wt as j,U as k,yt as l,V as m,q as n,$t as o,pt as p,bt as q,A as r,lt as s,At as t,Z as u,xt as v,St as w,jt as x,et as y,it as z};