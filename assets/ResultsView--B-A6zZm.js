import{d as x,c as d,a as t,t as c,u as i,b as p,w as g,e as h,r as _,o as q,f as z}from"./index-DOmbNA3d.js";import{u as S}from"./useQuizStore-1OTETud6.js";const b={class:"select-none text-stone-50 text-center font-primary w-full flex flex-col justify-center align-center"},k={class:"text-6xl md:text-8xl font-thin mt-4 mb-2"},y={class:"text-sm md:text-md font-medium"},C={class:"bg-stone-600 hover:bg-amber-500 hover:text-black flex flex-col justify-self-center rounded-sm transition-all ease-in-out duration-150 text-center w-full mt-12"},P=x({__name:"ResultsView",props:{questionsList:{},quizCache:{}},setup(u){const r=u,s=S(),m=()=>{s.resetScoreTracker(),localStorage.removeItem(r.quizCache)},a=h(),l=localStorage.getItem(r.quizCache);if(l!==null){const n=JSON.parse(l);s.scoreTracker=n.quizProgress,n.quizProgress.reduce((o,f)=>(f!==null&&(o+=1),o),0)<r.questionsList.length&&a.push("/quiz")}else a.push("/");return(n,e)=>{const o=_("RouterLink");return q(),d("div",b,[e[1]||(e[1]=t("h3",{class:"text-lg md:text-2xl font-extrabold"},"Your Score",-1)),t("p",k,c(i(s).getScore()),1),t("p",y," You got "+c(i(s).getScorePercentage())+" of the questions correct ",1),t("nav",C,[p(o,{to:"/",class:"font-primary font-extrabold text-lg md:text-xl flex justify-center items-center py-3",onClick:m},{default:g(()=>e[0]||(e[0]=[t("span",{class:"material-symbols-outlined pe-2"}," refresh ",-1),z(" Retake Quiz")])),_:1})])])}}});export{P as default};
