<script setup>
    import Header from './header.vue';
    import Footer from './footer.vue'; 
    import mensaje from './mensaje.vue';
</script>

<template>
    <Header />
    <section class="resumenPedido">
        <h6>Productos</h6>
        <img class="producto__imagen imagen__resumen" :src="`${productos.imagen}`" alt="imagen del producto" />
        <h6>Nombre : {{ productos.nombre }}</h6>
        <h6>Cantidad : {{ carrito.cantidad }}</h6>
        <h6 class="resumenPedido__h6">Total: {{ this.carrito.precioTotal }} €</h6>
        <label for="tarjetas" class="label__resumen">Elija la tarjeta con la que desea realizar el pago: </label>
        <select name="tarjetas">
            <option v-for="t in this.tarjetas" :key="t.id" value="{{ t.id }}">terminada en {{ t.n_tarjeta.slice(-4) }}</option>
        </select>
        <label for="direcciones">Elija la dirección</label>
        <select name="direcciones" >
            <option class="opcion" v-for="d in this.direcciones" :key="d.id" value="{{ d.id }}"> {{ d.nombre_calle }}, {{ d.ciudad }}, {{ d.provincia }},{{ d.codigo_postal }}</option>
        </select>
        <button class="btn__mediano btn__pedido" @click="GuardarPedido()">Confirmar Pedido</button>
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
                carrito:{},
                productos:{},
                pedidoRealizado: false,
            }
        },
        mounted(){
            this.getAddresses(),
            this.getCard()
            this.getCarrito();
        },
        methods: {
            async getCard(){
                const response = await fetch(`https://springkimiback-production.up.railway.app/kimi/tarjetas/usuario/${this.idUsuario}`);
                this.tarjetas = await response.json();
            },

            async getAddresses(){
                const response = await fetch(`https://springkimiback-production.up.railway.app/kimi/direcciones/usuario/${this.idUsuario}`);
                this.direcciones = await response.json();
            },

            async getCarrito(){
                const response = await fetch(`https://springkimiback-production.up.railway.app/kimi/carrito/:${localStorage.getItem('idCarro')}`);
                this.carrito = await response.json();
                this.carrito.precioTotal = this.carrito.precioTotal.toFixed(2);
                console.log(this.carrito);
                const result = await fetch(`https://springkimiback-production.up.railway.app/kimi/producto/:${localStorage.getItem("idProducto")}`);
                this.productos = await result.json();
            },

            async GuardarPedido(){
                let fecha_pedido = new Date();

                const datosPedido = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ usuarioId: `${localStorage.getItem('idUsuario')}`, productos: [`${this.productos.id}`] , fecha_pedido: `${fecha_pedido.getDate()}`, precioTotal: `${this.carrito.precioTotal}`, estado_pedido: 'enviado'})}
                    const result = await fetch(`https://springkimiback-production.up.railway.app/kimi/pedido`, datosPedido);
                    const data = await result.json();
                this.pedidoRealizado = true;
                setTimeout(() => {
                        this.$router.push(`/`)
                    }, 2000)
            }
        }
        
    }
</script>