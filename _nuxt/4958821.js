(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{395:function(t,e,n){"use strict";n.r(e);var d=n(271),l={data:function(){return{mask:"f2l",viewportRotations:[[1,30],[0,-34],[2,0]],width:80,height:80,advancedF2lth:{1:["Fw R Fw'"],2:["Fw R' Fw'"],3:["U R' F R F' R' U' R"],4:["U R2 U' R' U R U' R"],5:["U2 L2 U2 L U L' U L2"]},advancedF2loh:{7:["R U' R U2 R2 U' R2 U' R2"]}}},mounted:function(){var t=[];for(var e in this.advancedF2lth)t[e]={},t[e].mask=this.mask,t[e].viewportRotations=this.viewportRotations,t[e].width=this.width,t[e].height=this.height,t[e].case=this.advancedF2lth[e][0],d.cubePNG(document.getElementById("advancedF2lth"+e),t[e]);for(var n in this.advancedF2loh)t[n]={},t[n].mask=this.mask,t[n].viewportRotations=this.viewportRotations,t[n].width=this.width,t[n].height=this.height,t[n].case=this.advancedF2loh[n][0],d.cubePNG(document.getElementById("advancedF2loh"+n),t[n])}},v=n(20),component=Object(v.a)(l,(function(){var t=this,e=t._self._c;return e("div",[e("h2",[t._v("発展系F2L")]),t._v(" "),e("h3",[t._v("両手手順")]),t._v(" "),t._l(t.advancedF2lth,(function(n,d){return e("div",{key:d,staticClass:"columns is-mobile is-vcentered is-marginless"},[e("div",{staticClass:"column is-1 has-text-centered"},[t._v(t._s(d))]),t._v(" "),e("div",{staticClass:"column is-1-tablet is-2-mobile p-0"},[e("div",{attrs:{id:"advancedF2lth"+d}})]),t._v(" "),e("div",{staticClass:"column is-10-tablet is-9-mobile"},[e("div",[t._v(t._s(n[0]))])])])})),t._v(" "),e("h3",[t._v("片手手順")]),t._v(" "),t._l(t.advancedF2loh,(function(n,d){return e("div",{key:d,staticClass:"columns is-mobile is-vcentered is-marginless"},[e("div",{staticClass:"column is-1 has-text-centered"},[t._v(t._s(d))]),t._v(" "),e("div",{staticClass:"column is-1-tablet is-2-mobile p-0"},[e("div",{attrs:{id:"advancedF2loh"+d}})]),t._v(" "),e("div",{staticClass:"column is-10-tablet is-9-mobile"},[e("div",[t._v(t._s(n[0]))])])])}))],2)}),[],!1,null,null,null);e.default=component.exports}}]);