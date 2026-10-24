window.__ModuleLoader__.load({
  id: "@local/dsh-commit-message",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
"use strict";var Ce=Object.create;var z=Object.defineProperty;var Re=Object.getOwnPropertyDescriptor;var Ne=Object.getOwnPropertyNames;var Te=Object.getPrototypeOf,Se=Object.prototype.hasOwnProperty;var Ae=(t,r)=>{for(var n in r)z(t,n,{get:r[n],enumerable:!0})},Q=(t,r,n,e)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of Ne(r))!Se.call(t,i)&&i!==n&&z(t,i,{get:()=>r[i],enumerable:!(e=Re(r,i))||e.enumerable});return t};var Le=(t,r,n)=>(n=t!=null?Ce(Te(t)):{},Q(r||!t||!t.__esModule?z(n,"default",{value:t,enumerable:!0}):n,t)),Fe=t=>Q(z({},"__esModule",{value:!0}),t);var at={};Ae(at,{apply:()=>le,inject:()=>ne});module.exports=Fe(at);var l=Le(require("react"),1),a=l.createElement,S="dshCommitMessage",ee="/__dsh/commit-message",D="source-control",O="@local/dsh-commit-message",Pe="source-control-diff",X="@local/dsh-commit-message/diff",te={title:"Source control",messageLabel:"Commit message",messagePlaceholder:'Message ({key} to commit on "{branch}")',changes:"Changes",showChanges:"Show changes in {path}",openChangesFailed:"Could not open the changes for {path}.",diffTab:"Changes: {name}",diffLoading:"Loading changes\u2026",diffFailed:"Could not load the changes for this file.",diffRetry:"Retry",diffEmpty:"No textual changes to show.",diffBinary:"This is a binary file; the changes are not shown.",diffTruncated:"The diff is truncated.",diffOpenFile:"Open file",diffOpenFileAria:"Open {path} in the file viewer",diffRefreshAria:"Refresh the changes for this file",diffAdded:"{count} added",diffRemoved:"{count} removed",showPanel:"Toggle source control panel",generate:"Generate",generating:"Generating\u2026",refresh:"Refresh changes",refreshAria:"Refresh the Git working tree status",commit:"Commit",committing:"Committing\u2026",pushOne:"Push 1 commit",pushMany:"Push {count} commits",pushing:"Pushing\u2026",pushAria:"Push unpushed commits to the upstream branch",githubOpen:"Open the GitHub repository",githubCreate:"Create a GitHub repository",githubModalTitle:"Connect to GitHub",githubModalDescription:"This repository is not connected to GitHub yet. Create a repository to publish it.",githubPrivate:"Create private repo",githubPublic:"Create public repo",githubPrivateHint:"Only you and your collaborators can see it.",githubPublicHint:"Anyone can see it.",githubCreateTitlePrivate:"Create private repository",githubCreateTitlePublic:"Create public repository",githubNameLabel:"Repository name",githubNameHint:"Letters, numbers, hyphens, underscores, and dots are allowed.",githubNameRequired:"Enter a repository name.",githubNameInvalid:"Enter a valid repository name.",githubCreateButton:"Create",githubCreating:"Creating\u2026",githubBack:"Back",githubClose:"Close",githubCreated:"Created {url}.",githubCreatedPushed:"Created {url} and pushed the current branch.",githubCreatedNoCommit:"Created {url}. Commit your changes, then push.",githubCreatedPushFailed:"Created {url}, but the push failed: {error}",githubFailed:"Could not create the repository.",githubAuthHint:"Creating a repository uses the GitHub CLI. Install `gh` and run `gh auth login` first.",unpushedCommits:"Unpushed commits",pushedOne:"Pushed 1 commit to {upstream}.",pushedMany:"Pushed {count} commits to {upstream}.",placeholder:"Generate a message, or write one yourself. Committing stages and commits all current changes.",checking:"Checking the working tree\u2026",notRepo:"This session is not in a Git repository.",noChanges:"No uncommitted changes.",oneFile:"1 changed file",files:"{count} changed files",generated:"Message generated. Review it, then commit.",committed:"Committed {hash}.",generateAria:"Generate a commit message from the current changes",commitAria:"Commit all current changes with this message",detached:"detached HEAD",hostOutdated:"The running Host is using an older version of the source-control plugin. Restart the Host or reload the plugin, then try again.",requestFailed:"The commit message request failed.",networkFailed:"Could not reach the Harness host.",unreadable:"The commit message endpoint returned an unreadable response."},ze={title:"\u6E90\u4EE3\u7801\u7BA1\u7406",messageLabel:"\u63D0\u4EA4\u4FE1\u606F",messagePlaceholder:"\u63D0\u4EA4\u4FE1\u606F\uFF08{key} \u5728\u201C{branch}\u201D\u4E0A\u63D0\u4EA4\uFF09",changes:"\u66F4\u6539",showChanges:"\u67E5\u770B {path} \u7684\u66F4\u6539",openChangesFailed:"\u65E0\u6CD5\u6253\u5F00 {path} \u7684\u66F4\u6539\u3002",diffTab:"\u66F4\u6539\uFF1A{name}",diffLoading:"\u6B63\u5728\u52A0\u8F7D\u66F4\u6539\u2026",diffFailed:"\u65E0\u6CD5\u52A0\u8F7D\u6B64\u6587\u4EF6\u7684\u66F4\u6539\u3002",diffRetry:"\u91CD\u8BD5",diffEmpty:"\u6CA1\u6709\u53EF\u663E\u793A\u7684\u6587\u672C\u66F4\u6539\u3002",diffBinary:"\u8FD9\u662F\u4E8C\u8FDB\u5236\u6587\u4EF6\uFF0C\u4E0D\u663E\u793A\u66F4\u6539\u3002",diffTruncated:"\u5DEE\u5F02\u5DF2\u622A\u65AD\u3002",diffOpenFile:"\u6253\u5F00\u6587\u4EF6",diffOpenFileAria:"\u5728\u6587\u4EF6\u67E5\u770B\u5668\u4E2D\u6253\u5F00 {path}",diffRefreshAria:"\u5237\u65B0\u6B64\u6587\u4EF6\u7684\u66F4\u6539",diffAdded:"\u65B0\u589E {count} \u884C",diffRemoved:"\u5220\u9664 {count} \u884C",showPanel:"\u5207\u6362\u6E90\u4EE3\u7801\u7BA1\u7406\u9762\u677F",generate:"\u751F\u6210",generating:"\u6B63\u5728\u751F\u6210\u2026",refresh:"\u5237\u65B0\u66F4\u6539",refreshAria:"\u5237\u65B0 Git \u5DE5\u4F5C\u533A\u72B6\u6001",commit:"\u63D0\u4EA4",committing:"\u6B63\u5728\u63D0\u4EA4\u2026",pushOne:"\u63A8\u9001 1 \u4E2A\u63D0\u4EA4",pushMany:"\u63A8\u9001 {count} \u4E2A\u63D0\u4EA4",pushing:"\u6B63\u5728\u63A8\u9001\u2026",pushAria:"\u5C06\u672A\u63A8\u9001\u7684\u63D0\u4EA4\u63A8\u9001\u5230\u4E0A\u6E38\u5206\u652F",githubOpen:"\u6253\u5F00 GitHub \u4ED3\u5E93",githubCreate:"\u521B\u5EFA GitHub \u4ED3\u5E93",githubModalTitle:"\u8FDE\u63A5\u5230 GitHub",githubModalDescription:"\u6B64\u4ED3\u5E93\u5C1A\u672A\u8FDE\u63A5\u5230 GitHub\u3002\u521B\u5EFA\u4E00\u4E2A\u4ED3\u5E93\u6765\u53D1\u5E03\u5B83\u3002",githubPrivate:"\u521B\u5EFA\u79C1\u6709\u4ED3\u5E93",githubPublic:"\u521B\u5EFA\u516C\u5F00\u4ED3\u5E93",githubPrivateHint:"\u53EA\u6709\u4F60\u548C\u534F\u4F5C\u8005\u53EF\u4EE5\u770B\u5230\u3002",githubPublicHint:"\u4EFB\u4F55\u4EBA\u90FD\u53EF\u4EE5\u770B\u5230\u3002",githubCreateTitlePrivate:"\u521B\u5EFA\u79C1\u6709\u4ED3\u5E93",githubCreateTitlePublic:"\u521B\u5EFA\u516C\u5F00\u4ED3\u5E93",githubNameLabel:"\u4ED3\u5E93\u540D\u79F0",githubNameHint:"\u5141\u8BB8\u4F7F\u7528\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u8FDE\u5B57\u7B26\u3001\u4E0B\u5212\u7EBF\u548C\u70B9\u3002",githubNameRequired:"\u8BF7\u8F93\u5165\u4ED3\u5E93\u540D\u79F0\u3002",githubNameInvalid:"\u8BF7\u8F93\u5165\u6709\u6548\u7684\u4ED3\u5E93\u540D\u79F0\u3002",githubCreateButton:"\u521B\u5EFA",githubCreating:"\u6B63\u5728\u521B\u5EFA\u2026",githubBack:"\u8FD4\u56DE",githubClose:"\u5173\u95ED",githubCreated:"\u5DF2\u521B\u5EFA {url}\u3002",githubCreatedPushed:"\u5DF2\u521B\u5EFA {url} \u5E76\u63A8\u9001\u4E86\u5F53\u524D\u5206\u652F\u3002",githubCreatedNoCommit:"\u5DF2\u521B\u5EFA {url}\u3002\u63D0\u4EA4\u66F4\u6539\u540E\u518D\u63A8\u9001\u3002",githubCreatedPushFailed:"\u5DF2\u521B\u5EFA {url}\uFF0C\u4F46\u63A8\u9001\u5931\u8D25\uFF1A{error}",githubFailed:"\u65E0\u6CD5\u521B\u5EFA\u4ED3\u5E93\u3002",githubAuthHint:"\u521B\u5EFA\u4ED3\u5E93\u9700\u8981\u4F7F\u7528 GitHub CLI\u3002\u8BF7\u5148\u5B89\u88C5 `gh` \u5E76\u8FD0\u884C `gh auth login`\u3002",unpushedCommits:"\u672A\u63A8\u9001\u7684\u63D0\u4EA4",pushedOne:"\u5DF2\u5C06 1 \u4E2A\u63D0\u4EA4\u63A8\u9001\u5230 {upstream}\u3002",pushedMany:"\u5DF2\u5C06 {count} \u4E2A\u63D0\u4EA4\u63A8\u9001\u5230 {upstream}\u3002",placeholder:"\u751F\u6210\u4E00\u6761\u63D0\u4EA4\u4FE1\u606F\uFF0C\u6216\u81EA\u5DF1\u586B\u5199\u3002\u63D0\u4EA4\u65F6\u4F1A\u6682\u5B58\u5E76\u63D0\u4EA4\u6240\u6709\u5F53\u524D\u66F4\u6539\u3002",checking:"\u6B63\u5728\u68C0\u67E5\u5DE5\u4F5C\u533A\u2026",notRepo:"\u5F53\u524D\u4F1A\u8BDD\u4E0D\u5728 Git \u4ED3\u5E93\u4E2D\u3002",noChanges:"\u6CA1\u6709\u672A\u63D0\u4EA4\u7684\u66F4\u6539\u3002",oneFile:"1 \u4E2A\u6587\u4EF6\u5DF2\u66F4\u6539",files:"{count} \u4E2A\u6587\u4EF6\u5DF2\u66F4\u6539",generated:"\u63D0\u4EA4\u4FE1\u606F\u5DF2\u751F\u6210\uFF0C\u8BF7\u68C0\u67E5\u540E\u63D0\u4EA4\u3002",committed:"\u5DF2\u63D0\u4EA4 {hash}\u3002",generateAria:"\u6839\u636E\u5F53\u524D\u66F4\u6539\u751F\u6210\u63D0\u4EA4\u4FE1\u606F",commitAria:"\u4F7F\u7528\u8FD9\u6761\u4FE1\u606F\u63D0\u4EA4\u6240\u6709\u5F53\u524D\u66F4\u6539",detached:"\u6E38\u79BB HEAD",hostOutdated:"\u5F53\u524D\u8FD0\u884C\u7684 Host \u4ECD\u5728\u4F7F\u7528\u65E7\u7248\u6E90\u4EE3\u7801\u7BA1\u7406\u63D2\u4EF6\u3002\u8BF7\u91CD\u542F Host \u6216\u91CD\u65B0\u52A0\u8F7D\u63D2\u4EF6\u540E\u518D\u8BD5\u3002",requestFailed:"\u63D0\u4EA4\u4FE1\u606F\u8BF7\u6C42\u5931\u8D25\u3002",networkFailed:"\u65E0\u6CD5\u8FDE\u63A5\u5230 Harness \u4E3B\u673A\u3002",unreadable:"\u63D0\u4EA4\u4FE1\u606F\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6CD5\u89E3\u6790\u7684\u54CD\u5E94\u3002"};function E(t){let[,r]=l.useReducer(e=>e+1,0);l.useEffect(()=>t.locale.subscribe(r),[t]);let n=l.useMemo(()=>t.locale.bind(S),[t]);return l.useCallback(e=>{let i;try{i=n(e)}catch{i=e}return typeof i!="string"||i===e?te[e]??e:i},[n])}function w(t,r,n){let e=t(r);for(let[i,c]of Object.entries(n))e=e.replaceAll(`{${i}}`,String(c));return e}function T(t){let r=Array.isArray(t.commits)?t.commits.slice(0,8).map(e=>({hash:typeof e?.hash=="string"?e.hash:"",shortHash:typeof e?.shortHash=="string"?e.shortHash:"",subject:typeof e?.subject=="string"?e.subject:"",author:typeof e?.author=="string"?e.author:"",timestamp:Number(e?.timestamp)||0})).filter(e=>e.hash):[],n=Array.isArray(t.files)?t.files.slice(0,500).map(e=>({path:typeof e?.path=="string"?e.path:"",workspacePath:typeof e?.workspacePath=="string"?e.workspacePath:null,status:typeof e?.status=="string"?e.status:"",untracked:!!e?.untracked,staged:!!e?.staged,unstaged:!!e?.unstaged})).filter(e=>e.path):[];return{isRepo:!!t.isRepo,cwd:typeof t.cwd=="string"?t.cwd:"",top:typeof t.top=="string"?t.top:"",branch:typeof t.branch=="string"?t.branch:"",upstream:typeof t.upstream=="string"?t.upstream:"",ahead:Number(t.ahead)||0,behind:Number(t.behind)||0,hasCommits:!!t.hasCommits,githubUrl:typeof t.githubUrl=="string"?t.githubUrl:null,commits:r,files:n,changedFiles:Number(t.changedFiles)||0,stagedFiles:Number(t.stagedFiles)||0,unstagedFiles:Number(t.unstagedFiles)||0,untrackedFiles:Number(t.untrackedFiles)||0}}function ae(t,r,n){let i=n.replace(/\\/g,"/").replace(/^(?:\.\/)+/,"").split("/").map(h=>encodeURIComponent(h).replace(/%3A/gi,":")).join("/"),c=encodeURIComponent(r).replace(/%3A/gi,":");return`dsh-resource://${t}/session/${c}/${i}`}function Ee(t,r){return ae("file",t,r)}function Me(t,r){return ae("commit-message-diff",t,r)}function se(t){let r="dsh-resource://commit-message-diff/session/";if(typeof t!="string"||!t.startsWith(r))return"";let n=t.slice(r.length),e=n.indexOf("/");return e===-1||e===n.length-1?"":n.slice(e+1).split("/").map(i=>{try{return decodeURIComponent(i)}catch{return i}}).join("/")}function re(t){let r=String(t||"").replace(/\\/g,"/"),n=r.lastIndexOf("/");return n===-1?r:r.slice(n+1)}function ie(t){let r=String(t||"");return r&&(r.startsWith("session-")?r:`session-${r}`)}function Be(t){let r=t.replace(/\\/g,"/"),n=r.lastIndexOf("/");return n===-1?{name:r,directory:""}:{name:r.slice(n+1),directory:r.slice(0,n)}}function Y(t){return t.untracked?"U":t.status.includes("D")?"D":t.status.includes("R")?"R":t.status.includes("C")?"C":t.status.includes("A")?"A":"M"}function He(t){if(!t)return"";try{return new Date(t*1e3).toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return""}}async function Ie(t,r,n,e){let i;try{i=await fetch(ee,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:"diff",sessionId:t,path:r}),signal:n})}catch(h){throw h&&h.name==="AbortError"?h:new Error(e("networkFailed"))}let c;try{c=await i.json()}catch{throw new Error(e("unreadable"))}if(!i.ok||!c||c.ok!==!0)throw new Error(c&&typeof c.error=="string"&&c.error||e("requestFailed"));return c}function Oe(t,r){return r?r.isRepo?r.changedFiles===0?t("noChanges"):r.changedFiles===1?t("oneFile"):w(t,"files",{count:r.changedFiles}):t("notRepo"):t("checking")}function oe(){return a("svg",{width:15,height:15,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("path",{d:"M4.5 3.5v9"}),a("circle",{cx:4.5,cy:3.5,r:1.7}),a("circle",{cx:11.5,cy:12.5,r:1.7}),a("path",{d:"M11.5 10.8V8.5a3 3 0 0 0-3-3H7.2"}))}function De(){return a("svg",{width:14,height:14,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("path",{d:"M8 1.8l1.1 3.1L12.2 6l-3.1 1.1L8 10.2 6.9 7.1 3.8 6l3.1-1.1L8 1.8z"}),a("path",{d:"M12.6 10.2l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7z"}))}function je(){return a("svg",{width:14,height:14,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("path",{d:"M13 8a5 5 0 1 1-1.5-3.5"}),a("path",{d:"M13 2.8v3.4H9.6"}))}function Ge(){return a("svg",{width:14,height:14,viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":!0,focusable:!1},a("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"}))}function Ue(){return a("svg",{width:15,height:15,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("rect",{x:3.2,y:7,width:9.6,height:6.8,rx:1.5}),a("path",{d:"M5.4 7V5.2a2.6 2.6 0 0 1 5.2 0V7"}))}function qe(){return a("svg",{width:15,height:15,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("circle",{cx:8,cy:8,r:5.6}),a("path",{d:"M2.4 8h11.2"}),a("path",{d:"M8 2.4c1.8 1.5 2.7 3.4 2.7 5.6S9.8 12.1 8 13.6C6.2 12.1 5.3 10.2 5.3 8S6.2 3.9 8 2.4z"}))}function We(){return a("svg",{width:13,height:13,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,focusable:!1},a("path",{d:"M4 4l8 8M12 4l-8 8"}))}function Ke(){return a("svg",{width:14,height:14,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("path",{d:"M8 10V2.5"}),a("path",{d:"M5.2 5.3L8 2.5l2.8 2.8"}),a("path",{d:"M2.8 10.5v2.2c0 .4.3.8.8.8h8.8c.5 0 .8-.4.8-.8v-2.2"}))}function $e(){return a("svg",{width:14,height:14,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("path",{d:"M3 8.5l3.2 3.2L13 5"}))}function _e(t){return a("svg",{width:12,height:12,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1,style:{transform:t.open?"rotate(90deg)":"none",transition:"transform 120ms ease"}},a("path",{d:"M6 4l4 4-4 4"}))}function Ve(t){let r=E(t.clientCtx);function n(){try{let e=t.clientCtx.sidebarRight,i=e.active();if(e.isExpanded()&&i?.kind===D){e.toggleExpanded();return}e.openTab(D)}catch(e){console.error("commit-message: could not toggle the right sidebar",e)}}return a("button",{type:"button",className:"dshcm-trigger",onClick:n,"aria-label":r("showPanel"),title:r("showPanel")},a(oe))}function Ze(t){let r=E(t.clientCtx);return a("span",{className:"dshcm-tabTitle"},a(oe),a("span",null,r("title")))}function Je(t){let r=t.sessionId,n=ie(r),e=E(t.clientCtx),[i,c]=l.useState(null),[h,A]=l.useState(""),[b,x]=l.useState("status"),[L,m]=l.useState(null),[F,j]=l.useState(!0),[d,g]=l.useState(null),R=l.useRef(null),v=l.useRef(null),y=l.useRef("status"),k=l.useRef(n),f=l.useRef(null),M=l.useRef(null),G=l.useRef(!1);l.useEffect(()=>{y.current=b},[b]);let U=!!d,P=d?d.step:null;l.useEffect(()=>{if(!U)return;let s=o=>{o.key==="Escape"&&P!=="creating"&&(o.preventDefault(),g(null))};return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[U,P]),l.useEffect(()=>{if(!d)return;let s=P==="choose"?M.current?.querySelector("[data-github-option]"):M.current?.querySelector("input");s&&typeof s.focus=="function"&&s.focus()},[P]),l.useEffect(()=>{G.current&&!d&&f.current?.focus(),G.current=!!d},[d]);let C=l.useCallback(async(s,o,u)=>{let p;try{p=await fetch(ee,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:s,sessionId:n,...o}),signal:u})}catch(I){throw I&&I.name==="AbortError"?I:new Error(e("networkFailed"))}let N;try{N=await p.json()}catch{throw new Error(e("unreadable"))}if(!p.ok||!N||N.ok!==!0)throw new Error(N&&typeof N.error=="string"&&N.error||e("requestFailed"));return N},[n,e]);l.useEffect(()=>{let s=k.current!==n;k.current=n;let o=!0,u=new AbortController;return s&&(c(null),A(""),m(null),g(null)),x("status"),C("status",{},u.signal).then(p=>{o&&c(T(p))}).catch(p=>{!o||p&&p.name==="AbortError"||m({kind:"error",text:p instanceof Error?p.message:String(p)})}).finally(()=>{o&&x(null)}),()=>{o=!1,u.abort()}},[n]),l.useEffect(()=>()=>{R.current&&R.current.abort()},[]),l.useEffect(()=>{let s=()=>{if(document.visibilityState!=="visible"||y.current)return;v.current&&v.current.abort();let o=new AbortController;v.current=o,C("status",{},o.signal).then(u=>c(T(u))).catch(()=>{}).finally(()=>{v.current===o&&(v.current=null)})};return window.addEventListener("focus",s),document.addEventListener("visibilitychange",s),()=>{window.removeEventListener("focus",s),document.removeEventListener("visibilitychange",s),v.current&&v.current.abort()}},[C]);async function de(){if(!b){x("status"),m(null);try{let s=await C("status",{});c(T(s))}catch(s){m({kind:"error",text:s instanceof Error?s.message:String(s)})}finally{x(null)}}}function ce(s){if(s.path)try{t.clientCtx.sidebarRight.openResource(Me(r,s.path),{params:{sessionId:r,path:s.path,workspacePath:s.workspacePath,status:s.status,letter:Y(s),untracked:s.untracked,staged:s.staged,unstaged:s.unstaged}})}catch(o){console.error("commit-message: could not open the file changes",o),m({kind:"error",text:w(e,"openChangesFailed",{path:s.path})})}}function he(){if(!i||!i.isRepo)return;if(i.githubUrl){window.open(i.githubUrl,"_blank","noopener,noreferrer");return}if(i.githubUrl===null){m({kind:"error",text:e("hostOutdated")});return}let s=re(i.top||i.cwd)||"repository";g({step:"choose",visibility:"private",name:s,error:""})}function q(s){g(o=>o&&{...o,visibility:s,step:"name",error:""})}function ue(){g(null)}function pe(s){g(o=>o&&{...o,name:s,error:""})}async function W(){if(!d||d.step==="creating")return;let s=d.name.trim();if(!s){g(o=>o&&{...o,error:e("githubNameRequired")});return}if(!/^[A-Za-z0-9][A-Za-z0-9._-]*(?:\/[A-Za-z0-9][A-Za-z0-9._-]*)?$/.test(s)){g(o=>o&&{...o,error:e("githubNameInvalid")});return}g(o=>o&&{...o,step:"creating",error:""});try{let o=await C("create-github",{name:s,visibility:d.visibility});c(T(o));let u=o.githubUrl||"",p;o.pushed?p=w(e,"githubCreatedPushed",{url:u}):o.pushError?p=w(e,"githubCreatedPushFailed",{url:u,error:o.pushError}):o.hasCommits?p=w(e,"githubCreated",{url:u}):p=w(e,"githubCreatedNoCommit",{url:u}),m({kind:o.pushError?"error":"success",text:p}),g(null)}catch(o){g(u=>u&&{...u,step:"name",error:o instanceof Error?o.message:String(o)})}}let B=!!(i&&i.isRepo&&i.changedFiles>0)&&!b,H=B&&h.trim().length>0,K=!!(i&&i.hasCommits&&i.ahead>0)&&!b;async function me(){if(!B)return;let s=new AbortController;R.current=s,x("generate"),m(null);try{let o=await C("generate",{},s.signal);A(String(o.message||"")),c(T(o)),m({kind:"success",text:e("generated")})}catch(o){if(o&&o.name==="AbortError")return;m({kind:"error",text:o instanceof Error?o.message:String(o)})}finally{R.current===s&&(R.current=null),x(null)}}async function $(){if(H){x("commit"),m(null);try{let s=await C("commit",{message:h.trim()});c(T(s)),A(""),m({kind:"success",text:w(e,"committed",{hash:s.hash||"HEAD"})})}catch(s){m({kind:"error",text:s instanceof Error?s.message:String(s)})}finally{x(null)}}}async function fe(){if(K){x("push"),m(null);try{let s=await C("push",{});c(T(s));let o=Number(s.pushed)||1,u=s.upstream||"upstream";m({kind:"success",text:w(e,o===1?"pushedOne":"pushedMany",{count:o,upstream:u})})}catch(s){m({kind:"error",text:s instanceof Error?s.message:String(s)})}finally{x(null)}}}function ge(s){(s.metaKey||s.ctrlKey)&&s.key==="Enter"&&H&&(s.preventDefault(),$())}let be=Oe(e,i),xe=typeof navigator<"u"&&/Mac|iPhone|iPad/.test(navigator.platform)?"\u2318Enter":"Ctrl+Enter",ye=i&&i.isRepo?w(e,"messagePlaceholder",{key:xe,branch:i.branch||e("detached")}):e("placeholder"),we=!!(i&&i.isRepo&&i.hasCommits&&i.ahead>0),_=i&&i.githubUrl?e("githubOpen"):e("githubCreate"),V=String(n).replace(/[^A-Za-z0-9_-]/g,"-"),Z=`dshcm-github-title-${V}`,J=`dshcm-github-name-${V}`,ve=i&&i.isRepo?a("div",{className:"dshcm-changes"},a("button",{type:"button",className:"dshcm-sectionToggle",onClick:()=>j(s=>!s),"aria-expanded":F},a(_e,{open:F}),a("span",{className:"dshcm-sectionTitle"},e("changes")),a("span",{className:"dshcm-sectionCount"},String(i.changedFiles))),F?i.files.length>0?a("ul",{className:"dshcm-fileList"},i.files.map(s=>{let o=Be(s.workspacePath||s.path),u=Y(s),p=u==="D"?"deleted":u==="U"||u==="A"?"new":"modified";return a("li",{key:s.path},a("button",{type:"button",className:"dshcm-fileRow",onClick:()=>ce(s),title:w(e,"showChanges",{path:s.path})},a("span",{className:"dshcm-fileText"},a("span",{className:"dshcm-fileName"},o.name),o.directory?a("span",{className:"dshcm-fileDir"},o.directory):null),a("span",{className:`dshcm-fileStatus dshcm-fileStatus--${p}`},u)))})):a("div",{className:"dshcm-empty"},e("noChanges")):null):null,ke=i&&i.isRepo&&i.commits.length>0?a("div",{className:"dshcm-commits"},a("div",{className:"dshcm-commitsHead"},a("span",{className:"dshcm-commitsTitle"},e("unpushedCommits")),i.upstream?a("span",{className:"dshcm-upstream"},i.upstream):null),a("ul",{className:"dshcm-commitList","aria-label":e("unpushedCommits")},i.commits.map(s=>a("li",{key:s.hash,className:"dshcm-commitRow",title:s.subject},a("code",{className:"dshcm-hash"},s.shortHash||s.hash.slice(0,7)),a("span",{className:"dshcm-subject"},s.subject),a("span",{className:"dshcm-meta"},[s.author,He(s.timestamp)].filter(Boolean).join(" \xB7 ")))))):null;return a(l.Fragment,null,a("style",null,tt),a("div",{className:"dshcm-root",id:`dshcm-panel-${n}`,"data-session":n},a("div",{className:"dshcm-header"},a("span",{className:"dshcm-title"},e("title")),a("div",{className:"dshcm-headerActions"},a("button",{ref:f,type:"button",className:"dshcm-iconButton",disabled:!i||!i.isRepo||!!b,onClick:he,"aria-label":_,title:_},a(Ge)),a("button",{type:"button",className:"dshcm-iconButton",disabled:!!b,onClick:de,"aria-label":e("refreshAria"),title:e("refreshAria")},a(je)))),L?a("div",{className:`dshcm-feedback dshcm-feedback--${L.kind}`,role:"status","aria-live":"polite"},L.text):null,a("div",{className:"dshcm-body"},a("div",{className:"dshcm-message"},a("textarea",{className:"dshcm-input",value:h,rows:4,spellCheck:!0,placeholder:ye,disabled:!!b,onChange:s=>A(s.target.value),onKeyDown:ge,"aria-label":e("messageLabel")}),a("button",{type:"button",className:"dshcm-inlineGenerate",disabled:!B,onClick:me,"aria-label":e(b==="generate"?"generating":"generateAria"),title:e(b==="generate"?"generating":"generateAria")},a(De))),a("div",{className:"dshcm-actions"},a("button",{type:"button",className:"dshcm-button dshcm-commit",disabled:!H,onClick:$,"aria-label":e("commitAria"),title:e("commitAria")},a($e),e(b==="commit"?"committing":"commit")),we?a("button",{type:"button",className:"dshcm-button dshcm-push",disabled:!K,onClick:fe,"aria-label":e("pushAria"),title:e("pushAria")},a(Ke),b==="push"?e("pushing"):w(e,i.ahead===1?"pushOne":"pushMany",{count:i.ahead})):null),a("div",{className:"dshcm-statusLine","aria-live":"polite"},b==="status"?e("checking"):be),ve,ke),d?a("div",{className:"dshcm-modalBackdrop",onMouseDown:s=>{s.target===s.currentTarget&&d.step!=="creating"&&g(null)}},a("div",{ref:M,className:"dshcm-modal",role:"dialog","aria-modal":"true","aria-labelledby":Z},a("div",{className:"dshcm-modalHead"},a("span",{className:"dshcm-modalTitle",id:Z},d.step==="choose"?e("githubModalTitle"):d.visibility==="private"?e("githubCreateTitlePrivate"):e("githubCreateTitlePublic")),a("button",{type:"button",className:"dshcm-iconButton",disabled:d.step==="creating",onClick:ue,"aria-label":e("githubClose"),title:e("githubClose")},a(We))),d.step==="choose"?a(l.Fragment,null,a("p",{className:"dshcm-modalText"},e("githubModalDescription")),a("button",{type:"button",className:"dshcm-repoOption","data-github-option":"private",onClick:()=>q("private")},a("span",{className:"dshcm-repoIcon"},a(Ue)),a("span",{className:"dshcm-repoText"},a("span",{className:"dshcm-repoTitle"},e("githubPrivate")),a("span",{className:"dshcm-repoHint"},e("githubPrivateHint")))),a("button",{type:"button",className:"dshcm-repoOption","data-github-option":"public",onClick:()=>q("public")},a("span",{className:"dshcm-repoIcon"},a(qe)),a("span",{className:"dshcm-repoText"},a("span",{className:"dshcm-repoTitle"},e("githubPublic")),a("span",{className:"dshcm-repoHint"},e("githubPublicHint")))),a("p",{className:"dshcm-modalFoot"},e("githubAuthHint"))):a("div",{className:"dshcm-modalForm"},a("p",{className:"dshcm-modalText"},e("githubModalDescription")),a("label",{className:"dshcm-fieldLabel",htmlFor:J},e("githubNameLabel")),a("input",{id:J,className:"dshcm-input dshcm-nameInput",type:"text",value:d.name,spellCheck:!1,autoComplete:"off",disabled:d.step==="creating","aria-invalid":d.error?"true":void 0,onChange:s=>pe(s.target.value),onKeyDown:s=>{s.key==="Enter"&&(s.preventDefault(),W())}}),a("div",{className:"dshcm-fieldHint"},e("githubNameHint")),d.error?a("div",{className:"dshcm-modalError",role:"alert"},d.error):null,a("div",{className:"dshcm-modalActions"},a("button",{type:"button",className:"dshcm-button",disabled:d.step==="creating",onClick:()=>g(s=>s&&{...s,step:"choose",error:""})},e("githubBack")),a("button",{type:"button",className:"dshcm-button dshcm-modalPrimary",disabled:d.step==="creating"||!d.name.trim(),onClick:W},d.step==="creating"?e("githubCreating"):e("githubCreateButton")))))):null))}var Qe=l.lazy(()=>require.async("./client.diff.js").then(t=>({default:t.DiffView}),t=>(console.error("commit-message: could not load the diff renderer",t),{default:Xe})));function Xe(){return a("div",{className:"dshcm-empty",style:{padding:"24px 14px"}},"The diff renderer could not be loaded. Reload the plugin to try again.")}function Ye(t){let r=E(t.clientCtx),{tab:n}=t.useTabInfo(),e=n.navigation.params??{},i=se(n.contentId)||(typeof e.path=="string"?e.path:""),c=t.sessionId||e.sessionId,h=ie(c),A=n.navigation.revision,[b,x]=l.useState({phase:"loading",diff:"",truncated:!1,binary:!1,status:"",error:""}),[L,m]=l.useState(0);l.useEffect(()=>{let y=!0,k=new AbortController;return x(f=>({...f,phase:"loading",error:""})),Ie(h,i,k.signal,r).then(f=>{y&&x({phase:"ready",diff:typeof f.diff=="string"?f.diff:"",truncated:!!f.truncated,binary:!!f.binary,status:typeof f.status=="string"?f.status:"",error:""})}).catch(f=>{!y||f&&f.name==="AbortError"||x({phase:"error",diff:"",truncated:!1,binary:!1,status:"",error:f instanceof Error?f.message:String(f)})}),()=>{y=!1,k.abort()}},[h,i,A,L,r]);let F=l.useCallback((y,k)=>k?w(r,y,k):r(y),[r]),d=(typeof e.letter=="string"?e.letter:"")||(typeof e.status=="string"?e.status.trim():""),g=!!e.workspacePath&&!!h&&!String(d).includes("D");function R(){m(y=>y+1)}function v(){if(g)try{t.clientCtx.sidebarRight.openResource(Ee(c,e.workspacePath))}catch(y){console.error("commit-message: could not open file",y)}}return a(l.Suspense,{fallback:a("div",{className:"dshcm-empty",style:{padding:"24px 14px"}},r("diffLoading"))},a(Qe,{path:i,params:e,state:b,canOpenFile:g,label:F,onRefresh:R,onOpenFile:v}))}function et(t,r){let n=re(se(r))||"diff";return t("diffTab").replaceAll("{name}",n)}var tt=`
.dshcm-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin: 0 1px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
  transition: background 100ms ease, color 100ms ease, border-color 100ms ease;
}
.dshcm-trigger:hover {
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
}
.dshcm-trigger:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-tabTitle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}
.dshcm-root {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 12px 14px 18px;
  overflow: auto;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  line-height: 1.45;
}
.dshcm-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 0 8px;
}
.dshcm-title {
  font-weight: 650;
  color: var(--dsw-alias-label-primary);
  font-size: 11.5px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
}
.dshcm-headerActions {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
}
.dshcm-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-height: 26px;
  padding: 3px 9px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 7px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-weight: 550;
  cursor: pointer;
  transition: background 100ms ease, color 100ms ease, border-color 100ms ease;
}
.dshcm-button:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
}
.dshcm-button:focus-visible,
.dshcm-iconButton:focus-visible,
.dshcm-input:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-button:disabled {
  opacity: 0.48;
  cursor: default;
}
.dshcm-commit {
  flex: 1 1 160px;
  min-height: 32px;
  background: var(--dsw-alias-bg-layer-2);
  border-color: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-brand-primary);
}
.dshcm-commit:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-1);
  border-color: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-brand-primary);
}
.dshcm-push {
  flex: 0 0 auto;
  min-height: 32px;
  color: var(--dsw-alias-label-primary);
}
.dshcm-iconButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
}
.dshcm-iconButton:hover {
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
}
.dshcm-iconButton:disabled {
  opacity: 0.48;
  cursor: default;
}
.dshcm-body {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 0;
}
.dshcm-message {
  position: relative;
}
.dshcm-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 96px;
  max-height: 260px;
  resize: vertical;
  padding: 9px 42px 9px 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 8px;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  line-height: 1.5;
}
.dshcm-input::placeholder {
  color: var(--dsw-alias-label-secondary);
  opacity: 0.85;
}
.dshcm-inlineGenerate {
  position: absolute;
  top: 6px;
  right: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--dsw-alias-brand-primary);
  cursor: pointer;
}
.dshcm-inlineGenerate:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-2);
}
.dshcm-inlineGenerate:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-inlineGenerate:disabled {
  opacity: 0.42;
  cursor: default;
}
.dshcm-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.dshcm-statusLine {
  min-height: 16px;
  padding: 0 2px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
}
.dshcm-diffRoot {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 12px 14px 14px;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  line-height: 1.45;
}
.dshcm-diffHead {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 0 1px;
}
.dshcm-diffIdentity {
  display: flex;
  align-items: baseline;
  flex: 1 1 auto;
  gap: 6px;
  min-width: 0;
}
.dshcm-diffName {
  overflow: hidden;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-diffDir {
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-diffStatus {
  flex: 0 0 auto;
  min-width: 16px;
  padding: 0 5px;
  border-radius: 5px;
  background: var(--dsw-alias-bg-layer-2);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 10.5px;
  font-weight: 650;
  text-align: center;
}
.dshcm-diffStatus--new {
  color: var(--dsw-alias-state-success-primary);
}
.dshcm-diffStatus--modified {
  color: var(--dsw-alias-brand-primary);
}
.dshcm-diffStatus--deleted {
  color: var(--dsw-alias-state-error-primary);
}
.dshcm-diffActions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}
.dshcm-diffOpen {
  min-height: 24px;
  padding: 2px 8px;
  font-size: 11.5px;
}
.dshcm-diffSummary {
  display: flex;
  gap: 8px;
  padding: 0 2px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px;
}
.dshcm-diffAdded {
  color: var(--dsw-alias-state-success-primary);
}
.dshcm-diffRemoved {
  color: var(--dsw-alias-state-error-primary);
}
.dshcm-diffBody {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 6px;
  min-height: 0;
}
.dshcm-diffScroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 4px 0;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 8px;
  background: var(--dsw-alias-bg-base);
}
.dshcm-diffScroll:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-diffRows {
  width: max-content;
  min-width: 100%;
}
.dshcm-diffLine {
  display: flex;
  align-items: flex-start;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px;
  line-height: 1.55;
  white-space: pre;
}
.dshcm-diffLine--add {
  background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 12%, transparent);
}
.dshcm-diffLine--del {
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);
}
.dshcm-diffLine--hunk {
  background: var(--dsw-alias-bg-layer-2);
}
.dshcm-diffLine--hunk .dshcm-diffText {
  color: var(--dsw-alias-brand-primary);
}
.dshcm-diffLine--meta .dshcm-diffText,
.dshcm-diffLine--meta .dshcm-diffNum {
  color: var(--dsw-alias-label-secondary);
}
.dshcm-diffLine--add .dshcm-diffText,
.dshcm-diffLine--add .dshcm-diffMark {
  color: var(--dsw-alias-state-success-primary);
}
.dshcm-diffLine--del .dshcm-diffText,
.dshcm-diffLine--del .dshcm-diffMark {
  color: var(--dsw-alias-state-error-primary);
}
.dshcm-diffNum {
  flex: 0 0 42px;
  padding-right: 8px;
  color: var(--dsw-alias-label-secondary);
  opacity: 0.65;
  text-align: right;
  user-select: none;
}
.dshcm-diffMark {
  flex: 0 0 16px;
  text-align: center;
  user-select: none;
}
.dshcm-diffText {
  flex: 1 1 auto;
  padding-right: 14px;
}
.dshcm-diffNote {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 140px;
  padding: 16px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12.5px;
  text-align: center;
}
.dshcm-diffNote--error {
  color: var(--dsw-alias-state-error-primary);
}
.dshcm-diffTruncated {
  padding: 6px 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 7px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
}
.dshcm-changes {
  border-top: 1px solid var(--dsw-alias-border-l1);
  padding-top: 7px;
}
.dshcm-sectionToggle {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 0 2px 4px;
  border: 0;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.dshcm-sectionToggle:hover {
  color: var(--dsw-alias-label-primary);
}
.dshcm-sectionToggle:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-sectionTitle {
  color: var(--dsw-alias-label-primary);
  font-size: 12px;
  font-weight: 600;
}
.dshcm-sectionCount {
  margin-left: auto;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
}
.dshcm-fileList {
  max-height: 280px;
  margin: 0;
  padding: 0;
  overflow: auto;
  list-style: none;
}
.dshcm-fileRow {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 5px 6px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.dshcm-fileRow:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-2);
}
.dshcm-fileRow:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: -1px;
}
.dshcm-fileRow:disabled {
  opacity: 0.55;
  cursor: default;
}
.dshcm-fileText {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
}
.dshcm-fileName {
  flex: 0 1 auto;
  max-width: 62%;
  overflow: hidden;
  color: var(--dsw-alias-label-primary);
  font-size: 12.5px;
  font-weight: 550;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-fileDir {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-fileStatus {
  flex: 0 0 14px;
  width: 14px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  font-weight: 650;
  text-align: center;
}
.dshcm-fileStatus--new {
  color: var(--dsw-alias-state-success-primary);
}
.dshcm-fileStatus--modified {
  color: var(--dsw-alias-brand-primary);
}
.dshcm-fileStatus--deleted {
  color: var(--dsw-alias-state-error-primary);
}
.dshcm-empty {
  padding: 4px 2px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}
.dshcm-commits {
  border-top: 1px solid var(--dsw-alias-border-l1);
  padding-top: 7px;
}
.dshcm-commitsHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 1px 3px;
}
.dshcm-commitsTitle {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  font-weight: 650;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.dshcm-upstream {
  max-width: 220px;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-commitList {
  max-height: 220px;
  margin: 0;
  padding: 0;
  overflow: auto;
  list-style: none;
}
.dshcm-commitRow {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 4px 1px;
  border-top: 1px solid var(--dsw-alias-border-l1);
}
.dshcm-commitRow:first-child {
  border-top: none;
}
.dshcm-hash {
  flex: 0 0 auto;
  color: var(--dsw-alias-brand-primary);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
}
.dshcm-subject {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-primary);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-meta {
  flex: 0 0 auto;
  max-width: 170px;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-feedback {
  padding: 0 0 8px;
  font-size: 12px;
}
.dshcm-feedback--error {
  color: var(--dsw-alias-state-error-primary);
}
.dshcm-feedback--success {
  color: var(--dsw-alias-state-success-primary);
}
.dshcm-feedback--info {
  color: var(--dsw-alias-label-secondary);
}
.dshcm-modalBackdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}
.dshcm-modal {
  box-sizing: border-box;
  width: min(430px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  overflow: auto;
  padding: 16px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.38);
  font-size: 13px;
  line-height: 1.45;
}
.dshcm-modalHead {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
}
.dshcm-modalTitle {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  font-size: 14px;
  font-weight: 650;
}
.dshcm-modalText {
  margin: 0 0 10px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12.5px;
  line-height: 1.5;
}
.dshcm-repoOption {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin: 0 0 8px;
  padding: 11px 12px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 100ms ease, background 100ms ease;
}
.dshcm-repoOption:hover {
  border-color: var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-bg-layer-3);
}
.dshcm-repoOption:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-repoIcon {
  display: inline-flex;
  flex: 0 0 32px;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-secondary);
}
.dshcm-repoOption:hover .dshcm-repoIcon {
  color: var(--dsw-alias-brand-primary);
}
.dshcm-repoText {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.dshcm-repoTitle {
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  font-weight: 600;
}
.dshcm-repoHint {
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
}
.dshcm-modalFoot {
  margin: 10px 0 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 1.5;
}
.dshcm-modalForm {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.dshcm-fieldLabel {
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  font-weight: 600;
}
.dshcm-nameInput {
  min-height: 0;
  height: 34px;
  padding: 6px 9px;
  resize: none;
  font-size: 13px;
}
.dshcm-nameInput:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-fieldHint {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}
.dshcm-modalError {
  max-height: 120px;
  overflow: auto;
  padding: 7px 9px;
  border-radius: 7px;
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent);
  color: var(--dsw-alias-state-error-primary);
  font-size: 12px;
  white-space: pre-wrap;
}
.dshcm-modalActions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 6px;
}
.dshcm-modalPrimary {
  border-color: var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-bg-base);
  font-weight: 600;
}
.dshcm-modalPrimary:hover:not(:disabled) {
  border-color: var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-bg-base);
  filter: brightness(1.06);
}
`,ne=["slots","locale","sidebarRightTabs","sidebarRight"];function le(t){let r=t.locale.bind(S),n=h=>a(Je,{...h,clientCtx:t}),e=h=>a(Ye,{...h,clientCtx:t}),i=h=>a(Ve,{...h,clientCtx:t}),c=h=>a(Ze,{...h,clientCtx:t});t.effect(()=>t.locale.register(S,"en",te),"commit-message: en locale"),t.effect(()=>t.locale.register(S,"zh",ze),"commit-message: zh locale"),t.effect(()=>t.sidebarRightTabs.register({id:O,kind:D,keepMounted:!0,title:()=>r("title")}),"commit-message: sidebar tab type"),t.effect(()=>t.slots.inject("sidebar.right.pane.tab",()=>t.slots.register({name:"sidebar.right.pane.tab",key:O,locale:S},n)),"commit-message: sidebar tab body"),t.effect(()=>t.slots.inject("sidebar.right.pane.tab.title",()=>t.slots.register({name:"sidebar.right.pane.tab.title",key:O,locale:S},c)),"commit-message: sidebar tab title"),t.effect(()=>t.sidebarRightTabs.register({id:X,kind:Pe,priority:"extension",patterns:["dsh-resource://commit-message-diff/[\\s\\S]+"],keepMounted:!0,title:h=>et(r,h)}),"commit-message: diff tab type"),t.effect(()=>t.slots.inject("sidebar.right.pane.tab",()=>t.slots.register({name:"sidebar.right.pane.tab",key:X,locale:S},e)),"commit-message: diff tab body"),t.effect(()=>t.slots.inject("conversation.input.right",()=>t.slots.register({name:"conversation.input.right",id:"commit-message-trigger",order:10,label:()=>r("title")},i)),"commit-message: composer trigger")}

    return module.exports;
  },
});
