"use strict";(self.webpackChunksamurai_way_ts=self.webpackChunksamurai_way_ts||[]).push([[312],{3312:function(n,e,r){r.r(e),r.d(e,{default:function(){return O}});var i=r(2791),t=r(364),s=r(1413),l=r(4942),u=r(885),a="Paginator_paginator__7XGpb",o="Paginator_pageNumber__OapAN",c="Paginator_selectedPage__UOXmZ",f=r(1694),d=r.n(f),g=r(184),h=function(n){for(var e=n.totalItemsCount,r=n.pageSize,t=n.currentPage,s=void 0===t?1:t,f=n.onPageChange,h=void 0===f?function(){}:f,m=n.potionSize,v=void 0===m?10:m,x=Math.ceil(e/r),j=[],p=1;p<=x;p++)j.push(p);(0,i.useEffect)((function(){return S(Math.ceil(s/v))}),[s]);var b=Math.ceil(x/v),P=(0,i.useState)(1),w=(0,u.Z)(P,2),C=w[0],S=w[1];null===C&&(C=1);var Z=(C-1)*v+1,k=C*v;return(0,g.jsxs)("div",{className:d()(a),children:[C>1&&(0,g.jsx)("button",{onClick:function(n){S(C-1)},children:"Prev"}),j.filter((function(n){return n>=Z&&n<=k})).map((function(n){return(0,g.jsx)("span",{className:d()((0,l.Z)({},c,s===n),o),onClick:function(e){h(n)},children:n},n)})),b>C&&(0,g.jsx)("button",{onClick:function(){S(C+1)},children:"Next"})]})},m=r(4977),v=r(8694),x=r(1523),j=function(n){var e=n.user,r=n.followingInProgress,i=n.unfollow,t=n.follow;return(0,g.jsxs)("div",{children:[(0,g.jsx)("span",{children:(0,g.jsxs)("div",{className:m.Z.flex,children:[(0,g.jsx)("div",{children:(0,g.jsx)(x.OL,{to:"/profile/"+e.id,children:(0,g.jsx)("img",{src:null!=e.photos.small?e.photos.small:v,className:m.Z.img})})}),(0,g.jsx)("div",{children:e.followed?(0,g.jsx)("button",{disabled:r.some((function(n){return n===e.id})),onClick:function(n){i(e.id)},children:" Unfollow "}):(0,g.jsx)("button",{disabled:r.some((function(n){return n===e.id})),onClick:function(n){t(e.id)},children:" Follow "})})]})}),(0,g.jsx)("span",{children:(0,g.jsxs)("span",{children:[(0,g.jsx)("div",{children:e.name}),(0,g.jsx)("div",{children:e.status})]})})]})},p=r(1603),b=r(5705),P=r(6916),w=function(n){return n.usersPage.users},C=((0,P.P1)(w,(function(n){return n.filter((function(n){return!0}))})),function(n){return n.usersPage.pageSize}),S=function(n){return n.usersPage.totalUsersCount},Z=function(n){return n.usersPage.currentPage},k=function(n){return n.usersPage.isFetching},_=function(n){return n.usersPage.followingInProgress},N=function(n){return n.usersPage.filter},y=function(n){return{}},F=i.memo((function(n){var e=(0,t.v9)(N);return(0,g.jsx)("div",{children:(0,g.jsx)(b.J9,{enableReinitialize:!0,initialValues:{term:e.term,friend:String(e.friend)},validate:y,onSubmit:function(e,r){var i=r.setSubmitting,t={term:e.term,friend:"null"===e.friend?null:"true"===e.friend};n.onFilterChanged(t),i(!1)},children:function(n){var e=n.isSubmitting;return(0,g.jsxs)(b.l0,{children:[(0,g.jsx)(b.gN,{type:"text",name:"term"}),(0,g.jsxs)(b.gN,{name:"friend",as:"select",children:[(0,g.jsx)("option",{value:"null",children:"All"}),(0,g.jsx)("option",{value:"true",children:"Only followed"}),(0,g.jsx)("option",{value:"false",children:"Only unfollowed"})]}),(0,g.jsx)("button",{type:"submit",disabled:e,children:"Find"})]})}})})})),I=r(9271),R=function(n){var e=(0,t.v9)(w),r=(0,t.v9)(S),l=(0,t.v9)(Z),u=(0,t.v9)(C),a=(0,t.v9)(N),o=(0,t.v9)(_),c=(0,t.I0)(),f=(0,I.k6)();(0,i.useEffect)((function(){var n=f.location.search,e=new URLSearchParams(n),r=e.get("term"),i=e.get("page"),t=e.get("friend"),o=l,d=a;switch(null!==i&&(o=Number(i)),null!==r&&(d=(0,s.Z)((0,s.Z)({},d),{},{term:r})),t){case"null":d=(0,s.Z)((0,s.Z)({},d),{},{friend:null});break;case"true":d=(0,s.Z)((0,s.Z)({},d),{},{friend:!0});break;case"false":d=(0,s.Z)((0,s.Z)({},d),{},{friend:!1})}c((0,p.Rf)(o,u,d))}),[]),(0,i.useEffect)((function(){var n={};a.term&&(n.term=a.term),null!==a.friend&&(n.friend=String(a.friend)),1!==l&&(n.page=String(l));var e=new URLSearchParams(n);f.push({pathname:"/developers",search:e.toString()})}),[a,l]);var d=function(n){c((0,p.ZN)(n))},m=function(n){c((0,p.fv)(n))};return(0,g.jsxs)("div",{children:[(0,g.jsx)(F,{onFilterChanged:function(n){c((0,p.Rf)(1,u,n))}}),(0,g.jsx)(h,{currentPage:l,onPageChange:function(n){c((0,p.Rf)(n,u,a))},totalItemsCount:r,pageSize:u}),(0,g.jsx)("div",{children:e.map((function(n){return(0,g.jsx)(j,{user:n,followingInProgress:o,unfollow:m,follow:d},n.id)}))})]})},z=r(8657),O=function(n){var e=(0,t.v9)(k);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("h2",{children:n.pageTitle}),e?(0,g.jsx)(z.L,{}):null,(0,g.jsx)(R,{})]})}},8694:function(n,e,r){n.exports=r.p+"static/media/Vladik.ecbbf61a7c6eb8413e3b.png"}}]);
//# sourceMappingURL=312.215ba5fe.chunk.js.map