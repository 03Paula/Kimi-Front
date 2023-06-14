<script setup>
    import Header from './header.vue';
    import Footer from './footer.vue';
</script>


<template>
    <Header />
    <body>
        <section class="listado">
            <aside class="filtros">
                <h6 class="filtro__titulo">Productos</h6>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" onselect="FiltrarPorMangas()" />
                    <p class="filtro__opciones">Mangas</p>
                </article>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" />
                    <p class="filtro__opciones">Figuras</p>
                </article>
                <h6 class="filtro__titulo">Autores</h6>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" />
                    <p class="filtro__opciones">Tatsuki Fujimoto</p>
                </article>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" />
                    <p class="filtro__opciones">Kentaro Miura</p>
                </article>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" />
                    <p class="filtro__opciones">Ai Yazawa</p>
                </article>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" />
                    <p class="filtro__opciones">Gege Akutami</p>
                </article>
                <h6 class="filtro__titulo">Géneros</h6>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" />
                    <p class="filtro__opciones">Romance</p>
                </article>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" />
                    <p class="filtro__opciones">Ciencia Ficción</p>
                </article>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" />
                    <p class="filtro__opciones">Acción</p>
                </article>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" />
                    <p class="filtro__opciones">Drama</p>
                </article>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" />
                    <p class="filtro__opciones">Deportes</p>
                </article>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" />
                    <p class="filtro__opciones">Thriller</p>
                </article>
            </aside>

            <article class="productos">
                
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
 * @vue-data {String} busqueda - Almacena el nombre del manga a buscar.
 * 
 * @vue-event {Object} getAllMangas - Obtiene todos los mangas.
 * @vue-event {Object} getOneManga - Obtiene el manga pedido.
 * 
 */

 export default {
        data(){
            return{
                mangas: {},
                figuras: {},
                busqueda:"",
                manga:false,
                figura:false
            }
        },
        mounted(){
            this.getAllMangas();
            this.getAllFiguras();
        },
        methods: {
            async getAllMangas(){
                const response = await fetch(`http://localhost:8080/productos/mangas`);
                this.mangas = await response.json();
            }
        }
    }
</script>