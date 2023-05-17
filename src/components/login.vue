<script setup>
    import Header from './header.vue';
    import Footer from './footer.vue';
</script>

<template>
    <Header />
    <body>
        <section class="login">
        <!-- <img src="../assets/img/flor-derecha.png" class="flor-derecha" /> -->
        <article class="formularios">
        <article>
            <article class="tab" >
                <button  id="login" @click="Login()" class="btn__tab active">Inicio de Sesión</button>
                <button id="registro" @click="Registro()" class="btn__tab">Registro</button>
            </article>

            <article id="login" class="login__form" v-if="mostrarLogin">
                <form action="#" method="post" id="login__form">
                    <label for="email" >Correo Electrónico</label>
                    <input type="text" name="emial" id="email" v-model="email" required />
                    <label for="contraseña" >Contraseña</label>
                    <input type="password" name="contraseña" id="contraseña" v-model="contraseña" required />
                    <p v-if="error" class="errorLogin">El nombre de usuario o contraseña no son correctos.</p>
                <button class="btn__mediano btn__login">Iniciar sesión</button>
        </form>
        </article>

        <article id="registro" class="registro__form" v-if="mostrarRegistro">
        <form action="#" method="post" id="registro__form">
            <label for="nombre">Nombre </label>
                <input type="text" name="nombre" id="nombre" v-model="nombre" v-on:blur="validarNombre" required/>
                <p v-if="errorNombre" class="errorRegistro">El nombre debe de tener al menos 3 letras</p>
                <label for="apellidos">Apellidos</label>
                <input type="text" name="apellidos" id="apellidos" v-model="apellidos" v-on:blur="validarApellidos" required/>
                <p v-if="errorApellidos" class="errorRegistro" >Debe de tener al menos 3 letras </p>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" v-model="email" v-on:blur="validarEmail" required/>
                <p v-if="errorEmail" class="errorRegistro" >El email no es válido.</p>
                <label for="telefono">Teléfono</label>
                <input type="text" name="telefono" id="telefono" v-model="telefono" v-on:blur="validarTelefono" required/>
                <p v-if="errorEmail" class="errorRegistro" >El número de teléfono no es válido.</p>
                <label for="contrasenia">Contraseña</label>
                <input type="password" name="contrasenia" id="contrasenia" v-model="contraseña" v-on:blur="validarContraseña" required/>
                <p v-if="errorContraseña" class="errorRegistro" >La contraseña debe de tener minimo 1 mayúscula,1 minúscula, 1 número y tener entre 8 y 16 letras.</p>
                <label for="repContrasenia">Repita la contraseña</label>
                <input type="password" name="repContrasenia" id="repContrasenia" v-model="repContraseña" v-on:blur="coincidenContraseña" required/>
                <p v-if="coincide" class="errorRegistro">Las contraseñas no coindicen</p>
                <button class="btn__mediano btn__registro">Regístrame</button>
        </form>
        </article>
    </article>
        </article>
      <!-- <img src="../assets/img/flor-izquierda.png" class="flor-izquierda" /> -->
        </section>
    </body>
    <Footer />
</template>

<script>
    export default {
        data() {
            return{
                usuarios: {},
                nombre:"",
                apellidos:"",
                email:"",
                telefono:"",
                contraseña:"",
                repContraseña:"",
                errorNombre:false,
                errorApellidos:false,
                errorEmail:false,
                errorTelefono:false,
                errorContraseña:false,
                coincide:false,

                nombreReg: new RegExp(/^[A-z]{3,}[\s]*[A-z]*/),
                emailReg: new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
                contraseniaReg: new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/),
                telefonoReg: new RegExp(),
                mostrarLogin: true,
                mostrarRegistro: false,
            }
        },
        methods: {
            Login(){
                this.mostrarLogin = true;
                this.mostrarRegistro = false;
            },
            Registro(){
                this.mostrarLogin = false;
                this.mostrarRegistro = true;
            },

            validarNombre(){
                this.errorNombre = !this.nombreReg.test(this.nombre);
            },

            validarApellidos(){
                this.errorApellidos = !this.nombreReg.test(this.apellidos);
            },

            validarEmail(){
                this.errorEmail = !this.emailReg.test(this.email);
            },

            validarTelefono(){
                this.errorTelefono = !this.telefonoReg.test(this.telefono);
            },

            validarContraseña(){
                this.errorContraseña = !this.contraseniaReg.test(this.contraseña);
            },

            coincidenContraseña(){
                this.coincide = !(this.contraseña === this.repContraseña);
            },

        }
    }
</script>