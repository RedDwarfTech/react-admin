(this["webpackJsonpreact-admin"]=this["webpackJsonpreact-admin"]||[]).push([[10],{183:function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"a",(function(){return s})),a.d(t,"c",(function(){return c}));var n=a(24),r=a(71);function o(e){var t={method:"post",url:"/manage/admin/user/login",data:e};return Object(r.a)(t,n.c)}function s(e){var t={method:"post",url:"/manage/user/v1/page",data:e};return Object(r.a)(t,n.b)}function c(e){var t={method:"post",url:"/manage/user/v1/pwd/edit",data:e};return Object(r.a)(t,n.a)}},546:function(e,t,a){},670:function(e,t,a){"use strict";a.r(t);a(66);var n=a(67),r=(a(75),a(73)),o=(a(132),a(137)),s=(a(86),a(92)),c=(a(87),a(90)),u=(a(88),a(83)),i=a(544),l=a.n(i),d=a(545),f=(a(111),a(110)),m=a(12),h=a(13),p=a(15),g=a(14),k=a(0),b=a.n(k),v=a(3),y=(a(546),a(385)),j=a(384),w=a(183),E=a(651).a.load(),I=function(e){Object(p.a)(a,e);var t=Object(g.a)(a);function a(){var e;Object(m.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={loading:!1},e.enterLoading=function(){e.setState({loading:!0})},e.handleLoginSuccess=function(t){if(t.token&&t.token.token){switch(t.username){case"admin":t.auth=0;break;default:t.auth=0}var a=t.token.accessToken;localStorage.setItem("token",a),localStorage.setItem("refreshToken",t.token.refreshToken),localStorage.setItem("accessToken",t.token.accessToken),localStorage.setItem("user",JSON.stringify(t)),e.enterLoading(),f.b.success("\u767b\u5f55\u6210\u529f!"),e.props.history.push("/")}},e.handleLoginSubmit=function(e){Object(d.a)(l.a.mark((function t(){var a,n,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E;case 2:return a=t.sent,t.next=5,a.get();case 5:n=t.sent,r={phone:e.username,password:e.password,deviceId:n.visitorId,app:6},Object(w.b)(r);case 8:case"end":return t.stop()}}),t)})))()},e.formRef=b.a.createRef(),e}return Object(h.a)(a,[{key:"componentWillUnmount",value:function(){u.a.destroy(),this.timer&&clearTimeout(this.timer)}},{key:"render",value:function(){var e=this.props.user;return this.handleLoginSuccess(e),b.a.createElement(n.a,{className:"login animated fadeIn"},b.a.createElement("div",{className:"model"},b.a.createElement("div",{className:"login-form"},b.a.createElement("h3",null,"\u540e\u53f0\u7ba1\u7406\u7cfb\u7edf"),b.a.createElement(c.a,null),b.a.createElement(o.a,{onFinish:this.handleLoginSubmit,ref:this.formRef},b.a.createElement(o.a.Item,{name:"username",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d!"}]},b.a.createElement(s.a,{prefix:b.a.createElement(y.a,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"\u7528\u6237\u540d"})),b.a.createElement(o.a.Item,{name:"password",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801"}]},b.a.createElement(s.a,{prefix:b.a.createElement(j.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:"\u5bc6\u7801"})),b.a.createElement(o.a.Item,null,b.a.createElement(r.a,{type:"primary",htmlType:"submit",className:"login-form-button",loading:this.state.loading},"\u767b\u5f55"))))))}}]),a}(k.Component),x=Object(v.g)(I);t.default=x},71:function(e,t,a){"use strict";a.d(t,"a",(function(){return f}));a(111);var n=a(110),r=a(153),o=a.n(r),s=a(25),c=a(24),u=!1,i=[],l=o.a.create({timeout:15e3});function d(){s.a.dispatch(Object(c.d)("")),window.location.href="/#/login"}function f(e,t){return l(e).then((function(e){if(e){var a=null==e.data.result||0===Object.keys(e.data.result).length?{}:e.data.result;s.a.dispatch(t(a))}})).catch((function(e){console.error(e)}))}l.defaults.headers.post["Content-Type"]="application/json",l.interceptors.request.use((function(e){var t=localStorage.getItem("accessToken");return t&&(e.headers["x-access-token"]=t),e}),(function(e){return Promise.reject(e)})),l.interceptors.response.use((function(e){if(200===e.status&&"200"===e.data.statusCode&&"200"===e.data.resultCode)return Promise.resolve(e);if("907"===e.data.statusCode)d();else if("904"===e.data.statusCode)d();else{if("00100100004016"!==e.data.resultCode){var t=e.data.msg;return n.b.error(t),Promise.reject(e)}!function(e){var t=e.config;if(u)return new Promise((function(e){i.push((function(a){t.baseURL="",t.headers["x-access-token"]=a,e(l(t))}))}));u=!0,function(){var e=localStorage.getItem("refreshToken");e||d();return function(e){return function(e){return l(e).then((function(e){if(e)return null==e.data.result||0===Object.keys(e.data.result).length?{}:e.data.result})).catch((function(e){console.error(e)}))}({method:"post",url:"/manage/auth/access_token/refresh",data:{deviceId:"xxxxxx",app:6,refreshToken:e}})}(e)}().then((function(e){var a=e.accessToken;if(a)return localStorage.setItem("token",a),localStorage.setItem("accessToken",a),l.defaults.headers["x-access-token"]=a,i.forEach((function(e){return e(a)})),i=[],l(t)})).catch((function(e){console.error("refreshtoken error =>",e),d()})).finally((function(){u=!1}))}(e)}}),(function(e){switch(e.response.status){case 401:case 403:case 404:case 500:break;default:console.log("\u5176\u4ed6\u9519\u8bef\u4fe1\u606f")}return Promise.reject(e)}))}}]);
//# sourceMappingURL=login.37b67ed1.chunk.js.map