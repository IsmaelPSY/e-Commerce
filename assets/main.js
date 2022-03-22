const productos = [
    {
        id: 1,
        name: 'Playera Naruto',
        price: 10,
        imagen: 'https://m.media-amazon.com/images/I/61XqRZO51nL._AC_UX342_.jpg',
        contador: 1,
        total: 0
    },
    {
        id: 2,
        name: 'Almohada',
        price: 8,
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_900174-MLM48889176519_012022-W.jpg',
        contador: 1,
        total: 0
    },
    {
        id: 3,
        name: 'Abrigo',
        price: 15,
        imagen: 'https://www.tazasanime.com/wp-content/uploads/2020/11/SUDADERA-AHEGAO.png',
        contador: 1,
        total: 0
    },
    {
        id: 4,
        name: 'Juguete Itachi',
        price: 8,
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_898403-MLV44941342141_022021-V.jpg',
        contador: 1,
        total: 0
    },
    {
        id: 5,
        name: 'Arete',
        price: 20,
        imagen: 'https://tiendaotakuplace.com/wp-content/uploads/2021/08/aretes-hana-300x300.jpg',
        contador: 1,
        total: 0
    },
    {
        id: 6,
        name: 'Zapatilla',
        price: 25,
        imagen: 'https://i.linio.com/p/b78cbf79033ab89f27f63ae3babc1744-product.jpg',
        contador: 1,
        total: 0
    }
]

const db = {
    items: productos,
    methods:{
        find: function (id){
            return db.items.find(function (item){return item.id === id })
        },
        render: function (){
            let html = '';
            html += '<ul>';
            html += db.items.map(function (item) {
                return `<div class="i-productos">  
                                <div class="img-container">
                                    <img src="${item.imagen}" alt="">
                                </div> 
                                <div class="product-info">
                                    <div class="boxTexto"> 
                                        <p>${item.name} S/${item.price}</p>
                                    </div> 
                                    <button class ="btn-add button" data-id="${item.id}"> 
                                        Agregar Carrito
                                    </button>
                                </div>
                        </div>` }).join('')
            html += '</ul>'
            console.log(html)
            return html
        }
    }
}
let sumaFinal = 0
let sumaParcial = 0
const cart = {
    items: [],
    methods:{
        add: function (id){
            if(cart.methods.isAlreadyInCart(id) ){
               return cart.items.find(function (item){ if(item.id ===id) {return item.id ===id, item.contador = item.contador + 1 } })
            }else{
                const item = db.methods.find(id)
                cart.items.push(item)
            }
            
        },
        remove: function (id){
            cart.items = cart.items.filter(function (item) { if (item.contador > 1)  {return item.id !== id,item.contador = item.contador - 1} else {return item.id !== id} })
        },
        isAlreadyInCart: function (id){
           return cart.items.find(function (item){return item.id ===id})
        },

        // Eliminar
        count:function(){
            return cart.items.length
        },

        total:function(sumaFinal,sumaParcial){
            for(let i=0 ; i < cart.items.length ; i++){
                sumaParcial = cart.items[i].price * cart.items[i].contador
                sumaFinal = sumaFinal + sumaParcial
            }return sumaFinal
            
        },
        render: function(){
            let html = '';
                html += '<ul>';
                html += cart.items.map(function (item) {
                    return  `<li data-id="${item.id}" class="li-cart"> 
                                <div>
                                ${item.contador} ${item.name} - $${item.price*item.contador}
                                </div>
                                
                                <button class ="btn-remove  button" data-id="${item.id}"> 
                                        delete
                                </button>
                             </li>`}).join('')
                html += '</ul>' 
                return html
        }
    }
}

const total = document.getElementById('total')
total.innerHTML = cart.methods.total(sumaFinal,sumaParcial)

// Eliminar *2
const count = document.getElementById('count')


const produc = document.getElementById('produc')
produc.innerHTML = db.methods.render()

const cartContainer = document.getElementById('cart')
const wrapper = document.getElementById('wrapper')


wrapper.addEventListener('click',function (e) {
    if (e.target.matches('.btn-add')){
        let id = e.target.dataset.id
        cart.methods.add(+id)
        total.innerHTML = cart.methods.total(sumaFinal,sumaParcial)
        cartContainer.innerHTML = cart.methods.render()
    }

    if (e.target.matches('.btn-remove')){
        let id = e.target.dataset.id
        cart.methods.remove(+id)
        if(cart.methods.count() === 0){
            sumaFinal = 0
            total.innerHTML = cart.methods.total(sumaFinal,sumaParcial)
        }else{
            total.innerHTML = cart.methods.total(sumaFinal,sumaParcial)
        }
        cartContainer.innerHTML = cart.methods.render()
    }
})

console.log(cart.items)
