<script setup>
    import Header from './header.vue';
    import Footer from './footer.vue';
    import axios from 'axios';
</script>


<template>
    <Header />
    <body>
            <section class="listado">
            <aside class="filtros">
                <h6 class="filtro__titulo">Productos</h6>
                <article class="filtro__opcion">
                    <input type="radio" class="filtroCheck" name="opcion" @click="mostrarMangas()" />
                    <p class="filtro__opciones">Mangas</p>
                </article>
                <article class="filtro__opcion" >
                    <input type="radio" class="filtroCheck" name="opcion" @click="mostrarFiguras()" />
                    <p class="filtro__opciones">Figuras</p>
                </article>
                <h6 class="filtro__titulo">Autores</h6>
                <article class="filtro__opcion">
                    <input type="radio" class="filtroCheck" name="opcion" value="Tatsuki Fujimoto" @click="mostrarProductoPorAutor()"/>
                    <p class="filtro__opciones">Tatsuki Fujimoto</p>
                </article>
                <article class="filtro__opcion">
                    <input type="radio" class="filtroCheck" value="Kentaro Miura" name="opcion"  @click="mostrarProductoPorAutor()" />
                    <p class="filtro__opciones">Kentaro Miura</p>
                </article>
                <article class="filtro__opcion">
                    <input type="radio" class="filtroCheck" value="Hajime Isayama" name="opcion"  @click="mostrarProductoPorAutor()" />
                    <p class="filtro__opciones">Hajime Isayama</p>
                </article>
                <article class="filtro__opcion">
                    <input type="radio" class="filtroCheck" value="Sui Ishida" name="opcion"  @click="mostrarProductoPorAutor()" />
                    <p class="filtro__opciones">Sui Ishida</p>
                </article>
                <h6 class="filtro__titulo">Géneros</h6>
                <article class="filtro__opcion">
                    <input type="radio" class="filtroCheck" value="Romance" name="opcion"  @click="mostrarProductoPorGenero()" />
                    <p class="filtro__opciones">Romance</p>
                </article>
                <article class="filtro__opcion">
                    <input type="radio" class="filtroCheck" value="Ciencia Ficción" name="opcion"  @click="mostrarProductoPorGenero()"  />
                    <p class="filtro__opciones">Ciencia Ficción</p>
                </article>
                <article class="filtro__opcion">
                    <input type="radio" class="filtroCheck" value="Acción" name="opcion"  @click="mostrarProductoPorGenero()" />
                    <p class="filtro__opciones">Acción</p>
                </article>
                <article class="filtro__opcion">
                    <input type="radio" class="filtroCheck" value="Drama" name="opcion"  @click="mostrarProductoPorGenero()" />
                    <p class="filtro__opciones">Drama</p>
                </article>
                <article class="filtro__opcion">
                    <input type="radio" class="filtroCheck" value="Deportes" name="opcion"  @click="mostrarProductoPorGenero()" />
                    <p class="filtro__opciones">Deportes</p>
                </article>
                <article class="filtro__opcion">
                    <input type="radio" class="filtroCheck" value="Thriller" name="opcion"  @click="mostrarProductoPorGenero()" />
                    <p class="filtro__opciones">Thriller</p>
                </article>
            </aside>

            <article class="productos">
                <article class="coleccion-producto" v-if="producto"> 
                    <div class="producto__carta" v-for="producto in this.productos" :key="producto.id">
                        <img :src="`${producto.imagen}`" alt="imagen del producto" class="producto__imagen" @click="verDetalles(producto.id)">
                        <h6 onclick="verDetalles(producto.id)" class="producto__nombre">{{ producto.nombre }}</h6>
                        <h5 class="producto__precio">{{ producto.precio }} €</h5>
                    </div>
                </article>
                <article class="coleccion-mangas" v-if="manga"> 
                    <div class="producto__carta" v-for="manga in this.mangas" :key="manga.id">
                        <img :src="`${manga.imagen}`" alt="imagen del producto" class="producto__imagen" @click="verDetalles(manga.id)">
                        <h6 onclick="verDetalles(manga.id)" class="producto__nombre">{{ manga.nombre }}</h6>
                        <h5 class="producto__precio">{{ manga.precio }} €</h5>
                    </div>
                </article>
                <article class="coleccion-figuras" v-if="figura"> 
                    <div class="producto__carta" v-for="figura in this.figuras" :key="figura.id">
                        <img :src="`${figura.imagen}`" alt="imagen del producto" class="producto__imagen" @click="verDetalles(figura.id)" >
                        <h6 class="producto__nombre">{{ figura.nombre }}</h6>
                        <h5 class="producto__precio">{{ figura.precio }} €</h5>
                    </div>
                </article>
                <article class="coleccion-productoAutor" v-if="autor"> 
                    <div class="producto__carta" v-for="prodautor in this.productosAutor" :key="prodautor.id">
                        <img :src="`${prodautor.imagen}`" alt="imagen del producto" class="producto__imagen" @click="verDetalles(prodautor.id)" >
                        <h6 class="producto__nombre">{{ prodautor.nombre }}</h6>
                        <h5 class="producto__precio">{{ prodautor.precio }} €</h5>
                    </div>
                </article>
                <article class="coleccion-productoGenero" v-if="genero"> 
                    <div class="producto__carta" v-for="prodge in this.productosGenero" :key="prodge.id">
                        <img :src="`${prodge.imagen}`" alt="imagen del producto" class="producto__imagen" @click="verDetalles(prodge.id)" >
                        <h6 class="producto__nombre">{{ prodge.nombre }}</h6>
                        <h5 class="producto__precio">{{ prodge.precio }} €</h5>
                    </div>
                </article>
            </article>
        </section>

    </body>
    <Footer />
</template>


<script>
/**
 * @file index.vue - Componente para la página de listado.
 * @author Paula Flor
 * 
 * @vue-data {Object} mangas - Almacena todos los mangas.
 * 
 * @vue-event {Object} getAllMangas - Obtiene todos los mangas.
 * @vue-event {Object} getOneManga - Obtiene el manga pedido.
 * 
 */

 export default {
        data(){
            return{
                productos: {},
                mangas: {},
                figuras: {},
                productosAutor: {},
                productosGenero: {},	
                busqueda:"",
                manga: false,
                figura: false,
                producto: true,
                checkFigura : true,
                autor:false,
                genero:false,
                opcionSelecionada: '',
            }
        },
        mounted(){
            this.getAllMangas();
            this.getAllFiguras();
            this.getAllProductos();
        },
        methods: {
            async getAllMangas(){
                axios
                    .get('http://localhost:8080/kimi/producto/categoria/manga')
                    .then((result => {
                        this.mangas = result.data
                    }))
                    console.log(this.mangas)
            },
            
            async getAllFiguras(){
                axios
                    .get('http://localhost:8080/kimi/producto/categoria/figura')
                    .then((result => {
                        this.figuras = result.data
                    }))
            },

            async getAllProductos(){
                const response = await fetch(`http://localhost:8080/kimi/productos`);
                this.productos = await response.json();
            },

            async getAllProductosByAuthor(){
                this.opcionSelecionada = document.querySelector('input[name="opcion"]:checked');
                const response = await fetch(`http://localhost:8080/kimi/producto/autor/${this.opcionSelecionada.value}`);
                this.productosAutor = await response.json();
            },

            async getAllProductosByGenre(){
                this.opcionSelecionada = document.querySelector('input[name="opcion"]:checked');
                const response = await fetch(`http://localhost:8080/kimi/producto/genero/${this.opcionSelecionada.value}`);
                this.productosGenero = await response.json();
            },

            verDetalles(productoId) {
                this.$router.push(`/producto/:${productoId}`);
            },

            mostrarMangas(){
                this.manga = true;
                this.figura = false;
                this.productos = false;
                this.checkFigura = false;
                this.autor = false;
                this.genero = false
            },

            mostrarFiguras(){
                this.manga = false;
                this.figura = true;
                this.productos = false;
                this.autor = false;
                this.genero = false
            },

            mostrarProductos(){
                this.manga = false;
                this.figura = false;
                this.genero = false
            },

            mostrarProductoPorAutor(){
                this.manga = false;
                this.figura = false;
                this.productos = false;
                this.checkFigura = false;
                this.autor = true;
                this.genero = false
                this.getAllProductosByAuthor()
            },

            mostrarProductoPorGenero(){
                this.manga = false;
                this.figura = false;
                this.productos = false;
                this.checkFigura = false;
                this.autor = false;
                this.genero = true;
                this.getAllProductosByGenre()
            },
        }
    }
</script>