<script setup>
    import Header from './header.vue';
    import Footer from './footer.vue';
    import Carta from './cartaProducto.vue';
</script>


<template>
    <Header />
    <body>
        <section class="listado">
            <aside class="filtros">
                <h6 class="filtro__titulo">Productos</h6>
                <article class="filtro__opcion">
                    <input type="checkbox" class="filtroCheck" />
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
                <Carta />
            </article>
        </section>
    </body>
    <Footer />
</template>
