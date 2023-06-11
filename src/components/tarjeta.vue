<script setup>
import mensaje from './mensaje.vue';
</script>

<template>
    <section class="tarjeta">
      <article class="tarjeta__frontal tarjeta__figura">
        <img class="tarjeta__chip" src="../assets/img/chip.png" alt="chip de la tarjeta de crédito" />
        <img class="tarjeta__logo" src="../assets/img/logoTienda2.png" alt="Logo de la página" />
        <p class="tarjeta__numero">**** **** **** 6258</p>
        <article class="card__space-75">
          <span class="tarjeta__texto">Titular</span>
          <p class="tarjeta__info">Pepe</p>
        </article>
          <article class="card__space-25">
            <span class="tarjeta__texto">Fecha</span>
            <p class="tarjeta__info">10/25</p>
          </article>
        </article>
        <dialog class="eliminar__dialog" id="eliminar__dialog" modal-mode="mega">
          <h6 class="dialog__h6">¿Estás seguro que quieres eliminar esta tarjeta?</h6>
          <footer class="footer__dialog">
            <button class="btn__mediano btn__cancelar" type="reset" onclick="eliminar__dialog.close()">Cancelar</button>
            <button class="btn__mediano btn__confirmar" onclick="eliminar__dialog.close()" @click="Mostrarmensaje()">
              Confirmar
            </button>
          </footer>
        </dialog>
        <article class="tarjeta__acciones">
          <p class="accion" @click="">Editar</p>
          <hr class="separador" />
          <p class="accion" onclick="eliminar__dialog.showModal()">Descartar</p>
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