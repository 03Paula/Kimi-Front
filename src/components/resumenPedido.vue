<script setup>
    import Header from './header.vue';
    import Footer from './footer.vue'; 
    import mensaje from './mensaje.vue';
</script>

<template>
    <Header />
    <section class="resumenPedido">
        <h6 class="resumenPedido__h6">Productos</h6>
        <h6 class="resumenPedido__h6">Total: </h6>
        <label for="tarjetas">Elija la tarjeta con la que desea realizar el pago: </label>
        <select name="tarjetas">
            <option v-for="t in this.tarjetas" :key="t.id" value="{{ t.id }}">terminada en {{ t.n_tarjeta.slice(-4) }}</option>
        </select>
        <label for="direcciones">Elija la dirección</label>
        <select name="direcciones" >
            <option v-for="d in this.direcciones" :key="d.id" value="{{ d.id }}"> {{ d.nombre_calle }}, {{ d.ciudad }}, {{ d.provincia }},{{ d.codigo_postal }}</option>
        </select>
        <button class="btn__mediano btn__pedido" @click="GuardarPedido()">Realizar Pedido</button>
        <mensaje v-if="pedidoRealizado">
            <template #mensaje>Pedido Realizado con éxito.</template>
        </mensaje>
    </section>
    <Footer />
</template>

<script>
/**
 * @file resumenPedido.vue - Componente para el resumen del pedido.
 * @uthor Paula Flor
 * 
 * @vue-data {String} idUsuario - Almacena la id del usuario.
 * @vue-data {Object} tarjetas - Almacena las tarjetas para su elección.
 * @vue-data {Integer} direcciones - Almacena las direcciones para su elección.
 * @vue-data {Boolean} pedidoRealizado - Almacena si se ha realizado un pedido o no.
 * 
 * @vue-event getCard - Obtiene todas las tarjetas.
 * @vue-event getAddresses - Obtiene todas las direcciones.
 * @vue-event guardarPedido - Muestra el mensaje y vuelve a la página del listado.
 * */

export default {
        data() {
            return {
                idUsuario: localStorage.getItem('idUsuario'),
                tarjetas:{},
                direcciones:{},
                pedidoRealizado: false,
            }
        },
        mounted(){
            this.getAddresses(),
            this.getCard()
        },
        methods: {
            async getCard(){
                const response = await fetch(`http://localhost:8080/kimi/tarjetas/usuario/${this.idUsuario}`);
                this.tarjetas = await response.json();
            },

            async getAddresses(){
                const response = await fetch(`http://localhost:8080/kimi/direcciones/usuario/${this.idUsuario}`);
                this.direcciones = await response.json();
            },

            async GuardarPedido(){
                this.pedidoRealizado = true;
                this.$router.push('/')
            }
        }
        
    }
</script>