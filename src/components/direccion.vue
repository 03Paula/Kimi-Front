<script setup>
import mensaje from './mensaje.vue';
</script>


<template>
    <section class="direccion">
        <img alt="imagen de un mapa" src="../assets/img/mapa.png" class="direccion__img" />
        <dialog class="eliminar__dialog" id="eliminar__dialog" modal-mode="mega">
          <h6 class="dialog__h6">¿Estás seguro que quieres eliminar esta dirección?</h6>
          <footer class="footer__dialog">
                    <button class="btn__mediano btn__cancelar" type="reset" onclick="eliminar__dialog.close()">Cancelar</button>
                    <button class="btn__mediano btn__confirmar" onclick="eliminar__dialog.close()" @click="Mostrarmensaje()">
                        Confirmar
                    </button>
                </footer>
        </dialog>
        <article class="direccion__datos" >
            <p><slot name="NombreCalle"></slot></p>
            <p><slot name="Pais"></slot></p>
            <p><slot name="Ciudad"></slot></p>
            <p><slot name="Postal"></slot></p>
        </article>
    </section>

    <mensaje v-if="mostrar">
          <template #mensaje>Se ha eliminado correctamente.</template>
    </mensaje>
</template>

<script>
/**
 * @file direccion.vue
 * @author Paula Flor.
 * 
 * @vue-data {Boolean} mostrar - Mostrará el mensaje si es verdadero.
 * @vue-event MostrarMensaje - Convierte el valor de mostrar a verdadero.
 * */

export default {
  data(){
    return {
      mostrar: false,
    }
  },
  methods: {
    Mostrarmensaje(){
      this.mostrar = true;
    }
  }
}
</script>