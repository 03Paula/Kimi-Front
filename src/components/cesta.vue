<script setup>
    import Header from './header.vue';
    import mensaje from './mensaje.vue';
</script>

<template>
    <Header />
    <section class="carrito">
        <h3 class="carrito__h6">Carrito</h3>
        <div>
            <h6 >Nombre: {{ productos.nombre }} </h6>
            <img class="producto__imagen" :src="`${productos.imagen}`" alt="imagen del producto" />
            <h6>Cantidad : {{ productosCarrito.cantidad }}</h6>
            <h5 class="carrito__precio">Precio Total: {{ productosCarrito.precioTotal }} €</h5>
            <button class="btn__mediano" @click="realizarPedido()">Realizar Pedido</button>
        </div>
    </section>
    
</template>

<script>
export default {
    data(){
        return{
            productosCarrito: {},
            precioTotal: 0,
            productos:{},
            idCarrito: this.$route.params.id
        }
    },
    mounted(){
        this.getProductosCarrito();

    },
    methods: {
        async getProductosCarrito(){
            const response = await fetch(`http://localhost:8080/kimi/carrito/:${this.idCarrito}`);
            this.productosCarrito = await response.json();
            this.productosCarrito.precioTotal = this.productosCarrito.precioTotal.toFixed(2);
            const result = await fetch(`http://localhost:8080/kimi/producto/:${localStorage.getItem("idProducto")}`);
            this.productos = await result.json();
        },
        realizarPedido(){
            this.$router.push('/resumen-pedido');
            localStorage.setItem("idCarro", this.productosCarrito.id)
        }
    }
}
</script>