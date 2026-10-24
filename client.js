window.__ModuleLoader__.load({
  id: "@local/dsh-commit-message",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
"use strict";var Se=Object.create;var z=Object.defineProperty;var Ae=Object.getOwnPropertyDescriptor;var Le=Object.getOwnPropertyNames;var Fe=Object.getPrototypeOf,Pe=Object.prototype.hasOwnProperty;var ze=(t,r)=>{for(var n in r)z(t,n,{get:r[n],enumerable:!0})},Y=(t,r,n,e)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of Le(r))!Pe.call(t,i)&&i!==n&&z(t,i,{get:()=>r[i],enumerable:!(e=Ae(r,i))||e.enumerable});return t};var Be=(t,r,n)=>(n=t!=null?Se(Fe(t)):{},Y(r||!t||!t.__esModule?z(n,"default",{value:t,enumerable:!0}):n,t)),Ee=t=>Y(z({},"__esModule",{value:!0}),t);var ot={};ze(ot,{apply:()=>ce,inject:()=>de});module.exports=Ee(ot);var l=Be(require("react"),1),a=l.createElement,T="dshCommitMessage",ae="/__dsh/commit-message",O="source-control",D="@local/dsh-commit-message",He="source-control-diff",ee="@local/dsh-commit-message/diff",se={title:"Source control",messageLabel:"Commit message",messagePlaceholder:'Message ({key} to commit on "{branch}")',changes:"Changes",showChanges:"Show changes in {path}",openChangesFailed:"Could not open the changes for {path}.",diffTab:"Changes: {name}",diffLoading:"Loading changes\u2026",diffFailed:"Could not load the changes for this file.",diffRetry:"Retry",diffEmpty:"No textual changes to show.",diffBinary:"This is a binary file; the changes are not shown.",diffTruncated:"The diff is truncated.",diffOpenFile:"Open file",diffOpenFileAria:"Open {path} in the file viewer",diffRefreshAria:"Refresh the changes for this file",diffAdded:"{count} added",diffRemoved:"{count} removed",showPanel:"Toggle source control panel",generate:"Generate",generating:"Generating\u2026",refresh:"Refresh changes",refreshAria:"Refresh the Git working tree status",commit:"Commit",committing:"Committing\u2026",pushOne:"Push 1 commit",pushMany:"Push {count} commits",pushing:"Pushing\u2026",pushAria:"Push unpushed commits to the upstream branch",githubOpen:"Open the GitHub repository",githubCreate:"Create a GitHub repository",githubModalTitle:"Connect to GitHub",githubModalDescription:"This repository is not connected to GitHub yet. Create a repository to publish it.",githubPrivate:"Create private repo",githubPublic:"Create public repo",githubPrivateHint:"Only you and your collaborators can see it.",githubPublicHint:"Anyone can see it.",githubCreateTitlePrivate:"Create private repository",githubCreateTitlePublic:"Create public repository",githubNameLabel:"Repository name",githubNameHint:"Letters, numbers, hyphens, underscores, and dots are allowed.",githubNameRequired:"Enter a repository name.",githubNameInvalid:"Enter a valid repository name.",githubCreateButton:"Create",githubCreating:"Creating\u2026",githubBack:"Back",githubClose:"Close",githubCreated:"Created {url}.",githubCreatedPushed:"Created {url} and pushed the current branch.",githubCreatedNoCommit:"Created {url}. Commit your changes, then push.",githubCreatedPushFailed:"Created {url}, but the push failed: {error}",githubFailed:"Could not create the repository.",githubAuthHint:"Creating a repository uses the GitHub CLI. Install `gh` and run `gh auth login` first.",unpushedCommits:"Unpushed commits",pushedOne:"Pushed 1 commit to {upstream}.",pushedMany:"Pushed {count} commits to {upstream}.",placeholder:"Generate a message, or write one yourself. Committing stages and commits all current changes.",checking:"Checking the working tree\u2026",notRepo:"This session is not in a Git repository.",noChanges:"No uncommitted changes.",oneFile:"1 changed file",files:"{count} changed files",generated:"Message generated. Review it, then commit.",committed:"Committed {hash}.",generateAria:"Generate a commit message from the current changes",commitAria:"Commit all current changes with this message",detached:"detached HEAD",hostOutdated:"The running Host is using an older version of the source-control plugin. Restart the Host or reload the plugin, then try again.",restart:"Restart",restartTitle:"Restart DeepSeek Harness",restarting:"Restarting\u2026",restartFailed:"Could not restart the harness.",requestFailed:"The commit message request failed.",networkFailed:"Could not reach the Harness host.",unreadable:"The commit message endpoint returned an unreadable response."},Me={title:"\u6E90\u4EE3\u7801\u7BA1\u7406",messageLabel:"\u63D0\u4EA4\u4FE1\u606F",messagePlaceholder:"\u63D0\u4EA4\u4FE1\u606F\uFF08{key} \u5728\u201C{branch}\u201D\u4E0A\u63D0\u4EA4\uFF09",changes:"\u66F4\u6539",showChanges:"\u67E5\u770B {path} \u7684\u66F4\u6539",openChangesFailed:"\u65E0\u6CD5\u6253\u5F00 {path} \u7684\u66F4\u6539\u3002",diffTab:"\u66F4\u6539\uFF1A{name}",diffLoading:"\u6B63\u5728\u52A0\u8F7D\u66F4\u6539\u2026",diffFailed:"\u65E0\u6CD5\u52A0\u8F7D\u6B64\u6587\u4EF6\u7684\u66F4\u6539\u3002",diffRetry:"\u91CD\u8BD5",diffEmpty:"\u6CA1\u6709\u53EF\u663E\u793A\u7684\u6587\u672C\u66F4\u6539\u3002",diffBinary:"\u8FD9\u662F\u4E8C\u8FDB\u5236\u6587\u4EF6\uFF0C\u4E0D\u663E\u793A\u66F4\u6539\u3002",diffTruncated:"\u5DEE\u5F02\u5DF2\u622A\u65AD\u3002",diffOpenFile:"\u6253\u5F00\u6587\u4EF6",diffOpenFileAria:"\u5728\u6587\u4EF6\u67E5\u770B\u5668\u4E2D\u6253\u5F00 {path}",diffRefreshAria:"\u5237\u65B0\u6B64\u6587\u4EF6\u7684\u66F4\u6539",diffAdded:"\u65B0\u589E {count} \u884C",diffRemoved:"\u5220\u9664 {count} \u884C",showPanel:"\u5207\u6362\u6E90\u4EE3\u7801\u7BA1\u7406\u9762\u677F",generate:"\u751F\u6210",generating:"\u6B63\u5728\u751F\u6210\u2026",refresh:"\u5237\u65B0\u66F4\u6539",refreshAria:"\u5237\u65B0 Git \u5DE5\u4F5C\u533A\u72B6\u6001",commit:"\u63D0\u4EA4",committing:"\u6B63\u5728\u63D0\u4EA4\u2026",pushOne:"\u63A8\u9001 1 \u4E2A\u63D0\u4EA4",pushMany:"\u63A8\u9001 {count} \u4E2A\u63D0\u4EA4",pushing:"\u6B63\u5728\u63A8\u9001\u2026",pushAria:"\u5C06\u672A\u63A8\u9001\u7684\u63D0\u4EA4\u63A8\u9001\u5230\u4E0A\u6E38\u5206\u652F",githubOpen:"\u6253\u5F00 GitHub \u4ED3\u5E93",githubCreate:"\u521B\u5EFA GitHub \u4ED3\u5E93",githubModalTitle:"\u8FDE\u63A5\u5230 GitHub",githubModalDescription:"\u6B64\u4ED3\u5E93\u5C1A\u672A\u8FDE\u63A5\u5230 GitHub\u3002\u521B\u5EFA\u4E00\u4E2A\u4ED3\u5E93\u6765\u53D1\u5E03\u5B83\u3002",githubPrivate:"\u521B\u5EFA\u79C1\u6709\u4ED3\u5E93",githubPublic:"\u521B\u5EFA\u516C\u5F00\u4ED3\u5E93",githubPrivateHint:"\u53EA\u6709\u4F60\u548C\u534F\u4F5C\u8005\u53EF\u4EE5\u770B\u5230\u3002",githubPublicHint:"\u4EFB\u4F55\u4EBA\u90FD\u53EF\u4EE5\u770B\u5230\u3002",githubCreateTitlePrivate:"\u521B\u5EFA\u79C1\u6709\u4ED3\u5E93",githubCreateTitlePublic:"\u521B\u5EFA\u516C\u5F00\u4ED3\u5E93",githubNameLabel:"\u4ED3\u5E93\u540D\u79F0",githubNameHint:"\u5141\u8BB8\u4F7F\u7528\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u8FDE\u5B57\u7B26\u3001\u4E0B\u5212\u7EBF\u548C\u70B9\u3002",githubNameRequired:"\u8BF7\u8F93\u5165\u4ED3\u5E93\u540D\u79F0\u3002",githubNameInvalid:"\u8BF7\u8F93\u5165\u6709\u6548\u7684\u4ED3\u5E93\u540D\u79F0\u3002",githubCreateButton:"\u521B\u5EFA",githubCreating:"\u6B63\u5728\u521B\u5EFA\u2026",githubBack:"\u8FD4\u56DE",githubClose:"\u5173\u95ED",githubCreated:"\u5DF2\u521B\u5EFA {url}\u3002",githubCreatedPushed:"\u5DF2\u521B\u5EFA {url} \u5E76\u63A8\u9001\u4E86\u5F53\u524D\u5206\u652F\u3002",githubCreatedNoCommit:"\u5DF2\u521B\u5EFA {url}\u3002\u63D0\u4EA4\u66F4\u6539\u540E\u518D\u63A8\u9001\u3002",githubCreatedPushFailed:"\u5DF2\u521B\u5EFA {url}\uFF0C\u4F46\u63A8\u9001\u5931\u8D25\uFF1A{error}",githubFailed:"\u65E0\u6CD5\u521B\u5EFA\u4ED3\u5E93\u3002",githubAuthHint:"\u521B\u5EFA\u4ED3\u5E93\u9700\u8981\u4F7F\u7528 GitHub CLI\u3002\u8BF7\u5148\u5B89\u88C5 `gh` \u5E76\u8FD0\u884C `gh auth login`\u3002",unpushedCommits:"\u672A\u63A8\u9001\u7684\u63D0\u4EA4",pushedOne:"\u5DF2\u5C06 1 \u4E2A\u63D0\u4EA4\u63A8\u9001\u5230 {upstream}\u3002",pushedMany:"\u5DF2\u5C06 {count} \u4E2A\u63D0\u4EA4\u63A8\u9001\u5230 {upstream}\u3002",placeholder:"\u751F\u6210\u4E00\u6761\u63D0\u4EA4\u4FE1\u606F\uFF0C\u6216\u81EA\u5DF1\u586B\u5199\u3002\u63D0\u4EA4\u65F6\u4F1A\u6682\u5B58\u5E76\u63D0\u4EA4\u6240\u6709\u5F53\u524D\u66F4\u6539\u3002",checking:"\u6B63\u5728\u68C0\u67E5\u5DE5\u4F5C\u533A\u2026",notRepo:"\u5F53\u524D\u4F1A\u8BDD\u4E0D\u5728 Git \u4ED3\u5E93\u4E2D\u3002",noChanges:"\u6CA1\u6709\u672A\u63D0\u4EA4\u7684\u66F4\u6539\u3002",oneFile:"1 \u4E2A\u6587\u4EF6\u5DF2\u66F4\u6539",files:"{count} \u4E2A\u6587\u4EF6\u5DF2\u66F4\u6539",generated:"\u63D0\u4EA4\u4FE1\u606F\u5DF2\u751F\u6210\uFF0C\u8BF7\u68C0\u67E5\u540E\u63D0\u4EA4\u3002",committed:"\u5DF2\u63D0\u4EA4 {hash}\u3002",generateAria:"\u6839\u636E\u5F53\u524D\u66F4\u6539\u751F\u6210\u63D0\u4EA4\u4FE1\u606F",commitAria:"\u4F7F\u7528\u8FD9\u6761\u4FE1\u606F\u63D0\u4EA4\u6240\u6709\u5F53\u524D\u66F4\u6539",detached:"\u6E38\u79BB HEAD",hostOutdated:"\u5F53\u524D\u8FD0\u884C\u7684 Host \u4ECD\u5728\u4F7F\u7528\u65E7\u7248\u6E90\u4EE3\u7801\u7BA1\u7406\u63D2\u4EF6\u3002\u8BF7\u91CD\u542F Host \u6216\u91CD\u65B0\u52A0\u8F7D\u63D2\u4EF6\u540E\u518D\u8BD5\u3002",restart:"\u91CD\u542F",restartTitle:"\u91CD\u542F DeepSeek Harness",restarting:"\u6B63\u5728\u91CD\u542F\u2026",restartFailed:"\u65E0\u6CD5\u91CD\u542F Harness\u3002",requestFailed:"\u63D0\u4EA4\u4FE1\u606F\u8BF7\u6C42\u5931\u8D25\u3002",networkFailed:"\u65E0\u6CD5\u8FDE\u63A5\u5230 Harness \u4E3B\u673A\u3002",unreadable:"\u63D0\u4EA4\u4FE1\u606F\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6CD5\u89E3\u6790\u7684\u54CD\u5E94\u3002"};function B(t){let[,r]=l.useReducer(e=>e+1,0);l.useEffect(()=>t.locale.subscribe(r),[t]);let n=l.useMemo(()=>t.locale.bind(T),[t]);return l.useCallback(e=>{let i;try{i=n(e)}catch{i=e}return typeof i!="string"||i===e?se[e]??e:i},[n])}function v(t,r,n){let e=t(r);for(let[i,c]of Object.entries(n))e=e.replaceAll(`{${i}}`,String(c));return e}function N(t){let r=Array.isArray(t.commits)?t.commits.slice(0,8).map(e=>({hash:typeof e?.hash=="string"?e.hash:"",shortHash:typeof e?.shortHash=="string"?e.shortHash:"",subject:typeof e?.subject=="string"?e.subject:"",author:typeof e?.author=="string"?e.author:"",timestamp:Number(e?.timestamp)||0})).filter(e=>e.hash):[],n=Array.isArray(t.files)?t.files.slice(0,500).map(e=>({path:typeof e?.path=="string"?e.path:"",workspacePath:typeof e?.workspacePath=="string"?e.workspacePath:null,status:typeof e?.status=="string"?e.status:"",untracked:!!e?.untracked,staged:!!e?.staged,unstaged:!!e?.unstaged})).filter(e=>e.path):[];return{isRepo:!!t.isRepo,cwd:typeof t.cwd=="string"?t.cwd:"",top:typeof t.top=="string"?t.top:"",branch:typeof t.branch=="string"?t.branch:"",upstream:typeof t.upstream=="string"?t.upstream:"",ahead:Number(t.ahead)||0,behind:Number(t.behind)||0,hasCommits:!!t.hasCommits,githubUrl:typeof t.githubUrl=="string"?t.githubUrl:null,commits:r,files:n,changedFiles:Number(t.changedFiles)||0,stagedFiles:Number(t.stagedFiles)||0,unstagedFiles:Number(t.unstagedFiles)||0,untrackedFiles:Number(t.untrackedFiles)||0}}function re(t,r,n){let i=n.replace(/\\/g,"/").replace(/^(?:\.\/)+/,"").split("/").map(u=>encodeURIComponent(u).replace(/%3A/gi,":")).join("/"),c=encodeURIComponent(r).replace(/%3A/gi,":");return`dsh-resource://${t}/session/${c}/${i}`}function Ie(t,r){return re("file",t,r)}function De(t,r){return re("commit-message-diff",t,r)}function ie(t){let r="dsh-resource://commit-message-diff/session/";if(typeof t!="string"||!t.startsWith(r))return"";let n=t.slice(r.length),e=n.indexOf("/");return e===-1||e===n.length-1?"":n.slice(e+1).split("/").map(i=>{try{return decodeURIComponent(i)}catch{return i}}).join("/")}function oe(t){let r=String(t||"").replace(/\\/g,"/"),n=r.lastIndexOf("/");return n===-1?r:r.slice(n+1)}function ne(t){let r=String(t||"");return r&&(r.startsWith("session-")?r:`session-${r}`)}function Oe(t){let r=t.replace(/\\/g,"/"),n=r.lastIndexOf("/");return n===-1?{name:r,directory:""}:{name:r.slice(n+1),directory:r.slice(0,n)}}function te(t){return t.untracked?"U":t.status.includes("D")?"D":t.status.includes("R")?"R":t.status.includes("C")?"C":t.status.includes("A")?"A":"M"}function je(t){if(!t)return"";try{return new Date(t*1e3).toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return""}}async function Ge(t,r,n,e){let i;try{i=await fetch(ae,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:"diff",sessionId:t,path:r}),signal:n})}catch(u){throw u&&u.name==="AbortError"?u:new Error(e("networkFailed"))}let c;try{c=await i.json()}catch{throw new Error(e("unreadable"))}if(!i.ok||!c||c.ok!==!0)throw new Error(c&&typeof c.error=="string"&&c.error||e("requestFailed"));return c}function Ue(t,r){return r?r.isRepo?r.changedFiles===0?t("noChanges"):r.changedFiles===1?t("oneFile"):v(t,"files",{count:r.changedFiles}):t("notRepo"):t("checking")}function le(){return a("svg",{width:15,height:15,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("path",{d:"M4.5 3.5v9"}),a("circle",{cx:4.5,cy:3.5,r:1.7}),a("circle",{cx:11.5,cy:12.5,r:1.7}),a("path",{d:"M11.5 10.8V8.5a3 3 0 0 0-3-3H7.2"}))}function qe(){return a("svg",{width:14,height:14,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("path",{d:"M8 1.8l1.1 3.1L12.2 6l-3.1 1.1L8 10.2 6.9 7.1 3.8 6l3.1-1.1L8 1.8z"}),a("path",{d:"M12.6 10.2l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7z"}))}function We(){return a("svg",{width:14,height:14,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("path",{d:"M13 8a5 5 0 1 1-1.5-3.5"}),a("path",{d:"M13 2.8v3.4H9.6"}))}function Ke(){return a("svg",{width:14,height:14,viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":!0,focusable:!1},a("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"}))}function $e(){return a("svg",{width:15,height:15,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("rect",{x:3.2,y:7,width:9.6,height:6.8,rx:1.5}),a("path",{d:"M5.4 7V5.2a2.6 2.6 0 0 1 5.2 0V7"}))}function _e(){return a("svg",{width:15,height:15,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("circle",{cx:8,cy:8,r:5.6}),a("path",{d:"M2.4 8h11.2"}),a("path",{d:"M8 2.4c1.8 1.5 2.7 3.4 2.7 5.6S9.8 12.1 8 13.6C6.2 12.1 5.3 10.2 5.3 8S6.2 3.9 8 2.4z"}))}function Ve(){return a("svg",{width:13,height:13,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,focusable:!1},a("path",{d:"M4 4l8 8M12 4l-8 8"}))}function Ze(){return a("svg",{width:14,height:14,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("path",{d:"M8 10V2.5"}),a("path",{d:"M5.2 5.3L8 2.5l2.8 2.8"}),a("path",{d:"M2.8 10.5v2.2c0 .4.3.8.8.8h8.8c.5 0 .8-.4.8-.8v-2.2"}))}function Je(){return a("svg",{width:14,height:14,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1},a("path",{d:"M3 8.5l3.2 3.2L13 5"}))}function Qe(t){return a("svg",{width:12,height:12,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:!1,style:{transform:t.open?"rotate(90deg)":"none",transition:"transform 120ms ease"}},a("path",{d:"M6 4l4 4-4 4"}))}function Xe(t){let r=B(t.clientCtx);function n(){try{let e=t.clientCtx.sidebarRight,i=e.active();if(e.isExpanded()&&i?.kind===O){e.toggleExpanded();return}e.openTab(O)}catch(e){console.error("commit-message: could not toggle the right sidebar",e)}}return a("button",{type:"button",className:"dshcm-trigger",onClick:n,"aria-label":r("showPanel"),title:r("showPanel")},a(le))}function Ye(t){let r=B(t.clientCtx);return a("span",{className:"dshcm-tabTitle"},a(le),a("span",null,r("title")))}function et(t){let r=t.sessionId,n=ne(r),e=B(t.clientCtx),[i,c]=l.useState(null),[u,S]=l.useState(""),[x,y]=l.useState("status"),[C,p]=l.useState(null),[A,j]=l.useState(!0),[d,g]=l.useState(null),[L,F]=l.useState(!1),b=l.useRef(null),w=l.useRef(null),f=l.useRef("status"),G=l.useRef(n),U=l.useRef(null),E=l.useRef(null),q=l.useRef(!1);l.useEffect(()=>{f.current=x},[x]);let W=!!d,P=d?d.step:null;l.useEffect(()=>{if(!W)return;let s=o=>{o.key==="Escape"&&P!=="creating"&&(o.preventDefault(),g(null))};return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[W,P]),l.useEffect(()=>{if(!d)return;let s=P==="choose"?E.current?.querySelector("[data-github-option]"):E.current?.querySelector("input");s&&typeof s.focus=="function"&&s.focus()},[P]),l.useEffect(()=>{q.current&&!d&&U.current?.focus(),q.current=!!d},[d]);let k=l.useCallback(async(s,o,h)=>{let m;try{m=await fetch(ae,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:s,sessionId:n,...o}),signal:h})}catch(I){throw I&&I.name==="AbortError"?I:new Error(e("networkFailed"))}let R;try{R=await m.json()}catch{throw new Error(e("unreadable"))}if(!m.ok||!R||R.ok!==!0)throw new Error(R&&typeof R.error=="string"&&R.error||e("requestFailed"));return R},[n,e]);l.useEffect(()=>{let s=G.current!==n;G.current=n;let o=!0,h=new AbortController;return s&&(c(null),S(""),p(null),g(null)),y("status"),k("status",{},h.signal).then(m=>{o&&c(N(m))}).catch(m=>{!o||m&&m.name==="AbortError"||p({kind:"error",text:m instanceof Error?m.message:String(m)})}).finally(()=>{o&&y(null)}),()=>{o=!1,h.abort()}},[n]),l.useEffect(()=>()=>{b.current&&b.current.abort()},[]),l.useEffect(()=>{let s=()=>{if(document.visibilityState!=="visible"||f.current)return;w.current&&w.current.abort();let o=new AbortController;w.current=o,k("status",{},o.signal).then(h=>c(N(h))).catch(()=>{}).finally(()=>{w.current===o&&(w.current=null)})};return window.addEventListener("focus",s),document.addEventListener("visibilitychange",s),()=>{window.removeEventListener("focus",s),document.removeEventListener("visibilitychange",s),w.current&&w.current.abort()}},[k]);async function ue(){if(!x){y("status"),p(null);try{let s=await k("status",{});c(N(s))}catch(s){p({kind:"error",text:s instanceof Error?s.message:String(s)})}finally{y(null)}}}function he(s){if(s.path)try{t.clientCtx.sidebarRight.openResource(De(r,s.path),{params:{sessionId:r,path:s.path,workspacePath:s.workspacePath,status:s.status,letter:te(s),untracked:s.untracked,staged:s.staged,unstaged:s.unstaged}})}catch(o){console.error("commit-message: could not open the file changes",o),p({kind:"error",text:v(e,"openChangesFailed",{path:s.path})})}}function pe(){if(!i||!i.isRepo)return;if(i.githubUrl){window.open(i.githubUrl,"_blank","noopener,noreferrer");return}if(i.githubUrl===null){p({kind:"error",text:e("hostOutdated")});return}let s=oe(i.top||i.cwd)||"repository";g({step:"choose",visibility:"private",name:s,error:""})}function K(s){g(o=>o&&{...o,visibility:s,step:"name",error:""})}function me(){g(null)}function fe(s){g(o=>o&&{...o,name:s,error:""})}async function $(){if(!d||d.step==="creating")return;let s=d.name.trim();if(!s){g(o=>o&&{...o,error:e("githubNameRequired")});return}if(!/^[A-Za-z0-9][A-Za-z0-9._-]*(?:\/[A-Za-z0-9][A-Za-z0-9._-]*)?$/.test(s)){g(o=>o&&{...o,error:e("githubNameInvalid")});return}g(o=>o&&{...o,step:"creating",error:""});try{let o=await k("create-github",{name:s,visibility:d.visibility});c(N(o));let h=o.githubUrl||"",m;o.pushed?m=v(e,"githubCreatedPushed",{url:h}):o.pushError?m=v(e,"githubCreatedPushFailed",{url:h,error:o.pushError}):o.hasCommits?m=v(e,"githubCreated",{url:h}):m=v(e,"githubCreatedNoCommit",{url:h}),p({kind:o.pushError?"error":"success",text:m}),g(null)}catch(o){g(h=>h&&{...h,step:"name",error:o instanceof Error?o.message:String(o)})}}let H=!!(i&&i.isRepo&&i.changedFiles>0)&&!x,M=H&&u.trim().length>0,_=!!(i&&i.hasCommits&&i.ahead>0)&&!x;async function ge(){if(!H)return;let s=new AbortController;b.current=s,y("generate"),p(null);try{let o=await k("generate",{},s.signal);S(String(o.message||"")),c(N(o)),p({kind:"success",text:e("generated")})}catch(o){if(o&&o.name==="AbortError")return;p({kind:"error",text:o instanceof Error?o.message:String(o)})}finally{b.current===s&&(b.current=null),y(null)}}async function V(){if(M){y("commit"),p(null);try{let s=await k("commit",{message:u.trim()});c(N(s)),S(""),p({kind:"success",text:v(e,"committed",{hash:s.hash||"HEAD"})})}catch(s){p({kind:"error",text:s instanceof Error?s.message:String(s)})}finally{y(null)}}}async function be(){if(_){y("push"),p(null);try{let s=await k("push",{});c(N(s));let o=Number(s.pushed)||1,h=s.upstream||"upstream";p({kind:"success",text:v(e,o===1?"pushedOne":"pushedMany",{count:o,upstream:h})})}catch(s){p({kind:"error",text:s instanceof Error?s.message:String(s)})}finally{y(null)}}}async function xe(){if(!L){F(!0);try{await k("restart-harness",{}),p({kind:"info",text:e("restarting")})}catch(s){F(!1),p({kind:"error",text:s instanceof Error&&s.message?s.message:e("restartFailed")})}}}function ye(s){(s.metaKey||s.ctrlKey)&&s.key==="Enter"&&M&&(s.preventDefault(),V())}let we=Ue(e,i),ve=typeof navigator<"u"&&/Mac|iPhone|iPad/.test(navigator.platform)?"\u2318Enter":"Ctrl+Enter",ke=i&&i.isRepo?v(e,"messagePlaceholder",{key:ve,branch:i.branch||e("detached")}):e("placeholder"),Ce=!!(i&&i.isRepo&&i.hasCommits&&i.ahead>0),Z=i&&i.githubUrl?e("githubOpen"):e("githubCreate"),J=String(n).replace(/[^A-Za-z0-9_-]/g,"-"),Q=`dshcm-github-title-${J}`,Re=!!(C&&C.kind==="error"&&/no longer live|source-control plugin|源代码管理插件/i.test(C.text)),X=`dshcm-github-name-${J}`,Ne=i&&i.isRepo?a("div",{className:"dshcm-changes"},a("button",{type:"button",className:"dshcm-sectionToggle",onClick:()=>j(s=>!s),"aria-expanded":A},a(Qe,{open:A}),a("span",{className:"dshcm-sectionTitle"},e("changes")),a("span",{className:"dshcm-sectionCount"},String(i.changedFiles))),A?i.files.length>0?a("ul",{className:"dshcm-fileList"},i.files.map(s=>{let o=Oe(s.workspacePath||s.path),h=te(s),m=h==="D"?"deleted":h==="U"||h==="A"?"new":"modified";return a("li",{key:s.path},a("button",{type:"button",className:"dshcm-fileRow",onClick:()=>he(s),title:v(e,"showChanges",{path:s.path})},a("span",{className:"dshcm-fileText"},a("span",{className:"dshcm-fileName"},o.name),o.directory?a("span",{className:"dshcm-fileDir"},o.directory):null),a("span",{className:`dshcm-fileStatus dshcm-fileStatus--${m}`},h)))})):a("div",{className:"dshcm-empty"},e("noChanges")):null):null,Te=i&&i.isRepo&&i.commits.length>0?a("div",{className:"dshcm-commits"},a("div",{className:"dshcm-commitsHead"},a("span",{className:"dshcm-commitsTitle"},e("unpushedCommits")),i.upstream?a("span",{className:"dshcm-upstream"},i.upstream):null),a("ul",{className:"dshcm-commitList","aria-label":e("unpushedCommits")},i.commits.map(s=>a("li",{key:s.hash,className:"dshcm-commitRow",title:s.subject},a("code",{className:"dshcm-hash"},s.shortHash||s.hash.slice(0,7)),a("span",{className:"dshcm-subject"},s.subject),a("span",{className:"dshcm-meta"},[s.author,je(s.timestamp)].filter(Boolean).join(" \xB7 ")))))):null;return a(l.Fragment,null,a("style",null,it),a("div",{className:"dshcm-root",id:`dshcm-panel-${n}`,"data-session":n},a("div",{className:"dshcm-header"},a("span",{className:"dshcm-title"},e("title")),a("div",{className:"dshcm-headerActions"},a("button",{ref:U,type:"button",className:"dshcm-iconButton",disabled:!i||!i.isRepo||!!x,onClick:pe,"aria-label":Z,title:Z},a(Ke)),a("button",{type:"button",className:"dshcm-iconButton",disabled:!!x,onClick:ue,"aria-label":e("refreshAria"),title:e("refreshAria")},a(We)))),C?a("div",{className:`dshcm-feedback dshcm-feedback--${C.kind}`,role:"status","aria-live":"polite"},a("span",{className:"dshcm-feedbackText"},C.text),Re?a("button",{type:"button",className:"dshcm-restartButton",disabled:L,onClick:xe,title:e("restartTitle")},e(L?"restarting":"restart")):null):null,a("div",{className:"dshcm-body"},a("div",{className:"dshcm-message"},a("textarea",{className:"dshcm-input",value:u,rows:4,spellCheck:!0,placeholder:ke,disabled:!!x,onChange:s=>S(s.target.value),onKeyDown:ye,"aria-label":e("messageLabel")}),a("button",{type:"button",className:"dshcm-inlineGenerate",disabled:!H,onClick:ge,"aria-label":e(x==="generate"?"generating":"generateAria"),title:e(x==="generate"?"generating":"generateAria")},a(qe))),a("div",{className:"dshcm-actions"},a("button",{type:"button",className:"dshcm-button dshcm-commit",disabled:!M,onClick:V,"aria-label":e("commitAria"),title:e("commitAria")},a(Je),e(x==="commit"?"committing":"commit")),Ce?a("button",{type:"button",className:"dshcm-button dshcm-push",disabled:!_,onClick:be,"aria-label":e("pushAria"),title:e("pushAria")},a(Ze),x==="push"?e("pushing"):v(e,i.ahead===1?"pushOne":"pushMany",{count:i.ahead})):null),a("div",{className:"dshcm-statusLine","aria-live":"polite"},x==="status"?e("checking"):we),Ne,Te),d?a("div",{className:"dshcm-modalBackdrop",onMouseDown:s=>{s.target===s.currentTarget&&d.step!=="creating"&&g(null)}},a("div",{ref:E,className:"dshcm-modal",role:"dialog","aria-modal":"true","aria-labelledby":Q},a("div",{className:"dshcm-modalHead"},a("span",{className:"dshcm-modalTitle",id:Q},d.step==="choose"?e("githubModalTitle"):d.visibility==="private"?e("githubCreateTitlePrivate"):e("githubCreateTitlePublic")),a("button",{type:"button",className:"dshcm-iconButton",disabled:d.step==="creating",onClick:me,"aria-label":e("githubClose"),title:e("githubClose")},a(Ve))),d.step==="choose"?a(l.Fragment,null,a("p",{className:"dshcm-modalText"},e("githubModalDescription")),a("button",{type:"button",className:"dshcm-repoOption","data-github-option":"private",onClick:()=>K("private")},a("span",{className:"dshcm-repoIcon"},a($e)),a("span",{className:"dshcm-repoText"},a("span",{className:"dshcm-repoTitle"},e("githubPrivate")),a("span",{className:"dshcm-repoHint"},e("githubPrivateHint")))),a("button",{type:"button",className:"dshcm-repoOption","data-github-option":"public",onClick:()=>K("public")},a("span",{className:"dshcm-repoIcon"},a(_e)),a("span",{className:"dshcm-repoText"},a("span",{className:"dshcm-repoTitle"},e("githubPublic")),a("span",{className:"dshcm-repoHint"},e("githubPublicHint")))),a("p",{className:"dshcm-modalFoot"},e("githubAuthHint"))):a("div",{className:"dshcm-modalForm"},a("p",{className:"dshcm-modalText"},e("githubModalDescription")),a("label",{className:"dshcm-fieldLabel",htmlFor:X},e("githubNameLabel")),a("input",{id:X,className:"dshcm-input dshcm-nameInput",type:"text",value:d.name,spellCheck:!1,autoComplete:"off",disabled:d.step==="creating","aria-invalid":d.error?"true":void 0,onChange:s=>fe(s.target.value),onKeyDown:s=>{s.key==="Enter"&&(s.preventDefault(),$())}}),a("div",{className:"dshcm-fieldHint"},e("githubNameHint")),d.error?a("div",{className:"dshcm-modalError",role:"alert"},d.error):null,a("div",{className:"dshcm-modalActions"},a("button",{type:"button",className:"dshcm-button",disabled:d.step==="creating",onClick:()=>g(s=>s&&{...s,step:"choose",error:""})},e("githubBack")),a("button",{type:"button",className:"dshcm-button dshcm-modalPrimary",disabled:d.step==="creating"||!d.name.trim(),onClick:$},d.step==="creating"?e("githubCreating"):e("githubCreateButton")))))):null))}var tt=l.lazy(()=>require.async("./client.diff.js").then(t=>({default:t.DiffView}),t=>(console.error("commit-message: could not load the diff renderer",t),{default:at})));function at(){return a("div",{className:"dshcm-empty",style:{padding:"24px 14px"}},"The diff renderer could not be loaded. Reload the plugin to try again.")}function st(t){let r=B(t.clientCtx),{tab:n}=t.useTabInfo(),e=n.navigation.params??{},i=ie(n.contentId)||(typeof e.path=="string"?e.path:""),c=t.sessionId||e.sessionId,u=ne(c),S=n.navigation.revision,[x,y]=l.useState({phase:"loading",diff:"",truncated:!1,binary:!1,status:"",error:""}),[C,p]=l.useState(0);l.useEffect(()=>{let b=!0,w=new AbortController;return y(f=>({...f,phase:"loading",error:""})),Ge(u,i,w.signal,r).then(f=>{b&&y({phase:"ready",diff:typeof f.diff=="string"?f.diff:"",truncated:!!f.truncated,binary:!!f.binary,status:typeof f.status=="string"?f.status:"",error:""})}).catch(f=>{!b||f&&f.name==="AbortError"||y({phase:"error",diff:"",truncated:!1,binary:!1,status:"",error:f instanceof Error?f.message:String(f)})}),()=>{b=!1,w.abort()}},[u,i,S,C,r]);let A=l.useCallback((b,w)=>w?v(r,b,w):r(b),[r]),d=(typeof e.letter=="string"?e.letter:"")||(typeof e.status=="string"?e.status.trim():""),g=!!e.workspacePath&&!!u&&!String(d).includes("D");function L(){p(b=>b+1)}function F(){if(g)try{t.clientCtx.sidebarRight.openResource(Ie(c,e.workspacePath))}catch(b){console.error("commit-message: could not open file",b)}}return a(l.Suspense,{fallback:a("div",{className:"dshcm-empty",style:{padding:"24px 14px"}},r("diffLoading"))},a(tt,{path:i,params:e,state:x,canOpenFile:g,label:A,onRefresh:L,onOpenFile:F}))}function rt(t,r){let n=oe(ie(r))||"diff";return t("diffTab").replaceAll("{name}",n)}var it=`
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
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 0 0 8px;
  font-size: 12px;
}
.dshcm-feedbackText {
  flex: 1 1 auto;
  min-width: 0;
}
.dshcm-restartButton {
  flex: 0 0 auto;
  min-height: 22px;
  padding: 1px 7px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 6px;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 11px;
  font-weight: 550;
  cursor: pointer;
  transition: background 100ms ease, border-color 100ms ease;
}
.dshcm-restartButton:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-2);
  border-color: var(--dsw-alias-border-l3);
}
.dshcm-restartButton:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-restartButton:disabled {
  opacity: 0.55;
  cursor: default;
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
`,de=["slots","locale","sidebarRightTabs","sidebarRight"];function ce(t){let r=t.locale.bind(T),n=u=>a(et,{...u,clientCtx:t}),e=u=>a(st,{...u,clientCtx:t}),i=u=>a(Xe,{...u,clientCtx:t}),c=u=>a(Ye,{...u,clientCtx:t});t.effect(()=>t.locale.register(T,"en",se),"commit-message: en locale"),t.effect(()=>t.locale.register(T,"zh",Me),"commit-message: zh locale"),t.effect(()=>t.sidebarRightTabs.register({id:D,kind:O,keepMounted:!0,title:()=>r("title")}),"commit-message: sidebar tab type"),t.effect(()=>t.slots.inject("sidebar.right.pane.tab",()=>t.slots.register({name:"sidebar.right.pane.tab",key:D,locale:T},n)),"commit-message: sidebar tab body"),t.effect(()=>t.slots.inject("sidebar.right.pane.tab.title",()=>t.slots.register({name:"sidebar.right.pane.tab.title",key:D,locale:T},c)),"commit-message: sidebar tab title"),t.effect(()=>t.sidebarRightTabs.register({id:ee,kind:He,priority:"extension",patterns:["dsh-resource://commit-message-diff/[\\s\\S]+"],keepMounted:!0,title:u=>rt(r,u)}),"commit-message: diff tab type"),t.effect(()=>t.slots.inject("sidebar.right.pane.tab",()=>t.slots.register({name:"sidebar.right.pane.tab",key:ee,locale:T},e)),"commit-message: diff tab body"),t.effect(()=>t.slots.inject("conversation.input.right",()=>t.slots.register({name:"conversation.input.right",id:"commit-message-trigger",order:10,label:()=>r("title")},i)),"commit-message: composer trigger")}

    return module.exports;
  },
});
