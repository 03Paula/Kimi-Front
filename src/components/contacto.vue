<script setup>
    import Header from './header.vue';
</script>


<template>
    <Header />
    <body>
        <section class="contacto">
            <article class="contactanos">
                <h2 class="contactoTitulo">Contáctanos</h2>
                <h6 class="contacto__h6">Si tienes alguna consulta o comentario puedes contactarnos y nos pondremos en contacto 
                    contigo lo antes posible.
                </h6>
                <img class="logoTienda" src="../assets/img/logoTienda2.png" alt="Logo de la página" />
            </article>
            <div class="lineaVertical2"></div>
            <article class="formulario__contacto">
                <form v-on:submit.prevent="contactar()">
                    <label for="motivo">Motivo <font color="red">*</font></label>
                    <select name="motivos" id="motivos">
                        <option value="mejoras">Mejoras</option>
                        <option value="ConsultarPedido">Consultar sobre un pedido de la tienda</option>
                        <option value="devoluación">Hacer una devolución</option>
                        <option value="estadoPedido">Preguntar por el estado de mi pedido</option>
                        <option value="reclamación">Hacer una reclamación</option>
                        <option value="otrasConsultas">Otras consultas</option>
                    </select>
                    <label for="nombreCompleto">Nombre completo <font color="red">*</font></label>
                    <input type="text" name="nombreCompleto" id="nombreCompleto" v-model="nombrecompleto" v-on:blur="validarNombre" required  />
                    <p v-if="errorNombre" class="erroresContacto">Debe de tener al menos 3 letras.</p>
                    <label for="email">Email <font color="red">*</font></label>
                    <input type="email" name="email" id="email" v-model="email" v-on:blur="validarEmail" required />
                    <p v-if="errorEmail" class="erroresContacto">El email no es válido.</p>
                    <label for="comentarios">Comentario o consulta <font color="red">*</font></label>
                    <textarea name="comentarios" id="cometario" v-model="comentarios" v-on:blur="validarComentarios" required>
                    </textarea>
                    <p v-if="errorComentario" class="erroresContacto">Escribe al menos 2 palabras.</p>
                    <article class="politicaPrivacidad">
                        <input type="checkbox" id="checkBox"/>
                        <label class="politicas" >He leído y acepto la política de privacidad.</label>
                    </article>
                    <button class="btn__pequenio btn__enviarComentario">Enviar</button>
                </form>
            </article>
        </section>
    </body>
</template>

<script>
/**
 * @file Contacto.vue
 * @author Paula Flor.
 * 
 * @vue-data {String} nombrecompleto - Almacena el nombre completo del usuario.
 * @vue-data {String} email - Almacena el email del usuario.
 * @vue-data {String} comentarios - Almacena los comentarios.
 * @vue-data {String} errorNombre - Muestra el mensaje de error si es true.
 * @vue-data {String} errorEmail - Muestra el mensaje de error si es true.
 * @vue-data {String} errorComentario - Muestra el mensaje de error si es true.
 * @vue-data {String} nombreReg - Expresión regular para validar el nombre completo.
 * @vue-data {String} emailReg - Expresión regular para validar el email.
 * @vue-data {String} comentariosReg - Expresión regular para validar el comenatrio.
 * 
 * @vue-event validarNombre - Valida el nombre con la expresión regular correspondiente.
 * @vue-event validarEmail - Valida el email con la expresión regular correspondiente.
 * @vue-event validarComentarios - Valida los comentarios con la expresión regular correspondiente.
 * @vue-event contactar - Si no hay errores se redirige a la página del listado.
 */

    export default {
        data() {
            return{
                nombrecompleto: "",
                email: "",
                comentarios: "",
                errorNombre: false,
                errorEmail: false,
                errorComentario:false,

                nombreReg: new RegExp(/^[A-z]{3,}[\s]*[A-z]*/),
                emailReg: new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
                comentariosReg: new RegExp(/^[A-z]+\s[A-z]*/)
            }
        },
        methods: {
            validarNombre() {
                this.errorNombre = !this.nombreReg.test(this.nombrecompleto);
            },

            validarEmail() {
                this.errorEmail = !this.emailReg.test(this.email);
            },

            validarComentarios() {
                this.errorComentario = !this.comentariosReg.test(this.comentarios)
            },

            contactar(){
                if(!this.errorNombre && !this.errorEmail && !this.errorComentario){
                    alert("Comentarios enviados");
                    this.$router.push('/');
                }
            }
        }

    }
</script>