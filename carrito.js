//Objetivos
//Usar DOM
//Usar eventos
//Usar Storage

class Producto{
    constructor(id, nombre, precio, categoria, imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

//Creamos clase donde van a estar almacenados los productos en un catalogo
class BaseDeDatos{
    constructor(){
        //Array para el catalogo
        this.productos = [];
        //Se agregan productos a la base de datos
        this.agregarRegistro(1, "Pasta de mani", 1800, "Proteica", "mani_king.webp");
        this.agregarRegistro(2, "Galleta de arroz", 380, "Celiaco", "risky_dit.webp");
        this.agregarRegistro(3, "Mermelada La Tranquilina", 1400, "Celiaco", "la_tranquilina.webp");
        this.agregarRegistro(4, "Avena Instantanea", 1150, "Proteica", "avena.jpg");
        this.agregarRegistro(5, "Fideos Integrales", 1100, "Proteica", "fideos integrales.jpg");
        this.agregarRegistro(6, "Fideos Integrales", 1100, "Proteica", "fideos integrales.jpg");
        this.agregarRegistro(7, "Fideos Integrales", 1100, "Proteica", "fideos integrales.jpg");
        this.agregarRegistro(8, "Fideos Integrales", 1100, "Proteica", "fideos integrales.jpg");
        this.agregarRegistro(9, "Fideos Integrales", 1100, "Proteica", "fideos integrales.jpg");
        this.agregarRegistro(10, "Fideos Integrales", 1100, "Proteica", "fideos integrales.jpg");
        this.agregarRegistro(10, "Fideos Integrales", 1100, "Proteica", "fideos integrales.jpg");
        this.agregarRegistro(10, "Fideos Integrales", 1100, "Proteica", "fideos integrales.jpg");
    }//Metodo que nos crea el objeto producto y lo agrega al Array
    agregarRegistro(id, nombre, precio, categoria, imagen){
        const producto = new Producto(id, nombre, precio, categoria, imagen);
        this.productos.push(producto);

    }
    //Nos devuelve el catalogo de productos
    traerRegistros(){
        return this.productos;
    }
    //Nos devuelve un producto segun el ID
    registroPorId(id){
        return this.productos.find((producto) => producto.id  === id);
    }
    //Nos devuelve un array con todas las coincidencias que encuentre segun el nombre del producto que le pasemos
    registrosPorNombre(palabra){
        return this.productos.filter((producto) => 
        producto.nombre.toLowerCase().includes(palabra.toLowerCase()));
    }
}

//Creamos la clase carrito
class Carrito {
    constructor(){
        //Array donde van a estar los productos del carrito
        this.carrito = [];
        this.total = 0; //Suma total de los subtotales
        this.cantidadProductos = 0; //Cantidad de productos que tengo en el carrito
        
    }
    //Identifica presencia del producto en el carrito
    estaEnCarrito({id}){
        return this.carrito.find((producto) => producto.id === id);
    }

    //Agrega una unidad del producto al carrito
    agregar(producto){
        const productoEnCarrito = this.estaEnCarrito(producto);

        if(!productoEnCarrito){
            this.carrito.push({...producto, cantidad: 1});
        }else{
            productoEnCarrito.cantidad++;
        }

        this.listar();
    }
    
    //Quita una unidad del producto al carrito
    quitar(id){
        const indice = this.carrito.findIndex((producto) => producto.id === id);
        const productoEnCarrito = this.estaEnCarrito(id);
        // Si queda mas de una unidad, le resto una
        if (this.carrito[indice].cantidad > 1) {
            this.carrito[indice].cantidad--;
          } else {
            // Y sino, borramos del carrito el producto a quitar
            this.carrito.splice(indice, 1);
          }

        this.listar();
    }
    //Renderiza todos los productos en el HTML
    listar(){
        //Reiniciamos todas las variables
        this.total = 0;
        this.cantidad = 0;
        divCarrito.innerHTML = "";

            // Actualiza el contenido del offcanvas
        const carritoBody = document.getElementById("carritoBody");
        carritoBody.innerHTML = "";

        for(const producto of this.carrito){
            carritoBody.innerHTML += `
            <div class= "productoCarrito">
                <h2>${producto.nombre}</h2>
                <p>$${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <button class="boton-quitar">
                    <a href="#" class="btnQuitar" data-id="${producto.id}">Quitar del carrito</a>
                </button>
            </div>    
        <span>Subtotal: $${producto.precio * producto.cantidad}</span>
            
            `;
            //Actualizamos los precios
            this.total += producto.precio * producto.cantidad;
            this.cantidadProductos = producto.cantidad;

            const botonesQuitar = document.querySelectorAll(".btnQuitar");

            for (const boton of botonesQuitar){
                boton.addEventListener("click", (event)=>{
                    event.preventDefault();
                    const idProducto = parseInt(boton.dataset.id);
                    this.quitar(idProducto);
                })
            }
        }
        spanCantidadProductos.innerText = this.cantidadProductos;
        spanTotalCarrito.innerText = this.total;
        console.log(this.total);
    }
    ;
}

//Instanciamos la base de datos
const bd = new BaseDeDatos();

//Elementos 
const spanCantidadProductos = document.querySelector("#cantidadProductos")
const spanTotalCarrito = document.querySelector("#totalCarrito")
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");

//Instanciamos la clase carrito
const carrito = new Carrito();

cargarProductos(bd.traerRegistros());

function cargarProductos(productos){
    //Vaciamos el div
    divProductos.innerHTML = "";
    //
    for (const producto of productos){
        divProductos.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="img/${producto.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
                <a href="" class="btn btn-primary" data-id="${producto.id}">Comprar</a>

            </div>
        </div>
        `;
    }
    //Lista dinamica con todos los botones Comprar
    const botonesAgregar = document.querySelectorAll(".btn");

    for (const boton of botonesAgregar){
        //Evita el comportamiento por default
        boton.addEventListener("click", (event) =>{
            event.preventDefault();
            const idProducto = parseInt(boton.dataset.id);

            const producto = bd.registroPorId(idProducto);
            
            carrito.agregar(producto);
        })    
    }
}
