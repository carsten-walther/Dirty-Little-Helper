(this["webpackJsonpdirty-little-helper"]=this["webpackJsonpdirty-little-helper"]||[]).push([[0],{90:function(e,t,n){"use strict";n.r(t);var a=n(2),i=n(0),r=n.n(i),c=n(11),s=n.n(c),o=n(19),l=n(15),u=n(26),d=n(25),h=n(16),p=n(18),b=n(13),j=n(38),g=n(122),v=n(126),O=n(127),f=n(128),x=n(129),m=n(130),y=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={value:0},a.state={value:0},a.handleChange=a.handleChange.bind(Object(b.a)(a)),a}return Object(l.a)(n,[{key:"handleChange",value:function(e,t){this.setState({value:t})}},{key:"render",value:function(){var e=this;return Object(a.jsx)(g.a,{position:"fixed",style:{top:"auto",bottom:0},children:Object(a.jsxs)(v.a,{showLabels:!0,value:this.state.value,onChange:function(t,n){return e.handleChange(t,n)},children:[Object(a.jsx)(O.a,{label:"Tools",icon:Object(a.jsx)(f.a,{}),component:r.a.forwardRef((function(e,t){return Object(a.jsx)(j.a,Object(p.a)(Object(p.a)({},e),{},{to:"/"}))}))}),Object(a.jsx)(O.a,{label:"Devices",icon:Object(a.jsx)(x.a,{}),component:r.a.forwardRef((function(e,t){return Object(a.jsx)(j.a,Object(p.a)(Object(p.a)({},e),{},{to:"/devices"}))}))}),Object(a.jsx)(O.a,{label:"Texts",icon:Object(a.jsx)(m.a,{}),component:r.a.forwardRef((function(e,t){return Object(a.jsx)(j.a,Object(p.a)(Object(p.a)({},e),{},{to:"/texts"}))}))})]})})}}]),n}(r.a.Component),k=n(135),w=n(136),D=n(137),C=n(43),S=n(132),A=n(91),T=n(138),E=n(131),q=n(133),G=n(134),M=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(o.a)(this,n),a=t.call(this,e),e={title:"",backTo:null,children:null},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return Object(a.jsx)(g.a,{position:"fixed",style:{top:0,bottom:"auto"},children:Object(a.jsxs)(E.a,{children:[Object(a.jsxs)(S.a,{container:!0,justify:"flex-start",children:[this.props.backTo?Object(a.jsx)(q.a,{edge:"start",color:"inherit",component:function(t){return Object(a.jsx)(j.a,Object(p.a)(Object(p.a)({},t),{},{to:e.props.backTo}))},children:Object(a.jsx)(G.a,{})}):null,Object(a.jsx)(C.a,{variant:"h6",children:this.props.title})]}),Object(a.jsx)(S.a,{container:!0,justify:"flex-end",children:this.props.children?this.props.children:null})]})})}}]),n}(r.a.Component);function W(e,t){return t||(t=30),e.length>t?e.substring(0,t-3)+"...":e}function F(e,t,n,a){var i=e+10,r=t+28,c=Math.round(window.screen.width/2-i/2),s=Math.round(window.screen.height/2-r/2);chrome.windows.create({url:n,type:"popup",width:i,height:r,left:c,top:s,focused:!0},(function(e){!function(e,t){chrome.webRequest.onBeforeSendHeaders.addListener((function(e){for(var n=0;n<e.requestHeaders.length;++n)if("User-Agent"===e.requestHeaders[n].name){e.requestHeaders[n].value=t;break}return{requestHeaders:e.requestHeaders}}),{urls:["<all_urls>"],windowId:e.id},["blocking","requestHeaders"])}(e,a),chrome.tabs.insertCSS(e.tabs[0].id,{runAt:"document_start",code:"::-webkit-scrollbar{width:9px!important;height:9px!important}::-webkit-scrollbar-button:start:decrement,::-webkit-scrollbar-button:end:increment{height:0;width:0;display:none}::-webkit-scrollbar-track-piece{margin:1px;padding:0;width:6px!important;height:5px!important;background:rgba(255,255,255,0.3)}::-webkit-scrollbar:hover{background:rgba(128,128,128,0.2)}::-webkit-scrollbar-thumb{margin:1px!important;border:2px solid transparent;width:5px!important;background-color:rgba(0,0,0,0.4)!important;z-index:9999;-webkit-border-radius:12px;background-clip:content-box}::-webkit-scrollbar-corner{background:rgba(255,255,255,0.3);border:1px solid transparent}::-webkit-scrollbar-thumb:hover{background-color:rgba(0,0,0,0.8)!important;border:2px solid transparent}::-webkit-scrollbar-thumb:active{background-color:rgba(0,0,0,0.6)!important;border:2px solid transparent}"})}))}var H=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))).actions=[{name:"Tools",actions:[{name:"Grid Overlay",func:e.toggleGridOverlay,params:[]},{name:"Outline Headings",func:e.toggleOutlines,params:["outlineHeadings"]},{name:"Outline Image Alternative Attributes",func:e.toggleOutlines,params:["outlineElementAttribute","img","alt"]},{name:"Outline Anchor Title Attributes",func:e.toggleOutlines,params:["outlineElementAttribute","a","title"]},{name:"Outline Button Title Attributes",func:e.toggleOutlines,params:["outlineElementAttribute","button","title"]}]},{name:"Validation",actions:[{name:"Validate CSS",func:e.validate,params:["http://jigsaw.w3.org/css-validator/validator?profile=css3&warning=0&uri="]},{name:"Validate HTML",func:e.validate,params:["http://validator.w3.org/check?verbose=1&uri="]},{name:"Validate Feed",func:e.validate,params:["http://validator.w3.org/feed/check.cgi?url="]},{name:"Validate Accessibility",func:e.validate,params:["http://wave.webaim.org/report#/"]},{name:"Validate Links",func:e.validate,params:["http://validator.w3.org/checklink?check=Check&hide_type=all&summary=on&uri="]},{name:"Validate Structured Data",func:e.validate,params:["https://search.google.com/test/rich-results?url="]}]}],e}return Object(l.a)(n,[{key:"toggleGridOverlay",value:function(){chrome.tabs.query({active:!0,currentWindow:!0},(function(e){chrome.tabs.sendMessage(e[0].id,{function:"toggleGridOverlay"})}))}},{key:"toggleOutlines",value:function(e){chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{function:e[0],selector:e[1],attribute:e[2]})}))}},{key:"validate",value:function(e){chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.create({url:e+t[0].url})}))}},{key:"render",value:function(){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(M,{title:"Dirty Little Helper"}),Object(a.jsx)("main",{children:this.actions.length>0?Object(a.jsx)(k.a,{subheader:Object(a.jsx)("li",{}),style:{backgroundColor:"inherit"},children:this.actions.map((function(e,t){return Object(a.jsx)("li",{style:{backgroundColor:"inherit"},children:Object(a.jsxs)("ul",{style:{backgroundColor:"inherit",padding:0},children:[Object(a.jsx)(w.a,{style:{backgroundColor:"#ddd"},children:Object(a.jsx)(D.a,{disableTypography:!0,primary:Object(a.jsx)(C.a,{style:{fontSize:18,fontWeight:"bold"},children:W(e.name,25)}),style:{paddingTop:18,paddingBottom:18,paddingRight:48,margin:0}})}),e.actions.length>0?Object(a.jsx)(S.a,{container:!0,style:{paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10},children:e.actions.map((function(e,t){return Object(a.jsx)(S.a,{item:!0,xs:4,style:{padding:10},children:Object(a.jsx)(A.a,{elevation:0,style:{margin:0,padding:0,height:95},children:Object(a.jsx)(T.a,{variant:"contained",color:"primary",onClick:function(){return e.func(e.params)},style:{width:"100%",height:"100%",lineHeight:1.25,textTransform:"none"},children:e.name})})},t)}))}):null]})},"section-".concat(t))}))}):null})]})}}]),n}(r.a.Component),B=n(12),R=n(10),N=n.n(R),V=n(14),I=n(21),K=n(139),L=n(92),P=n(141),z=n(152),J=n(144),_=n(145),U=n(146),Q=n(150),X=n(147),Y=n(140),Z=n(142),$=n(143),ee=window.localStorage;function te(e,t){return new Promise((function(n,a){try{ee&&ee.setItem(e,JSON.stringify(t)),n()}catch(i){a("Couldn't store object ".concat(i))}}))}function ne(e){return new Promise((function(t,n){try{if(ee){var a=ee.getItem(e);null!=a&&t(JSON.parse(a))}t(void 0)}catch(i){n("Couldn't get object: ".concat(i))}}))}var ae=new(function(){function e(){Object(o.a)(this,e),this.texts=[],this.storageKey="texts"}return Object(l.a)(e,[{key:"load",value:function(){var e=Object(I.a)(N.a.mark((function e(){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(this.texts.length>0)){e.next=4;break}return e.abrupt("return",this.texts);case 4:return e.next=6,ne(this.storageKey);case 6:if(e.t0=e.sent,e.t0){e.next=9;break}e.t0=[];case 9:return this.texts=e.t0,e.abrupt("return",this.texts);case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"save",value:function(){var e=Object(I.a)(N.a.mark((function e(){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,te(this.storageKey,this.texts);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"get",value:function(e){return this.texts.find((function(t){return t.id===e}))}},{key:"create",value:function(e){var t=Math.max.apply(Math,Object(V.a)(this.texts.map((function(e){return parseInt(e.id)}))).concat([0]))+1;this.texts.push({id:t.toString(),name:e.name,content:e.content}),this.save()}},{key:"update",value:function(e,t){var n=this.texts.indexOf(this.get(e));this.texts[n]=t,this.save()}},{key:"delete",value:function(e){var t=this.texts.indexOf(e);t>-1&&(this.texts.splice(t,1),this.save())}}]),e}()),ie=r.a.forwardRef((function(e,t){return Object(a.jsx)(K.a,Object(p.a)({direction:"up",ref:t},e))})),re=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={dialogOpen:!1,text:{id:void 0,name:void 0,content:void 0},texts:[]},a.state={dialogOpen:!1,text:{id:void 0,name:void 0,content:void 0},texts:[]},a.insertText=a.insertText.bind(Object(b.a)(a)),a.openNewDialog=a.openNewDialog.bind(Object(b.a)(a)),a.openEditDialog=a.openEditDialog.bind(Object(b.a)(a)),a.closeDialog=a.closeDialog.bind(Object(b.a)(a)),a.handleChange=a.handleChange.bind(Object(b.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(b.a)(a)),a.handleDelete=a.handleDelete.bind(Object(b.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=Object(I.a)(N.a.mark((function e(){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.t1=V.a,e.next=4,ae.load();case 4:e.t2=e.sent,e.t3=(0,e.t1)(e.t2),e.t4={texts:e.t3},e.t0.setState.call(e.t0,e.t4);case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"insertText",value:function(e){chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{function:"insertText",text:e.content})}))}},{key:"openNewDialog",value:function(){this.setState({text:{id:void 0,name:void 0,content:void 0},dialogOpen:!0})}},{key:"openEditDialog",value:function(e){this.setState({text:e,dialogOpen:!0})}},{key:"closeDialog",value:function(){this.setState({dialogOpen:!1})}},{key:"handleChange",value:function(e){this.setState({text:Object(p.a)(Object(p.a)({},this.state.text),{},Object(B.a)({},e.target.name,e.target.value))})}},{key:"handleSubmit",value:function(){var e=Object(I.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"undefined"===typeof this.state.text.id?ae.create(this.state.text):ae.update(this.state.text.id,this.state.text),e.t0=this,e.t1=V.a,e.next=5,ae.load();case 5:e.t2=e.sent,e.t3=(0,e.t1)(e.t2),e.t4={texts:e.t3},e.t0.setState.call(e.t0,e.t4),this.closeDialog(),t.preventDefault();case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleDelete",value:function(){var e=Object(I.a)(N.a.mark((function e(t){var n,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=V.a,e.next=3,ae.load();case 3:return e.t1=e.sent,n=(0,e.t0)(e.t1),(a=n.indexOf(t))>-1&&n.splice(a,1),e.next=9,ae.delete(t);case 9:return e.t2=this,e.t3=V.a,e.next=13,ae.load();case 13:e.t4=e.sent,e.t5=(0,e.t3)(e.t4),e.t6={texts:e.t5},e.t2.setState.call(e.t2,e.t6);case 17:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(M,{title:"Dummy Texts",children:Object(a.jsx)(q.a,{edge:"end",color:"inherit",onClick:this.openNewDialog,children:Object(a.jsx)(Y.a,{})})}),Object(a.jsx)("main",{children:this.state.texts.length>0?Object(a.jsx)(k.a,{children:this.state.texts.map((function(t,n){return Object(a.jsxs)(L.a,{dense:!0,button:!0,onClick:function(){return e.insertText(t)},title:"Insert",children:[Object(a.jsx)(D.a,{primary:t.name,secondary:W(t.content,70),style:{paddingRight:48}}),Object(a.jsxs)(P.a,{children:[Object(a.jsx)(q.a,{edge:"start",color:"inherit",title:"Edit Element",onClick:function(){return e.openEditDialog(t)},children:Object(a.jsx)(Z.a,{})}),Object(a.jsx)(q.a,{edge:"end",color:"inherit",title:"Delete Element",onClick:function(){window.confirm("Are you sure you wish to delete this item?")&&e.handleDelete(t)},children:Object(a.jsx)($.a,{})})]})]},n)}))}):null}),Object(a.jsx)(z.a,{open:this.state.dialogOpen,onClose:this.closeDialog,TransitionComponent:ie,keepMounted:!0,children:Object(a.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:this.handleSubmit,children:[Object(a.jsx)(J.a,{children:"Text"}),Object(a.jsxs)(_.a,{children:[Object(a.jsx)(U.a,{children:"Please enter a name and the text, that will be inserted."}),Object(a.jsx)(Q.a,{type:"text",label:"Name",name:"name",value:this.state.text.name||"",autoFocus:!0,fullWidth:!0,required:!0,onChange:this.handleChange}),Object(a.jsx)(Q.a,{label:"Content",name:"content",value:this.state.text.content||"",autoFocus:!0,fullWidth:!0,multiline:!0,rows:6,required:!0,onChange:this.handleChange})]}),Object(a.jsxs)(X.a,{children:[Object(a.jsx)(T.a,{onClick:this.closeDialog,color:"primary",children:"Cancel"}),Object(a.jsx)(T.a,{type:"submit",color:"primary",autoFocus:!0,children:"Save"})]})]})})]})}}]),n}(r.a.Component),ce=n(148),se=n(153),oe=n(149),le=new(function(){function e(){Object(o.a)(this,e),this.devices=[],this.storageKey="devices"}return Object(l.a)(e,[{key:"load",value:function(){var e=Object(I.a)(N.a.mark((function e(){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(this.devices.length>0)){e.next=4;break}return e.abrupt("return",this.devices);case 4:return e.next=6,ne(this.storageKey);case 6:if(e.t0=e.sent,e.t0){e.next=9;break}e.t0=[];case 9:return this.devices=e.t0,e.abrupt("return",this.devices);case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"save",value:function(){var e=Object(I.a)(N.a.mark((function e(){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,te(this.storageKey,this.devices);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"get",value:function(e){return this.devices.find((function(t){return t.id===e}))}},{key:"create",value:function(e){var t=Math.max.apply(Math,Object(V.a)(this.devices.map((function(e){return parseInt(e.id)}))).concat([0]))+1;this.devices.push({id:t.toString(),name:e.name,content:e.content}),this.save()}},{key:"update",value:function(e,t){var n=this.devices.indexOf(this.get(e));this.devices[n]=t,this.save()}},{key:"delete",value:function(e){var t=this.devices.indexOf(e);t>-1&&(this.devices.splice(t,1),this.save())}}]),e}()),ue=r.a.forwardRef((function(e,t){return Object(a.jsx)(K.a,Object(p.a)({direction:"up",ref:t},e))})),de=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={dialogOpen:!1,groupDialogOpen:!1,deviceDialogOpen:!1,group:{id:void 0,name:void 0,userAgents:[]},device:{id:void 0,name:void 0,group:void 0,userAgent:void 0,width:void 0,height:void 0},devices:[]},a.state={dialogOpen:!1,groupDialogOpen:!1,deviceDialogOpen:!1,group:{id:void 0,name:void 0,userAgents:[]},device:{id:void 0,name:void 0,group:void 0,userAgent:void 0,width:void 0,height:void 0},devices:[]},a.openDialog=a.openDialog.bind(Object(b.a)(a)),a.openEditDialog=a.openEditDialog.bind(Object(b.a)(a)),a.closeDialog=a.closeDialog.bind(Object(b.a)(a)),a.handleGroupChange=a.handleGroupChange.bind(Object(b.a)(a)),a.handleGroupSubmit=a.handleGroupSubmit.bind(Object(b.a)(a)),a.handleDeviceChange=a.handleDeviceChange.bind(Object(b.a)(a)),a.handleDeviceSubmit=a.handleDeviceSubmit.bind(Object(b.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=Object(I.a)(N.a.mark((function e(){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.t1=V.a,e.next=4,le.load();case 4:e.t2=e.sent,e.t3=(0,e.t1)(e.t2),e.t4={devices:e.t3},e.t0.setState.call(e.t0,e.t4);case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"openDialog",value:function(e){this.setState(Object(B.a)({group:{},device:{}},e,!0))}},{key:"openEditDialog",value:function(e,t){this.setState(Object(B.a)({group:t,device:t},e,!0))}},{key:"closeDialog",value:function(e){this.setState(Object(B.a)({},e,!1))}},{key:"handleGroupChange",value:function(e){this.setState({group:Object(p.a)(Object(p.a)({},this.state.group),{},Object(B.a)({},e.target.name,e.target.value))})}},{key:"handleDeviceChange",value:function(e){this.setState({device:Object(p.a)(Object(p.a)({},this.state.device),{},Object(B.a)({},e.target.name,e.target.value))})}},{key:"handleGroupSubmit",value:function(){var e=Object(I.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"undefined"===typeof this.state.group.id?le.create(this.state.group):le.update(this.state.group.id,this.state.group),e.t0=this,e.t1=V.a,e.next=5,le.load();case 5:e.t2=e.sent,e.t3=(0,e.t1)(e.t2),e.t4={devices:e.t3},e.t0.setState.call(e.t0,e.t4),this.closeDialog("groupDialogOpen"),this.closeDialog("dialogOpen"),t.preventDefault();case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleDeviceSubmit",value:function(){var e=Object(I.a)(N.a.mark((function e(t){var n,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,le.get(this.state.device.group);case 2:return n=e.sent,delete(a=this.state.device).group,n.userAgents?a.id=(Math.max.apply(Math,Object(V.a)(n.userAgents.map((function(e){return parseInt(e.id)}))).concat([0]))+1).toString():(a.id=1..toString(),n.userAgents=[]),n.userAgents.push(a),le.update(this.state.group.id,this.state.group),e.t0=this,e.t1=V.a,e.next=12,le.load();case 12:e.t2=e.sent,e.t3=(0,e.t1)(e.t2),e.t4={devices:e.t3},e.t0.setState.call(e.t0,e.t4),this.closeDialog("deviceDialogOpen"),this.closeDialog("dialogOpen"),t.preventDefault();case 19:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"openGroupBrowser",value:function(e){e.userAgents.forEach((function(e){chrome.tabs.query({active:!0,currentWindow:!0},(function(t){F(e.width,e.height,t[0].url,e.userAgent)}))}))}},{key:"openDeviceBrowser",value:function(e){chrome.tabs.query({active:!0,currentWindow:!0},(function(t){F(e.width,e.height,t[0].url,e.userAgent)}))}},{key:"deleteGroup",value:function(){var e=Object(I.a)(N.a.mark((function e(t){var n;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.state.devices.indexOf(t),this.state.devices.splice(n,1),le.devices=this.state.devices,e.next=5,le.save();case 5:return e.t0=this,e.t1=V.a,e.next=9,le.load();case 9:e.t2=e.sent,e.t3=(0,e.t1)(e.t2),e.t4={devices:e.t3},e.t0.setState.call(e.t0,e.t4);case 13:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"deleteDevice",value:function(){var e=Object(I.a)(N.a.mark((function e(t,n){var a,i;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=this.state.devices.indexOf(t),i=this.state.devices[a].userAgents.indexOf(n),this.state.devices[a].userAgents.splice(i,1),e.next=5,le.save();case 5:return e.t0=this,e.t1=V.a,e.next=9,le.load();case 9:e.t2=e.sent,e.t3=(0,e.t1)(e.t2),e.t4={devices:e.t3},e.t0.setState.call(e.t0,e.t4);case 13:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e,t=this;return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(M,{title:"Devices",children:Object(a.jsx)(q.a,{edge:"end",color:"inherit",onClick:function(){return t.openDialog("dialogOpen")},children:Object(a.jsx)(Y.a,{})})}),Object(a.jsx)("main",{children:this.state.devices.length>0?Object(a.jsx)(k.a,{subheader:Object(a.jsx)("li",{}),style:{backgroundColor:"inherit"},children:this.state.devices.map((function(e,n){var i;return Object(a.jsx)("li",{style:{backgroundColor:"inherit"},children:Object(a.jsxs)("ul",{style:{backgroundColor:"inherit",padding:0},children:[Object(a.jsxs)(w.a,{title:"Open all in Browser",style:{cursor:"pointer",backgroundColor:"#ddd"},children:[Object(a.jsx)(D.a,{disableTypography:!0,primary:Object(a.jsx)(C.a,{style:{fontSize:18,fontWeight:"bold"},children:W(e.name,25)}),onClick:function(){return t.openGroupBrowser(e)},style:{paddingTop:18,paddingBottom:18,paddingRight:48,margin:0}}),Object(a.jsxs)(P.a,{children:[Object(a.jsx)(q.a,{color:"inherit",title:"Edit Element",onClick:function(){return t.openEditDialog("groupDialogOpen",e)},children:Object(a.jsx)(Z.a,{})}),Object(a.jsx)(q.a,{edge:"end",color:"inherit",title:"Delete Element",onClick:function(){window.confirm("Are you sure you wish to delete this group?")&&t.deleteGroup(e)},children:Object(a.jsx)($.a,{})})]})]}),(null===(i=e.userAgents)||void 0===i?void 0:i.length)>0?Object(a.jsx)(k.a,{children:e.userAgents.map((function(n,i){return Object(a.jsxs)(L.a,{dense:!0,button:!0,onClick:function(){return t.openDeviceBrowser(n)},title:"Open in Browser",children:[Object(a.jsx)(D.a,{style:{paddingRight:48},primary:n.name,secondary:"Width ".concat(n.width,"px Height ").concat(n.height,"px")}),Object(a.jsxs)(P.a,{children:[Object(a.jsx)(q.a,{color:"inherit",title:"Edit Element",onClick:function(){return t.openEditDialog("deviceDialogOpen",n)},children:Object(a.jsx)(Z.a,{})}),Object(a.jsx)(q.a,{edge:"end",color:"inherit",title:"Delete Element",onClick:function(){window.confirm("Are you sure you wish to delete this item?")&&t.deleteDevice(e,n)},children:Object(a.jsx)($.a,{})})]})]},i)}))}):null]})},"section-".concat(n))}))}):null}),Object(a.jsxs)(z.a,{open:this.state.dialogOpen,onClose:function(){return t.closeDialog("dialogOpen")},TransitionComponent:ue,keepMounted:!0,children:[Object(a.jsx)(J.a,{children:"Add New Element"}),Object(a.jsxs)(k.a,{children:[Object(a.jsxs)(L.a,{autoFocus:!0,button:!0,onClick:function(){return t.openDialog("groupDialogOpen")},children:[Object(a.jsx)(ce.a,{children:Object(a.jsx)(se.a,{children:Object(a.jsx)(Y.a,{})})}),Object(a.jsx)(D.a,{primary:"Add Group"})]}),(null===(e=this.state.devices)||void 0===e?void 0:e.length)>0?Object(a.jsxs)(L.a,{autoFocus:!0,button:!0,onClick:function(){return t.openDialog("deviceDialogOpen")},children:[Object(a.jsx)(ce.a,{children:Object(a.jsx)(se.a,{children:Object(a.jsx)(Y.a,{})})}),Object(a.jsx)(D.a,{primary:"Add Device"})]}):null]})]}),Object(a.jsx)(z.a,{open:this.state.groupDialogOpen,onClose:function(){return t.closeDialog("groupDialogOpen")},TransitionComponent:ue,keepMounted:!0,children:Object(a.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:this.handleGroupSubmit,children:[Object(a.jsx)(J.a,{children:"Group"}),Object(a.jsxs)(_.a,{children:[Object(a.jsx)(U.a,{children:"Please enter the name of the group"}),Object(a.jsx)(Q.a,{type:"text",label:"Name",name:"name",value:this.state.group.name||"",autoFocus:!0,fullWidth:!0,required:!0,onChange:this.handleGroupChange})]}),Object(a.jsxs)(X.a,{children:[Object(a.jsx)(T.a,{onClick:function(){return t.closeDialog("groupDialogOpen")},color:"primary",children:"Cancel"}),Object(a.jsx)(T.a,{type:"submit",color:"primary",autoFocus:!0,children:"Save"})]})]})}),Object(a.jsx)(z.a,{open:this.state.deviceDialogOpen,onClose:function(){return t.closeDialog("deviceDialogOpen")},TransitionComponent:ue,keepMounted:!0,children:Object(a.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:this.handleDeviceSubmit,children:[Object(a.jsx)(J.a,{children:"Device"}),Object(a.jsxs)(_.a,{children:[Object(a.jsx)(U.a,{children:"Please enter the name, user agent and size of the new device."}),Object(a.jsx)(Q.a,{type:"text",label:"Name",name:"name",value:this.state.device.name||"",autoFocus:!0,fullWidth:!0,required:!0,onChange:this.handleDeviceChange}),Object(a.jsx)(Q.a,{select:!0,label:"Group",name:"group",value:this.state.device.group||"",autoFocus:!0,fullWidth:!0,required:!0,onChange:this.handleDeviceChange,children:this.state.devices.map((function(e){return Object(a.jsx)(oe.a,{value:e.id,children:e.name},e.id)}))}),Object(a.jsx)(Q.a,{type:"text",label:"UserAgent",name:"userAgent",value:this.state.device.userAgent||"",autoFocus:!0,fullWidth:!0,multiline:!0,rows:3,required:!0,onChange:this.handleDeviceChange}),Object(a.jsx)(Q.a,{type:"text",label:"Width",name:"width",value:this.state.device.width||"",autoFocus:!0,fullWidth:!0,required:!0,onChange:this.handleDeviceChange}),Object(a.jsx)(Q.a,{type:"text",label:"Height",name:"height",value:this.state.device.height||"",autoFocus:!0,fullWidth:!0,required:!0,onChange:this.handleDeviceChange})]}),Object(a.jsxs)(X.a,{children:[Object(a.jsx)(T.a,{onClick:function(){return t.closeDialog("deviceDialogOpen")},color:"primary",children:"Cancel"}),Object(a.jsx)(T.a,{type:"submit",color:"primary",autoFocus:!0,children:"Save"})]})]})})]})}}]),n}(r.a.Component),he=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(a.jsxs)(h.a,{children:[Object(a.jsx)(h.b,{path:"/",component:H,exact:!0}),Object(a.jsx)(h.b,{path:"/texts",component:re,exact:!0}),Object(a.jsx)(h.b,{path:"/devices",component:de,exact:!0}),Object(a.jsx)(y,{})]})}}]),n}(r.a.Component);s.a.render(Object(a.jsx)(he,{}),document.getElementById("root"))}},[[90,1,2]]]);
//# sourceMappingURL=main.2c9e60c3.chunk.js.map