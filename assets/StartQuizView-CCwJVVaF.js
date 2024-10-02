import{d as f,c as m,a as c,t as u,u as h,b as g,w as x,e as _,r as q,o as b,f as v}from"./index-DOmbNA3d.js";const L={class:"flex flex-col justify-center items-center border-stone-50 border-4 rounded-md p-6 md:p-12"},z={id:"general-instructions",class:"font-primary font-semibold text-center text-md md:text-lg text-stone-50"},w={class:"bg-stone-600 hover:bg-amber-500 hover:text-black flex flex-col rounded transition-all ease-in-out duration-150 text-center md:w-1/3 w-1/2 mt-20"},y=f({__name:"StartQuizView",props:{questionsList:{},quizCache:{}},setup(r){const o=r,n=o.questionsList.reduce((t,e)=>{for(const s of e.topics)t.includes(s)||t.push(s);return t},[]),i=n.pop(),a=[n.join(", "),i].join(", and "),l=_(),d=localStorage.getItem(o.quizCache);if(d!==null){const e=JSON.parse(d).quizProgress.reduce((s,p)=>(p!==null&&(s+=1),s),0);e===o.questionsList.length?l.push("/results"):e<o.questionsList.length&&l.push("/quiz")}return(t,e)=>{const s=q("RouterLink");return b(),m("div",L,[c("header",null,[c("p",z," Answer the "+u(t.questionsList.length)+" question"+u(t.questionsList.length>1?"s":"")+" by choosing from the provided choices. Question topics include: "+u(h(a))+". ",1)]),c("nav",w,[g(s,{to:"/quiz",class:"font-primary font-extrabold text-lg md:text-xl items-stretch py-3"},{default:x(()=>e[0]||(e[0]=[v("Start")])),_:1})])])}}}),S=(r,o)=>{const n=r.__vccOpts||r;for(const[i,a]of o)n[i]=a;return n},C=S(y,[["__scopeId","data-v-cc338e63"]]);export{C as default};
