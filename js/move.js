"use strict";function move(a,e,r,t,n,v,l){var o=n,i=setInterval(function(){o+=l*r,(0<l?v<=o:o<=v)&&(o=v,clearInterval(i));var t=o;"opacity"!=e&&(t+="px"),a.style[e]=t},t)}function move02(t,a,e,r){var n=parseFloat(getStyle(t,a)),v=n<e?1:-1,l=r/10;move(t,a,Math.abs(e-n)/l,10,n,e,v)}function move03(n,v,t){var a={};for(var e in v)a[e]=parseFloat(getStyle(n,e));var l={};for(var r in v)l[r]=a[r]<v[r]?1:-1;var o=t/10,i={};for(var f in v)i[f]=Math.abs(v[f]-a[f])/o;var c={};for(var s in v)c[s]=a[s];var y=setInterval(function(){for(var t in v)c[t]+=l[t]*i[t];for(var a in v)for(var e in(0<l[a]?c[a]>=v[a]:c[a]<=v[a])&&(c[a]=v[a],clearInterval(y)),v){var r=c[e];"opacity"!=e&&(r+="px"),n.style[e]=r}},10)}function fadeInout(t,a,e){var r=0,n=1/(e/10),v=setInterval(function(){1<=(r+=n)&&(r=1,window.clearInterval(v)),a.style.opacity=r,t.style.opacity=1-r},10)}function leftRight(t,a,e){var r=0,n=1366/(e/10),v=setInterval(function(){(r-=n)<-1366&&(r=-1366,window.clearInterval(v)),a.style.left=1366+r+"px",t.style.left=r+"px"},10)}function rightLeft(t,a,e){var r=-1366,n=1366/(e/10),v=setInterval(function(){0<=(r+=n)&&(r=0,window.clearInterval(v)),a.style.left=r+"px",t.style.left=1366+r+"px"},10)}