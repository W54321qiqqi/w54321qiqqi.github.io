import{_ as y}from"./index-8154a74e.js";import{_ as T}from"./index-ffa28cd9.js";import{_ as b}from"./index.vue_vue_type_script_setup_true_lang-51d02a91.js";import{cf as c,a as g,o as k,z as h,t as e,s,x as o}from"./index-e04a4ec9.js";import"./useTagViewSetting-8bed25bb.js";import"./el-popper-181b51ae.js";const C=t=>c.get("/test/getTest",t),A=t=>c.post("/test/postTest",t,{successMessage:!0}),x=t=>c.put("/test/putTest",t),w=t=>c.delete("/test/deleteTest",t,{errorMessage:!1}),l=t=>c.get("/test/sameTest",t,{cancelSame:!0}),B=t=>c.get("/test/retryTest",t,{isRetry:!0}),D=g({__name:"index",setup(t){const n=async()=>{await C()},p=async()=>{await A()},r=async()=>{await x()},_=async()=>{await w()},m=async()=>{n(),setTimeout(()=>{n()},100),setTimeout(()=>{n()},200),setTimeout(()=>{n()},300),setTimeout(()=>{n()},400)},u=()=>{l(),l(),l(),l(),l()},d=()=>{B()};return(M,N)=>{const a=b,i=T,f=y;return k(),h(f,null,{default:e(()=>[s(i,{title:"基础示例(请打开f12查看network)"},{default:e(()=>[s(a,{type:"primary",onClick:n,class:"mb-5"},{default:e(()=>[o(" 触发一个get请求(默认成功不会提示) ")]),_:1}),s(a,{type:"primary",onClick:p,class:"mb-5"},{default:e(()=>[o(" 触发一个post请求(成功会提示) ")]),_:1}),s(a,{type:"primary",onClick:r,class:"mb-5"},{default:e(()=>[o(" 触发一个put请求(默认失败会提示) ")]),_:1}),s(a,{type:"primary",onClick:_,class:"mb-5"},{default:e(()=>[o(" 触发一个delete请求(失败不会提示) ")]),_:1})]),_:1}),s(i,{title:"所有接口请求完成才会关闭loading"},{default:e(()=>[s(a,{type:"primary",onClick:m,class:"mb-5"},{default:e(()=>[o(" 点击进行触发请求 ")]),_:1})]),_:1}),s(i,{title:"取消重复请求"},{default:e(()=>[s(a,{type:"primary",onClick:u,class:"mb-5"},{default:e(()=>[o(" 触发5个重复请求 ")]),_:1})]),_:1}),s(i,{title:"请求错误重试"},{default:e(()=>[s(a,{type:"primary",onClick:d,class:"mb-5"},{default:e(()=>[o(" 错误后会重新请求三次 ")]),_:1})]),_:1})]),_:1})}}});export{D as default};