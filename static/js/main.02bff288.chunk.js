(this["webpackJsonpsuggest-pyproject-package-version-update"]=this["webpackJsonpsuggest-pyproject-package-version-update"]||[]).push([[0],{41:function(e,t,n){},42:function(e,t,n){},63:function(e,t){},65:function(e,t){},74:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),c=n(36),a=n.n(c),s=(n(41),n(42),n(3)),i=n(24),l=n.n(i),u='\n[tool.poetry]\nname = "testing_poetry"\nversion = "0.1.0"\ndescription = ""\nauthors = ["Bernardo Gomes <bgomesdeabreu@gmail.com>"]\n\n[tool.poetry.dependencies]\npython = "^3.8"\nrequests = ">=2.24.0"\nurllib3 = "*"\nchardet = ">=1.0.0"\ncertifi = "<2020.12.5"\n\n[tool.poetry.dev-dependencies]\nrequests = "^2.24.0"\npytest = ">=6.0.0"\n\n[build-system]\nrequires = ["poetry-core>=1.0.0"]\nbuild-backend = "poetry.core.masonry.api"\n';function d(e){var t=function(e){for(var t=[[">=",new RegExp("^>=\\w")],[">",new RegExp("^>\\w")],["<=",new RegExp("^<=\\w")],["<",new RegExp("^<\\w")],["!=",new RegExp("^!=\\w")],["^",new RegExp("^\\^\\w")],["~",new RegExp("^~\\w")],["*",new RegExp("^\\*")]],n=[],r=0;r<t.length;r++){var o=Object(s.a)(t[r],2),c=o[0];o[1].test(e)&&n.push(c)}return n.join(", ")}(e);return[">=","*"].includes(t)}function p(e,t,n,r){return e in r.tool.poetry[t]&&d(r.tool.poetry[t][e])&&(r.tool.poetry[t][e]=">=".concat(n)),r}function j(e,t){return function(e,t){return t.forEach((function(t){var n=Object(s.a)(t,2),r=n[0],o=n[1];p(r,"dependencies",o,e),p(r,"dev-dependencies",o,e)})),e}(e,function(e){return e.split("\n").filter((function(e){return!!e}))}(t).map((function(e){return e.replace(/\s+/g," ").split(" ").slice(0,2)})))}var b=n(0),m=function(){var e=Object(r.useState)(u),t=Object(s.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(u),a=Object(s.a)(c,2),i=a[0],d=a[1],p=Object(r.useState)(!1),m=Object(s.a)(p,2),f=m[0],h=m[1],g=Object(r.useState)("\ncertifi  2020.12.5 Python package for providing Mozilla's CA Bundle.\nchardet  3.0.4     Universal encoding detector for Python 2 and 3\nidna  2.10      Internationalized Domain Names in Applications (IDNA)\nrequests 2.25.1    Python HTTP for Humans.\nurllib3  1.25.11   HTTP library with thread-safe connection pooling, file post, and more.\npytest  6.2.5   pytest simple powerful testing with Python\n"),y=Object(s.a)(g,2),v=y[0],O=y[1];return Object(r.useEffect)((function(){try{var e=l.a.parse(n);h(!1),d(function(e){var t=j(e,v);return l.a.stringify(t).replaceAll("  ","")}(e))}catch(t){h(!0)}}),[n,v]),Object(b.jsxs)("div",{className:"row",children:[Object(b.jsxs)("div",{className:"col",children:[f?Object(b.jsx)("p",{className:"alert alert-danger",role:"alert",children:"PyProject.toml with problem."}):"",Object(b.jsxs)("div",{className:"mb-3",children:[Object(b.jsx)("label",{htmlFor:"pyProjectToml",className:"form-label",children:"PyProject.toml"}),Object(b.jsx)("textarea",{className:"form-control",id:"pyProjectToml",value:n,onChange:function(e){o(e.target.value)},rows:"20"})]})]}),Object(b.jsx)("div",{className:"col",children:Object(b.jsxs)("div",{className:"mb-3",children:[Object(b.jsx)("label",{htmlFor:"poetryShow",className:"form-label",children:"poetry show"}),Object(b.jsx)("textarea",{className:"form-control",id:"poetryShow",value:v,onChange:function(e){O(e.target.value)},rows:"20"})]})}),Object(b.jsx)("div",{className:"col",children:Object(b.jsxs)("div",{className:"mb-3",children:[Object(b.jsx)("label",{htmlFor:"result",className:"form-label",children:"New PyProject.toml"}),Object(b.jsx)("textarea",{className:"form-control",id:"dependencies",value:i,readOnly:!0,rows:"30"})]})})]})};var f=function(){return Object(b.jsx)("div",{className:"container-fluid",children:Object(b.jsx)(m,{})})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,75)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),r(e),o(e),c(e),a(e)}))};a.a.render(Object(b.jsx)(o.a.StrictMode,{children:Object(b.jsx)(f,{})}),document.getElementById("root")),h()}},[[74,1,2]]]);
//# sourceMappingURL=main.02bff288.chunk.js.map