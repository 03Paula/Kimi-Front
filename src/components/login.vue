<script setup>
    import Header from './header.vue';
    import Footer from './footer.vue';
</script>

<template>
    <Header />
    <body>
        <section class="login">
        <article class="formularios">
        <article>
            <article class="tab" >
                <button  id="login" @click="Login()" class="btn__tab active">Inicio de Sesión</button>
                <button id="registro" @click="Registro()" class="btn__tab">Registro</button>
            </article>

            <article id="login" class="login__form" v-if="mostrarLogin">
                <form v-on:submit.prevent="compruebaUsuario(email, contraseña)" action="#" method="post" id="login__form">
                    <label for="email" >Correo Electrónico</label>
                    <input type="text" name="email" id="email" v-model="email" required />
                    <label for="contraseña" >Contraseña</label>
                    <input type="password" name="contraseña" id="contraseña" v-model="contraseña" required />
                    <p v-if="errorLogin" class="errorLogin">El nombre de usuario o contraseña no son correctos.</p>
                <button class="btn__mediano btn__login">Iniciar sesión</button>
            </form>
            <dialog class="login__dialog" id="login__dialog" v-if="logueado" modal-mode="mega">
                <h6 class="dialog__h6">¿Estás seguro que quieres cerrar sesión?</h6>
                <footer class="footer__dialog">
                    <button class="btn__mediano btn__confirmar" type="reset" onclick="login__dialog.close()">Cerrar</button>
                </footer>
            </dialog>
        </article>

        <article id="registro" class="registro__form" v-if="mostrarRegistro">
        <form v-on:submit.prevent="RegistroUsuario()" action="#" method="post" id="registro__form">
            <label for="nombre">Nombre </label>
                <input type="text" name="nombre" id="nombre" v-model="nombre" v-on:blur="validarNombre" required/>
                <p v-if="errorNombre" class="errorRegistro">El nombre debe de tener al menos 3 letras</p>
                <label for="apellidos">Apellidos</label>
                <input type="text" name="apellidos" id="apellidos" v-model="apellidos" v-on:blur="validarApellidos" required/>
                <p v-if="errorApellidos" class="errorRegistro" >Debe de tener al menos 3 letras </p>
                <label for="emailRegistro">Email</label>
                <input type="email" name="emailRegistro" id="emailReg" v-model="emailRegistro" v-on:blur="validarEmail" required/>
                <p v-if="errorEmail" class="errorRegistro" >El email no es válido.</p>
                <label for="telefono">Teléfono</label>
                <input type="text" name="telefono" id="telefono" v-model="telefono" v-on:blur="validarTelefono" required/>
                <p v-if="errorTelefono" class="errorRegistro" >El número de teléfono no es válido.</p>
                <label for="contraseniaRegistro">Contraseña</label>
                <input type="password" name="contraseniaRegistro" id="contraseniaRegistro" v-model="contraseniaRegistro" v-on:blur="validarContraseña" required/>
                <p v-if="errorContraseña" class="errorRegistro" >La contraseña debe de tener minimo 1 mayúscula,1 minúscula, 1 número y tener entre 8 y 16 letras.</p>
                <label for="repContrasenia">Repita la contraseña</label>
                <input type="password" name="repContrasenia" id="repContrasenia" v-model="repContraseña" v-on:blur="coincidenContraseña" required/>
                <p v-if="coincide" class="errorRegistro">Las contraseñas no coindicen</p>
                <button class="btn__mediano btn__registro">Regístrame</button>
        </form>
        </article>
    </article>
        </article>
        </section>
    </body>
    <Footer />
</template>

<script>
/**
 * @file Login.vue - Componente para el inicio de sesión y registro.
 * @author Paula Flor
 * 
 * @vue-data [Object] usuario - Almacena la información del usuario.
 * @vue-data {String} email - Almacena el email.
 * @vue-data {String} contraseña - Almacena la contraseña del usuario.
 * @vue-data {Boolean} error - Muestra el mensaje de error si es true.
 * @vue-data {String} nombre - Almacena el nombre del usuario.
 * @vue-data {String} apellidos - Almacena los apellidos del usuario.
 * @vue-data {String} emailRegistro - Almacena el email del formulario de registro.
 * @vue-data {String} telefono - Almacena el telefono.
 * @vue-data {String} contraseña - Almacena la contraseña del usuario.
 * @vue-data {String} repContraseña - Almacena contraseña repetida del usuario.
 * @vue-data {Boolean} errorNombre - Muestra el mensaje de error si es true.
 * @vue-data {Boolean} errorApellidos - Muestra el mensaje de error si es true.
 * @vue-data {Boolean} errorEmail - Muestra el mensaje de error si es true.
 * @vue-data {Boolean} errorTelefono - Muestra el mensaje de error si es true.
 * @vue-data {Boolean} errorContrasema - Muestra el mensaje de error si es true.
 * @vue-data {Boolean} coincide - Muestra el mensaje de error la contraseña no coincide con laa repContraseña.
 * @vue-data {String} nombreReg - Expresión regular para validar el nombre.
 * @vue-data {String} emailReg - Expresión regular que valida el email.
 * @vue-data {String} telefonoReg - Expresión regular para validar el teléfono.
 * @vue-data {String} contraseniaReg - Expreción regular para validar la contraseña.
 * 
 * @vue-event validarNombre - Valida el nombre con la expresión regular correspondiente.
 * @vue-event validarApellidos- Valida los apellidos con la expresión regular correspondiente.
 * @vue-event validarEmail - Valida el email con la expresión regular correspondiente.
 * @vue-event validarTelefono - Valida el teléfono con la expresión regular correspondiente.
 * @vue-event validarContraseña - Valida la contraseña con la expresión regular correspondiente.
 * @vue-event coincideContraseña - Valida si la contraseña es igual a repContraseña.
 * @vue-event registrar - Si no hay fallos se almacenan los datos en el localStorage y se redirige al listado.
 * @vue-event compruebaUsuario - Hace una llamada a la api con el email y compara email y la contraseña para ver si son correctos.
*/
 export default {
        data() {
            return{
                usuario: {},
                nombre:"",
                apellidos:"",
                email:"",
                emailRegistro:"",
                telefono:"",
                contraseña:"",
                contraseniaRegistro:"",
                repContraseña:"",
                errorLogin:false,
                errorNombre:false,
                errorApellidos:false,
                errorEmail:false,
                errorTelefono:false,
                errorContraseña:false,
                coincide:false,
                logueado: false,

                nombreReg: new RegExp(/^[A-z]{3,}[\s]*[A-z]*/),
                emailReg: new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
                contraseniaReg: new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/),
                telefonoReg: new RegExp(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/),
                mostrarLogin: true,
                mostrarRegistro: false,
            }
        },
        methods: {
            async compruebaUsuario(email, contraseña) {
                try{
                    const response = await fetch(`http://localhost:8080/kimi/usuarios/email/${email}`);
                    this.usuario = await response.json();
                    if(this.usuario.email == email && this.usuario.contrasenia == contraseña){
                        alert("Inicio de sesión con éxito");
                        this.logueado = true;
                        localStorage.setItem("idUsuario", this.usuario.id)
                        this.$router.push('/');
                    }else{
                        this.errorLogin=true;
                    }
                }catch(err){
                    this.errorLogin=true;
                }
            },

            async RegistroUsuario(){
                if (!this.errorNombre && !this.errorApellidos && !this.errorEmail && !this.errorTelefono && !this.errorContraseña && !this.coincide){
                    const datosUsu = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre: `${this.nombre}`, apellidos: `${this.apellidos}` , email: `${this.emailRegistro}`, telefono: `${this.telefono}`, contrasenia: `${this.contraseniaRegistro}`})
                    };
                    const result = await fetch(`http://localhost:8080/kimi/usuario`, datosUsu);
                    const data = await result.json();
                    alert("Registro con éxito")
                    this.$router.push('/');
                }else{
                    alert("Ya existe un email");
                }
                
            },

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
                this.errorEmail = !this.emailReg.test(this.emailRegistro);
            },

            validarTelefono(){
                this.errorTelefono = !this.telefonoReg.test(this.telefono);
            },

            validarContraseña(){
                this.errorContraseña = !this.contraseniaReg.test(this.contraseniaRegistro);
            },

            coincidenContraseña(){
                this.coincide = !(this.contraseniaRegistro === this.repContraseña);
            },

        }
    }
</script>