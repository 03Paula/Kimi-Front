<script setup>
import Header from './header.vue'
</script>
<template>
    <Header />
    <section class="vistaProducto">
    
        <aside class="masInfo">
            <img class="masInfo__img" src="../assets/img/berserk01.webp" alt="imagen del producto" />
            <article class="masInfo__adicional">
                <h6>Información adicional:</h6>
                <p>Formato: {{ formato }}</p>
                <p>Tamaño: {{ tamaño }}</p>
                <p>Páginas: {{ paginas }}</p>
                <p>Fecha salida: {{ fecha }}</p>
                <p>Genero: {{ genero }}</p>
            </article>
        </aside>

        <article class="datos__producto">
            <h2 class="datos__productos__h4">Look Back</h2>
            <h6 class="datos__productos__texto">Tatsuki Fujimoto</h6>
            <p class="datos__productos__texto">¡EL ÚLTIMO TRABAJO DEL AUTOR DE CHAINSAW MAN EN UNA EDICIÓN IRREPETIBLE!
                Fujino cree firmemente en su propio talento; Kyomoto no sale nunca de su habitación. 
                La imparable pasión por dibujar manga une a estas dos chicas que viven en un pueblo 
                apartado. Por muchos que pasen los días y meses, hay algo que siempre las ha apoyado... 
                De un pincel inigualable nace una historia autoconclusiva que rebosa juventud.
            </p>
            <p class="datos__productos__genero">Aventura y fantasia</p>
            <h5 class="datos__productos__texto precio">14,00 €</h5>
            <article class="cantidad">
                <p class="datos__productos__texto" >Cantidad: </p>
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
            }
        },
        methods: {
            cantidadMas(){
                this.cantidad += 1;
            }, 
            cantidadMenos(){
                if (this.cantidad > 1){
                    this.cantidad -= 1;
                }else{
                    this.cantidad = 1;
                }
            }
        }
    }
</script>