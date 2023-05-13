<script setup>
    import Header from './header.vue';
    import Footer from './footer.vue';
</script>

<template>
    <Header />
    <body>
        <!-- <img src="../assets/img/flor-derecha.png" class="flor-derecha" /> -->
        <div class="formulario">
            <form v-on:submit.prevent="compruebaUsuario(nombreUsu, contraseña)">  
                <h2 class="login">Inicio de Sesión</h2>
                <label for="nombreUsu">Nombre de usuario </label>
                <input type="text" name="nombreUsu" id="nombreUsu" v-model="nombreUsu" required/>
                <label for="contraseña">Contraseña</label>
                <input type="password" name="contraseña" id="contraseña" v-model="contraseña" required />
                <p v-if="error" class="errorLogin">El nombre de usuario o contraseña no son correctos.</p>
                <input type="checkbox"/>
                <label class="recordar" >Recuerdame</label>
                <RouterLink to="/registro" style="text-decoration: none; color: inherit;" ><p class="no__registrado" >No estoy registrado</p></RouterLink>
                    <button class="btn__mediano btn__login">
                        Iniciar sesión
                    </button>
            </form>
        </div>
      <!-- <img src="../assets/img/flor-izquierda.png" class="flor-izquierda" /> -->
    </body>
    <Footer />
    
</template>