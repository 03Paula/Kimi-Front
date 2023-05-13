<script setup>
    import Header from './header.vue';
</script>


<template>
    <Header />
    <body>
        <div class="contacto">
            <div class="contactanos">
                <h2 class="contactoTitulo">Contáctanos</h2>
                <h6 class="contacto__h6">Si tienes alguna duda,comentario o sugerencia puedes contactarnos y nos pondremos en contacto 
                    contigo lo antes posible.
                </h6>
                <img class="logoTienda" src="../assets/img/logoTienda2.png" alt="Logo de la página" />
            </div>
            <div class="lineaVertical2"></div>
            <div class="formulario__contacto">
                <form v-on:submit.prevent="contactar()">
                    <label for="motivo">Motivo <font color="red">*</font></label>
                    <select name="motivos" id="motivos">
                        <option value="empty"></option>
                        <option value="javascript">Mejoras</option>
                        <option value="php">Pedidos</option>
                    </select>
                    <label for="nombreCompleto">Nombre completo <font color="red">*</font></label>
                    <input type="text" name="nombreCompleto" id="nombreCompleto" v-model="nombrecompleto" v-on:blur="validarNombre" required  />
                    <p v-if="errorNombre" class="erroresContacto">Debe de tener al menos 3 letras</p>
                    <label for="email">Email <font color="red">*</font></label>
                    <input type="email" name="email" id="email" v-model="email" v-on:blur="validarEmail" required />
                    <p v-if="errorEmail" class="erroresContacto">El email no es válido.</p>
                    <label for="comentarios">Comentarios <font color="red">*</font></label>
                    <textarea name="comentarios" id="cometario" v-model="comentarios" v-on:blur="validarComentarios" required>
                    </textarea>
                    <p v-if="errorComentario" class="erroresContacto">Escribe al menos 2 palabras.</p>
                    <input type="checkbox" id="checkBox"/>
                    <label class="politicas" >He leído y acepto la política de privacidad</label>
                    <button class="btn__pequenio btn__enviarComentario">Enviar</button>
                </form>
            </div>
        </div>
    </body>
</template>