(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,t,n){e.exports=n(34)},28:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(20),l=n.n(o),r=(n(28),n(6)),i=n(7),u=n(9),s=n(8),h=n(10),d=n(12),m=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(c)))).handleSignInClick=function(){window.open("/auth/twitter","_self")},n.handleLogoutClick=function(){window.open("/auth/logout","_self"),n.props.handleNotAuthenticated()},n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.authenticated;return c.a.createElement("ul",{className:"menu"},c.a.createElement("li",null,c.a.createElement(d.b,{to:"/"},"Home")),e?c.a.createElement("li",{onClick:this.handleLogoutClick},"Logout"):c.a.createElement("li",{onClick:this.handleSignInClick},"Login"))}}]),t}(a.Component),p=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(c)))).state={user:{},error:null,authenticated:!1},n.handleNotAuthenticated=function(){n.setState({authenticated:!1})},n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/auth/login/success",{method:"GET",credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Credentials":!0}}).then(function(e){if(200===e.status)return e.json();throw new Error("failed to authenticate user")}).then(function(t){e.setState({authenticated:!0,user:t.user})}).catch(function(t){e.setState({authenticated:!1,error:"Failed to authenticate user"})})}},{key:"render",value:function(){var e=this.state.authenticated;return c.a.createElement("div",null,c.a.createElement(m,{authenticated:e,handleNotAuthenticated:this.handleNotAuthenticated}),c.a.createElement("div",null,e?c.a.createElement("div",null,c.a.createElement("h1",null,"You have login succcessfully!"),c.a.createElement("h2",null,"Welcome ",this.state.user.name,"!")):c.a.createElement("h1",null,"Welcome!")))}}]),t}(a.Component),f=n(14),w=function(){return c.a.createElement(d.a,null,c.a.createElement("div",null,c.a.createElement(f.a,{exact:!0,path:"/",component:p})))},v=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return c.a.createElement(w,null)}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[23,2,1]]]);
//# sourceMappingURL=main.1fc51c82.chunk.js.map