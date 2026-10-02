const brands = ["Trendy","Vogue","Samy","Maybelline","L'Oréal Paris","Sheglam","Essence","NYX","Revlon","Otros"];
const products = [
 {id:1,name:"Base Fit Me Matte + Poreless",brand:"Maybelline",cat:"Rostro",price:34900,tone:"128 Warm Nude",badge:"Más vendido"},
 {id:2,name:"Corrector Infallible Full Wear",brand:"L'Oréal Paris",cat:"Rostro",price:32900,tone:"325 Bisque",badge:"Nuevo"},
 {id:3,name:"Polvo Compacto",brand:"Samy",cat:"Rostro",price:26900,tone:"02 Medium",badge:"Más vendido"},
 {id:4,name:"Rubor en Crema",brand:"Trendy",cat:"Rostro",price:24900,tone:"03 Pink",badge:"Nuevo"},
 {id:5,name:"Iluminador Líquido",brand:"Sheglam",cat:"Rostro",price:28900,tone:"Champagne",badge:"Más vendido"},
 {id:6,name:"Polvo Fit Me",brand:"Maybelline",cat:"Rostro",price:29900,tone:"220 Natural Beige",badge:"Más vendido"},
 {id:7,name:"Sérum con Color True Match",brand:"L'Oréal Paris",cat:"Rostro",price:39900,tone:"3-4 Medium",badge:"Nuevo"},
 {id:8,name:"Blush Stick",brand:"Sheglam",cat:"Rostro",price:27900,tone:"Love Cake",badge:"Nuevo"},
 {id:9,name:"Base ColorStay",brand:"Revlon",cat:"Rostro",price:38900,tone:"180 Sand Beige",badge:"Más vendido"},
 {id:10,name:"Polvo Fijador",brand:"Essence",cat:"Rostro",price:19900,tone:"Transparente",badge:"Nuevo"},
 {id:11,name:"Máscara de Pestañas",brand:"Trendy",cat:"Ojos",price:21900,tone:"Negro",badge:"Más vendido"},
 {id:12,name:"Paleta Nude",brand:"Vogue",cat:"Ojos",price:35900,tone:"12 tonos",badge:"Nuevo"},
 {id:13,name:"Delineador Líquido",brand:"Samy",cat:"Ojos",price:16900,tone:"Negro",badge:"Más vendido"},
 {id:14,name:"Sky High Mascara",brand:"Maybelline",cat:"Ojos",price:49900,tone:"Very Black",badge:"Más vendido"},
 {id:15,name:"Gloss Volumen",brand:"NYX",cat:"Labios",price:42900,tone:"Clear",badge:"Nuevo"},
 {id:16,name:"Lip Oil",brand:"Trendy",cat:"Labios",price:22900,tone:"Cherry",badge:"Más vendido"},
 {id:17,name:"Tinta de Labios",brand:"Vogue",cat:"Labios",price:18900,tone:"Rosa",badge:"Nuevo"},
 {id:18,name:"Labial SuperStay",brand:"Maybelline",cat:"Labios",price:46900,tone:"20 Pioneer",badge:"Más vendido"},
 {id:19,name:"Limpiador Facial",brand:"CeraVe",cat:"Skincare",price:54900,tone:"236 ml",badge:"Más vendido"},
 {id:20,name:"Crema Hidratante",brand:"Nivea",cat:"Skincare",price:24900,tone:"Soft",badge:"Nuevo"},
 {id:21,name:"Sérum Hidratante",brand:"L'Oréal Paris",cat:"Skincare",price:44900,tone:"30 ml",badge:"Nuevo"},
 {id:22,name:"Mascarilla Facial",brand:"Sheglam",cat:"Skincare",price:21900,tone:"Hydrating",badge:"Más vendido"}
];

let state={category:null,brand:null,search:"",prices:[],sort:"default",cart:[]};

const $=s=>document.querySelector(s);
const money=n=>n.toLocaleString("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0});

function renderBrands(){
  $("#brandList").innerHTML=brands.map(b=>`<button class="brand" data-brand="${b}">${b}<small>Ver productos →</small></button>`).join("");
}
function renderFilters(){
  $("#categoryFilters").innerHTML=["Rostro","Ojos","Labios","Skincare"].map(c=>`<label><input type="checkbox" data-cat="${c}"> ${c}</label>`).join("");
  $("#brandFilters").innerHTML=brands.map(b=>`<label><input type="checkbox" data-brand-filter="${b}"> ${b}</label>`).join("");
}
function filtered(){
  let list=[...products];
  if(state.category) list=list.filter(p=>p.cat===state.category);
  if(state.brand) list=list.filter(p=>p.brand===state.brand);
  if(state.search) list=list.filter(p=>(p.name+" "+p.brand+" "+p.cat).toLowerCase().includes(state.search.toLowerCase()));
  if(state.prices.length) list=list.filter(p=>state.prices.some(r=>p.price>=r[0]&&p.price<=r[1]));
  if(state.sort==="priceAsc") list.sort((a,b)=>a.price-b.price);
  if(state.sort==="priceDesc") list.sort((a,b)=>b.price-a.price);
  if(state.sort==="name") list.sort((a,b)=>a.name.localeCompare(b.name));
  return list;
}
function productCard(p){
 return `<article class="product">
  <div class="product-img"><span>${p.brand.slice(0,6).toUpperCase()}</span><em class="badge">${p.badge}</em><button class="heart">♡</button></div>
  <div class="product-info"><div class="brand-name">${p.brand}</div><h3>${p.name}</h3><div class="tone">• ${p.tone}</div><div class="rating">★ 4.8 <span style="color:#777">(120)</span></div><div class="price">${money(p.price)}</div><button class="add" data-add="${p.id}">Agregar al carrito</button></div>
 </article>`;
}
function renderProducts(){
 const list=filtered();
 $("#productGrid").innerHTML=list.length?list.map(productCard).join(""):`<div style="grid-column:1/-1;padding:40px;text-align:center">No encontramos productos con esos filtros.</div>`;
 $("#resultCount").textContent=`${list.length} producto${list.length===1?"":"s"}`;
 $("#catalogTitle").textContent=state.brand?`Productos ${state.brand}`:state.category?`Maquillaje ${state.category}`:"Todos los productos";
}
function goCatalog({category=null,brand=null}={}){
 state.category=category;state.brand=brand;state.search="";
 renderProducts(); document.querySelector("#catalogo").scrollIntoView({behavior:"smooth"});
}
function renderCart(){
 const items=state.cart.map(id=>products.find(p=>p.id===id)).filter(Boolean);
 $("#cartCount").textContent=items.length;
 $("#cartItems").innerHTML=items.length?items.map(p=>`<div class="cart-line"><div class="mini">${p.brand.slice(0,5).toUpperCase()}</div><div><b>${p.name}</b><small style="display:block">${p.brand}</small><strong>${money(p.price)}</strong></div></div>`).join(""):`<p style="color:#777">Tu carrito está vacío.</p>`;
 $("#cartTotal").textContent=money(items.reduce((s,p)=>s+p.price,0));
}
document.addEventListener("click",e=>{
 const cat=e.target.closest("[data-category]"); if(cat){goCatalog({category:cat.dataset.category});return;}
 const br=e.target.closest("[data-brand]"); if(br){goCatalog({brand:br.dataset.brand});return;}
 const add=e.target.closest("[data-add]"); if(add){state.cart.push(Number(add.dataset.add));renderCart();$("#cartDrawer").classList.add("open");$("#overlay").classList.add("show");return;}
 const action=e.target.closest("[data-action]"); if(action){
   if(action.dataset.action==="catalogo") goCatalog();
   if(action.dataset.action==="bestsellers"){state.category=null;state.brand=null;state.prices=[];state.sort="default";renderProducts();$("#catalogo").scrollIntoView({behavior:"smooth"});}
   if(action.dataset.action==="ofertas"){state.category=null;state.brand=null;state.prices=[[0,30000]];renderProducts();$("#catalogo").scrollIntoView({behavior:"smooth"});}
 }
});
$("#searchInput").addEventListener("input",e=>{state.search=e.target.value;renderProducts();});
$("#sortSelect").addEventListener("change",e=>{state.sort=e.target.value;renderProducts();});
$("#clearFilters").addEventListener("click",()=>{state={...state,category:null,brand:null,search:"",prices:[],sort:"default"};document.querySelectorAll(".filters input").forEach(x=>x.checked=false);$("#searchInput").value="";renderProducts();});
document.addEventListener("change",e=>{
 if(e.target.dataset.cat){state.category=e.target.checked?e.target.dataset.cat:null;state.brand=null;renderProducts();}
 if(e.target.dataset.brandFilter){state.brand=e.target.checked?e.target.dataset.brandFilter:null;state.category=null;renderProducts();}
 if(e.target.dataset.price){
   const [a,b]=e.target.dataset.price.split("-").map(Number);
   if(e.target.checked) state.prices.push([a,b]); else state.prices=state.prices.filter(r=>r[0]!==a);
   renderProducts();
 }
});
$("#cartBtn").onclick=()=>{$("#cartDrawer").classList.add("open");$("#overlay").classList.add("show")};
$("#closeCart").onclick=()=>{$("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("show")};
$("#overlay").onclick=()=>{$("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("show")};
$("#menuBtn").onclick=()=>$("#mainNav").classList.toggle("open");
$("#mapBtn").onclick=()=>window.open("https://www.google.com/maps/search/?api=1&query=Centro+de+Bogota+Colombia","_blank");

renderBrands();renderFilters();renderProducts();renderCart();
