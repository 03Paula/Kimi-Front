<template>
    <header class="header">
        <RouterLink to="/"><img alt="Logo de la tienda" src="../assets/img/logoTienda1.png" class="header__logo"/> </RouterLink>
        <article class="header__barraBusqueda">
            <input class="header__inputBusqueda" type="text" placeholder="Buscar en kimi" v-model="buscar" />
            <button class="header__busqueda"><img alt="icono de una lupa" src="../assets/img/lupa.png"/></button>
        </article>
        <article class="nav-bar">
            <RouterLink to="/usuario" class="link__usuario" style="text-decoration: none; color: inherit;"><img alt="icono de usuario" src="../assets/img/userIcon.png" class="iconos_header" v-if="sesion" /><p class="p_header" v-if="sesion">Usuario</p></RouterLink>
            <RouterLink to="/login" class="link__usuario" style="text-decoration: none; color: inherit;"><img alt="icono de usuario" src="../assets/img/userIcon.png" class="iconos_header" v-if="!sesion" /><p class="p_header" v-if="!sesion">Usuario</p></RouterLink>
            <RouterLink to="/contacto" class="link__contacto" style="text-decoration: none; color: inherit;"><img alt="icono de telefono" src="../assets/img/telefono.png" class="iconos_header "/><p class="p_header">Contacto</p></RouterLink>
        </article>
    </header>
</template>

<script>
/**
 * @file header.vue - Componente para el header.
 * @author Paula Flor
 * 
 * @vue-data {String} buscar - Almacenará la busqueda.
 * @vue-data {Object} producto - Almacenará el producto.
 * @vue-data {String} usuario - Almacenará el usuario si se encuentra.
 * @vue-data {Boolean} sesion - Almacenará si se ha iniciado sesión o no.
 * 
 **/
    export default {
        data(){
            return {
                buscar : '',
                producto: [],
                usuario: '',
                sesion: false
            }
        },
        mounted(){
            if(localStorage.getItem("idUsuario")){
                this.usuario = localStorage.getItem("usuario")
                this.sesion = true
            }
        },

        computed: {
            async productos() {
                const response = await fetch(`http://localhost:8080/kimi/producto/nombre/${buscar}`);
                this.producto = await response.json();
            }
        }
    }
</script>