<script setup>
import Header from './header.vue'
</script>
<template>
    <Header />
    <section class="vistaProducto">
        <aside class="masInfo">
            <img class="masInfo__img" :src="`${producto.imagen}`" alt="imagen del producto" />
            <article class="masInfo__adicional">
                <h6>Información adicional:</h6>
                <p>Formato: {{ producto.formatoColeccion }}</p>
                <p>Tamaño: {{ producto.tamanio }}</p>
                <p>Páginas: {{ producto.paginas }}</p>
                <p>Fecha salida: {{ producto.fechaSalida }}</p>
            </article>
        </aside>

        <article class="datos__producto">
            <h2 class="datos__productos__h4">{{ producto.nombre }}</h2>
            <h6 class="datos__productos__texto">{{ producto.autor }}</h6>
            <p class="datos__productos__texto">
                {{ producto.descripcion }}
            </p>
            <p class="datos__productos__genero">{{ producto.generoSerie }}</p>
            <h5 class="datos__productos__texto precio">{{ producto.precio }} €</h5>
            <article class="cantidad">
                <p class="datos__productos__texto " >Cantidad: </p>
                <button class="btn__cantidad menos" @click="cantidadMenos()" > - </button> 
               <p> {{ cantidad }}</p>
                <button class="btn__cantidad mas" @click="cantidadMas()" > + </button>
            </article>
            <button class="btn__grande btn__compra">Añadir al carrito</button>
        </article>

    </section>
    
</template>

<script>
    export default {
        data(){
            return{
                cantidad: 1,
                producto: {},
            }
        },
        mounted(){
            this.getInfoProducto(this.$route.params.id);
            console.log(this.$route.params.id)
        },
        methods: {
           async getInfoProducto(productoId){
                const response = await fetch(`http://localhost:8080/kimi/producto/${productoId}`);
                this.producto = await response.json();
                console.log(this.producto);
            },

            cantidadMas(){
                this.cantidad += 1;
            }, 

            cantidadMenos(){
                if (this.cantidad > 1){
                    this.cantidad -= 1;
                }else{
                    this.cantidad = 1;
                }
            },

        }
    }
</script>