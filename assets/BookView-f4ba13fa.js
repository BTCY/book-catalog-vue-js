import{d as T,o as s,c as t,a,t as _,i as n,F as m,h as A,u as $,m as p,p as E,f as H,_ as M}from"./index-e292ce3d.js";import{a as N,D as F}from"./DetailsField-e9994eb4.js";const G=o=>(E("data-v-f8ff3e01"),o=o(),H(),o),R={key:0,class:"book-details-wrap"},j={class:"book-content-wrap"},q={class:"asaid-wrap"},z={class:"book-image-wrap"},J={key:0,class:"skeleton-book-image"},K=["src"],O={key:2,class:"book-image-no-pic"},Q={key:0,class:"asaid-button-link-wrap"},U={key:0,class:"price"},W={key:1,class:"price"},X=["href"],Y=["href"],Z={key:0,class:"info-wrap"},D=G(()=>a("div",{class:"skeleton-info-wrap"}," ",-1)),B=[D],x={key:1,class:"info-wrap"},ee={class:"fields-wrap"},oe=["innerHTML"],se={key:1,class:"info-description-no-desc"},te={class:"fields-wrap"},ie={key:1,class:"error"},le={key:2,class:"no-found"},ne={name:"BookDetails",data(){return{book:void 0,loadState:""}},methods:{bookDataAdapter(o){var e,i,d,u,c,v,k,f,l,h,b,g,y,I,w,S,L,P,V,C;return{title:(e=o.volumeInfo)==null?void 0:e.title,image:(d=(i=o.volumeInfo)==null?void 0:i.imageLinks)==null?void 0:d.thumbnail,description:(u=o.volumeInfo)==null?void 0:u.description,canonicalVolumeLink:{title:"Google Play",value:(c=o.volumeInfo)==null?void 0:c.canonicalVolumeLink},previewLink:{title:"Preview",value:(v=o.volumeInfo)==null?void 0:v.previewLink},price:{title:"Price",value:(f=(k=o.saleInfo)==null?void 0:k.listPrice)!=null&&f.amount&&((h=(l=o.saleInfo)==null?void 0:l.listPrice)!=null&&h.currencyCode)?o.saleInfo.listPrice.amount+o.saleInfo.listPrice.currencyCode:void 0},details:[{title:"Authors",value:(b=o.volumeInfo)==null?void 0:b.authors},{title:"Categories",value:(g=o.volumeInfo)==null?void 0:g.categories}].filter(r=>r.value),subDetails:[{title:"Publisher",value:(y=o.volumeInfo)==null?void 0:y.publisher},{title:"Published date",value:(I=o.volumeInfo)==null?void 0:I.publishedDate},{title:"Print type",value:(w=o.volumeInfo)==null?void 0:w.printType},{title:"Page count",value:(S=o.volumeInfo)==null?void 0:S.printedPageCount},{title:"Industry identifiers",value:(P=(L=o.volumeInfo)==null?void 0:L.industryIdentifiers)==null?void 0:P.map(r=>r.type+" — "+r.identifier)},{title:"Language",value:(V=o.volumeInfo)==null?void 0:V.language},{title:"Dimensions",value:(C=o.volumeInfo)==null?void 0:C.dimensions}].filter(r=>r.value)}}},mounted(){const e=$().params.bookId;this.loadState="loading",N(e).then(i=>{i!==void 0&&(this.book=this.bookDataAdapter(i)),this.loadState="success"}).catch(i=>{console.log(i),this.loadState="error",this.book=void 0})}},ae=T({...ne,setup(o){return(e,i)=>{var d,u,c,v,k,f;return s(),t(m,null,[e.loadState==="success"&&e.book!==void 0||e.loadState==="loading"?(s(),t("div",R,[a("div",j,[a("div",q,[a("div",z,[e.loadState==="loading"?(s(),t("div",J," ")):(d=e.book)!=null&&d.image?(s(),t("img",{key:1,class:"book-image",src:e.book.image},null,8,K)):(s(),t("div",O,"no picture"))]),e.loadState==="success"?(s(),t("div",Q,[(c=(u=e.book)==null?void 0:u.price)!=null&&c.value?(s(),t("p",U,_(`${e.book.price.title} ${e.book.price.value}`),1)):(s(),t("p",W,"no price")),e.book.canonicalVolumeLink.value?(s(),t("a",{key:2,href:e.book.canonicalVolumeLink.value,target:"_blank",class:"button-link"},_(e.book.canonicalVolumeLink.title),9,X)):n("",!0),e.book.previewLink.value?(s(),t("a",{key:3,href:e.book.previewLink.value,target:"_blank",class:"button-link"},_(e.book.previewLink.title),9,Y)):n("",!0)])):n("",!0)]),e.loadState==="loading"?(s(),t("div",Z,B)):n("",!0),e.loadState==="success"?(s(),t("div",x,[a("h1",null,_((v=e.book)==null?void 0:v.title),1),a("div",ee,[(s(!0),t(m,null,A(e.book.details,l=>(s(),p(F,{key:l.title,field:l},null,8,["field"]))),128))]),(k=e.book)!=null&&k.description?(s(),t("div",{key:0,innerHTML:(f=e.book)==null?void 0:f.description,class:"info-description"},null,8,oe)):(s(),t("p",se,"no description")),a("div",te,[(s(!0),t(m,null,A(e.book.subDetails,l=>(s(),p(F,{key:l.title,field:l},null,8,["field"]))),128))])])):n("",!0)])])):n("",!0),e.loadState==="error"?(s(),t("div",ie,"Error")):n("",!0),e.loadState==="success"&&e.book===void 0?(s(),t("div",le," Book not found ")):n("",!0)],64)}}});const re=M(ae,[["__scopeId","data-v-f8ff3e01"]]),ce=T({__name:"BookView",setup(o){return(e,i)=>(s(),p(re))}});export{ce as default};