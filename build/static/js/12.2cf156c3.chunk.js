(this["webpackJsonpdar-bengacem-admin"]=this["webpackJsonpdar-bengacem-admin"]||[]).push([[12],{785:function(e,l,a){"use strict";a.r(l);var s=a(35),t=a(0),c=a(86),d=a(98),i=a(140),r=a(36),n=a(384),j=a(124),b=a(397),o=a(195),h=a(398),x=a(187),g=a(126),O=a(252),m=a(392),u=a(22),p=a(393),v=a(394),C=a(249),w=a(1);var f=e=>{let{data:l,lang:a,isCheck:t,presses:c,setIsCheck:i,useParamId:r}=e;const{title:n,serviceId:b,handleModalOpen:h,handleUpdate:x}=Object(j.a)();return Object(w.jsxs)(w.Fragment,{children:[(null===t||void 0===t?void 0:t.length)<1&&Object(w.jsx)(o.a,{useParamId:r,id:b,title:n}),Object(w.jsx)(g.a,{children:Object(w.jsx)(O.a,{id:b,data:l,lang:a})}),Object(w.jsx)(s.TableBody,{children:null===c||void 0===c?void 0:c.map((e=>{var l;return Object(w.jsxs)(s.TableRow,{children:[Object(w.jsx)(s.TableCell,{className:"font-semibold uppercase text-xs h-full",children:null===e||void 0===e||null===(l=e._id)||void 0===l?void 0:l.substring(20,24)}),Object(w.jsx)(s.TableCell,{children:null!==e&&void 0!==e&&e.image?Object(w.jsx)(s.Avatar,{className:"hidden mr-3 md:block bg-gray-50 p-1",src:"https://api.darbengacem.com/uploads/"+e.image,alt:null===e||void 0===e?void 0:e.image}):Object(w.jsx)(s.Avatar,{src:"https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png",alt:"product",className:"hidden p-1 mr-2 md:block bg-gray-50 shadow-none"})}),Object(w.jsx)(s.TableCell,{className:"text-sm",children:null===e||void 0===e?void 0:e.title}),Object(w.jsx)(s.TableCell,{className:"text-sm",children:null===e||void 0===e?void 0:e.source}),Object(w.jsx)(s.TableCell,{className:"text-center",children:Object(w.jsx)(p.a,{id:e._id,press:!0,status:e.isPublished})}),Object(w.jsx)(s.TableCell,{children:Object(w.jsxs)("div",{className:"flex justify-end items-center",children:[Object(w.jsx)(u.b,{to:"/press/".concat(null===e||void 0===e?void 0:e._id),className:"p-2 text-gray-400 hover:text-green-600",children:Object(w.jsx)(C.a,{id:"view",Icon:d.i,title:"View details",bgColor:"#10B981"})}),Object(w.jsx)(v.a,{id:null===e||void 0===e?void 0:e._id,isCheck:t,handleUpdate:x,handleModalOpen:h,title:(null===e||void 0===e?void 0:e.title)||"press"})]})})]},e._id)}))})]})},T=a(399);l.default=()=>{const{toggleDrawer:e,lang:l}=Object(t.useContext)(r.a),{data:a,loading:u}=Object(i.a)(n.a.getAllPress),{allId:p,serviceId:v}=Object(j.a)(),{t:C}=Object(c.a)(),{handleSubmitCategory:N,categoryRef:k,totalResults:P,resultsPerPage:y,dataTable:I,serviceData:S,handleChangePage:R,filename:_,isDisabled:A,handleSelectFile:F,handleUploadMultiple:B,handleRemoveSelectFile:D,searchRef:M}=Object(b.a)(a?a.data:[]),[U,J]=Object(t.useState)(!1),[H,V]=Object(t.useState)([]),[q,z]=Object(t.useState)(!1);return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(x.a,{children:"Press"}),Object(w.jsx)(o.a,{ids:p,setIsCheck:V}),Object(w.jsx)(h.a,{ids:p,title:"Presses",lang:l,data:a,isCheck:H}),Object(w.jsx)(g.a,{children:Object(w.jsx)(O.a,{id:v,data:a,lang:l})}),Object(w.jsx)(s.Card,{className:"min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4",children:Object(w.jsx)(s.CardBody,{children:Object(w.jsxs)("form",{onSubmit:N,className:"py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex",children:[Object(w.jsx)("div",{className:"flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow",children:Object(w.jsx)(s.Input,{ref:M,type:"search",className:"border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white",placeholder:"Search Press"})}),Object(w.jsx)("div",{className:"w-full md:w-48 lg:w-48 xl:w-48",children:Object(w.jsxs)(s.Button,{onClick:e,className:"rounded-md h-12 w-full",children:[Object(w.jsx)("span",{className:"mr-2",children:Object(w.jsx)(d.c,{})}),"Add Press"]})})]})})}),u?Object(w.jsx)(m.a,{row:12,col:6,width:190,height:20}):0!==(null===S||void 0===S?void 0:S.length)?Object(w.jsxs)(s.TableContainer,{className:"mb-8",children:[Object(w.jsxs)(s.Table,{children:[Object(w.jsx)(s.TableHeader,{children:Object(w.jsxs)("tr",{children:[Object(w.jsx)(s.TableCell,{children:"ID"}),Object(w.jsx)(s.TableCell,{children:"Image"}),Object(w.jsx)(s.TableCell,{children:"Title"}),Object(w.jsx)(s.TableCell,{children:"Source"}),Object(w.jsx)(s.TableCell,{className:"text-center",children:"Published"}),Object(w.jsx)(s.TableCell,{className:"text-right",children:"Actions"})]})}),Object(w.jsx)(f,{data:a.data,lang:l,isCheck:H,presses:I,setIsCheck:V,showChild:q})]}),Object(w.jsx)(s.TableFooter,{children:Object(w.jsx)(s.Pagination,{totalResults:P,resultsPerPage:y,onChange:R,label:"Table navigation"})})]}):Object(w.jsx)(T.a,{title:"Sorry, There are no press releases right now."})]})}}}]);
//# sourceMappingURL=12.2cf156c3.chunk.js.map