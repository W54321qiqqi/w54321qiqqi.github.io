import{_ as B}from"./index-8154a74e.js";import{_ as W}from"./index-ffa28cd9.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-51d02a91.js";import{F as C,_ as I}from"./index.vue_vue_type_script_setup_true_lang-b137c3ee.js";import{aL as N,l as g,f as t,p as O,at as R,a as z,i as $,o as F,z as M,t as l,s as m,x as h,q as S}from"./index-e04a4ec9.js";import{g as V,c as j}from"./index-8a3aa953.js";import"./useTagViewSetting-8bed25bb.js";import"./el-popper-181b51ae.js";import"./el-checkbox-821c4cfc.js";import"./index.vue_vue_type_script_setup_true_lang-223821d2.js";import"./el-tag-5b56d13f.js";import"./localeData-39cd8590.js";import"./index-81a8b74b.js";import"./index-1728ae7f.js";import"./icon-selector-c8c44143.js";import"./dropdown-e240ff06.js";const D=Symbol("watermark-dom"),w=(u=g(document.body))=>{const k=V(function(){const e=t(u);if(!e)return;const{clientHeight:o,clientWidth:c}=e;Object.assign(n.value,{width:c,height:o}),f()},200),r=D.toString(),a=N(),n=g({}),p=()=>{const e=t(a);a.value=void 0;const o=t(u);o&&(e&&o.removeChild(e),console.log("🚀 ~ file: useWatermark.ts:36 ~ clear ~ domId:",e))};function v(){const e=document.createElement("canvas"),o=t(n).step||1,c=t(n).value||"缺少水印值",s=t(n).color||"rgba(0,0,0,0.25)",d=t(n).size||"15px",_=200*o,b=140*o;Object.assign(e,{width:_,height:b});const i=e.getContext("2d");return i&&(i.rotate(-20*Math.PI/120),i.font=d+" Vedana",i.fillStyle=s,i.textAlign="left",i.textBaseline="middle",i.fillText(c,_/20,b)),e.toDataURL("image/png")}function f(){const e=t(a),o=t(n).value||"缺少水印值";e&&(t(n).width&&(e.style.width=`${t(n).width}px`),t(n).height&&(e.style.height=`${t(n).height}px`),o&&(e.style.background=`url(${v()}) left top repeat`))}const y=()=>{if(t(a))return f(),r;const e=document.createElement("div");a.value=e,e.id=r,e.style.pointerEvents="none",e.style.top="0px",e.style.left="0px",e.style.position="absolute",e.style.zIndex="100000";const o=t(u);if(!o)return r;const{clientHeight:c,clientWidth:s}=o;return Object.assign(n.value,{width:s,height:c}),f(),o.appendChild(e),r};function x(e){n.value=e,y(),j(u,k),R()&&O(()=>{p();debugger})}return{setWatermark:x,clear:p}},oe=z({__name:"index",setup(u){const k=g([{fieldName:"value",fieldDesc:"水印名字",fieldType:C.INPUT},{fieldName:"color",fieldDesc:"水印颜色",fieldType:C.COLOR}]),r=g(),a=$({value:"一个小瘪三"}),{setWatermark:n,clear:p}=w(),{setWatermark:v,clear:f}=w(r),y=()=>{n({value:a.value,color:a.color})},x=()=>{v({value:a.value,color:a.color})};return(e,o)=>{const c=I,s=T,d=W,_=B;return F(),M(_,{class:"overflow-hidden"},{default:l(()=>[m(d,{title:"页面水印"},{default:l(()=>[m(c,{columns:t(k),model:t(a),inline:"",colProps:{span:8}},null,8,["columns","model"]),m(s,{type:"primary",onClick:y},{default:l(()=>[h("创建水印")]),_:1}),m(s,{type:"primary",onClick:t(p)},{default:l(()=>[h("清除水印")]),_:1},8,["onClick"])]),_:1}),m(d,{title:"容器水印"},{default:l(()=>[S("div",{style:{height:"400px"},ref_key:"boxRef",ref:r},[m(s,{type:"primary",onClick:x},{default:l(()=>[h(" 创建水印 ")]),_:1}),m(s,{type:"primary",onClick:t(f)},{default:l(()=>[h("清除水印")]),_:1},8,["onClick"])],512)]),_:1})]),_:1})}}});export{oe as default};