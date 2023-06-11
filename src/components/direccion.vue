<script setup>
import mensaje from './mensaje.vue';
</script>


<template>
    <section class="direccion">
        <img alt="imagen de un mapa" src="" class="direccion__img" />
        <article class="direccion__acciones">
            <p class="accion">Editar</p>
            <hr class="separador" />
            <p class="accion" onclick="eliminar__dialog.showModal()">Descartar</p>
        </article>
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
            <p>Nombre de la Calle</p>
            <p>Pais</p>
            <p>Ciudad</p>
            <p>Código Postal</p>
        </article>
    </section>

    <mensaje v-if="mostrar">
          <template #mensaje>Se ha eliminado correctamente.</template>
    </mensaje>
</template>

<script>
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