import{_ as g}from"./index-8154a74e.js";import{_ as y}from"./index-ffa28cd9.js";import{_ as k}from"./index.vue_vue_type_script_setup_true_lang-51d02a91.js";import{a as C,o as $,z as v,t,s as n,f as a,cZ as x,x as s,c_ as c,c$ as w,d0 as b,d1 as B,d2 as l}from"./index-e04a4ec9.js";import"./useTagViewSetting-8bed25bb.js";import"./el-popper-181b51ae.js";const W=C({__name:"index",setup(N){const{success:p,warning:m,error:f,info:_}=B(),u=async()=>{await l("你好"),await l("很高兴遇见你"),await l("再见")};return(V,e)=>{const o=k,r=y,d=g;return $(),v(d,null,{default:t(()=>[n(r,{title:"函数触发message"},{default:t(()=>[n(o,{type:"info",onClick:e[0]||(e[0]=i=>a(x)("默认提示"))},{default:t(()=>[s(" 默认 ")]),_:1}),n(o,{type:"primary",onClick:e[1]||(e[1]=i=>a(c)("成功提示"))},{default:t(()=>[s(" 成功 ")]),_:1}),n(o,{type:"warning",onClick:e[2]||(e[2]=i=>a(w)("警告提示"))},{default:t(()=>[s(" 警告 ")]),_:1}),n(o,{type:"danger",onClick:e[3]||(e[3]=i=>a(b)("失败提示"))},{default:t(()=>[s(" 失败 ")]),_:1})]),_:1}),n(r,{title:"hook方式触发message"},{default:t(()=>[n(o,{type:"info",onClick:e[4]||(e[4]=i=>a(_)("默认提示"))},{default:t(()=>[s("默认")]),_:1}),n(o,{type:"primary",onClick:e[5]||(e[5]=i=>a(p)("成功提示"))},{default:t(()=>[s(" 成功 ")]),_:1}),n(o,{type:"warning",onClick:e[6]||(e[6]=i=>a(m)("警告提示"))},{default:t(()=>[s(" 警告 ")]),_:1}),n(o,{type:"danger",onClick:e[7]||(e[7]=i=>a(f)("失败提示"))},{default:t(()=>[s("失败")]),_:1})]),_:1}),n(r,{title:"多个确认框"},{default:t(()=>[n(o,{type:"primary",onClick:u},{default:t(()=>[s("点击弹出确认框")]),_:1})]),_:1})]),_:1})}}});export{W as default};