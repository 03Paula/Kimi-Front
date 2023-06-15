<script setup>
    import Header from './header.vue';
    import Footer from './footer.vue';
    import Tarjeta from './tarjeta.vue';
    import Pedido from './pedido.vue';
    import Direccion from './direccion.vue';
    import Mensaje from './mensaje.vue';
</script>

<template>
    <Header /> 
    <body>
        <section class="usuario" id="pagUsuario">
        <section class="botones">
            <button class="btn__grande btn__datos" @click="misDatos()" >
                Mis datos
            </button>
            <button class="btn__grande btn__datos" @click="misPedidos()" >
                Mis pedidos
            </button>
            <button class="btn__grande btn__datos" @click="misDirecciones()" >
                Direcciones
            </button>
            <button class="btn__grande btn__datos" @click="misTarjetas()" >
                Tarjetas
            </button>
        </section>
        <Mensaje v-if="mostrarMensaje">
            <template #mensaje>Se ha añadido correctamente.</template>
        </Mensaje>

        <section id="usuario" class="datosUsuario" v-if="mostrarDatos" >
            <h2 class="datos__titulo">Mis datos</h2>
            <article class="informacionUsuario">
                <img  class="avatar" src="../assets/img/Hachi.jpg" alt="Avatar del usuario"/>
                <div class="lineaVertical"></div>
                
                <article class="datos" >
                    <h6>Nombre: {{ this.usuario.nombre }}</h6>
                    <h6>Apellidos: {{ this.usuario.apellidos }}</h6>
                    <h6>Email: {{ this.usuario.email}}</h6>
                    <h6>Número de teléfono: {{ this.usuario.telefono }}</h6>
                </article>
            </article>
            <dialog class="sesion__dialog" id="sesion__dialog" modal-mode="mega">
                <h6 class="dialog__h6">¿Estás seguro que quieres cerrar sesión?</h6>
                <footer class="footer__dialog">
                    <button class="btn__mediano btn__cancelar" type="reset" onclick="sesion__dialog.close()">Cancelar</button>
                    <button class="btn__mediano btn__confirmar" @click="cerrarSesion()" onclick="sesion__dialog.close()">
                        Confirmar
                    </button>
                </footer>
            </dialog>
            <article class="botones">
                <button class="btn__mediano btn_sesion" onclick="sesion__dialog.showModal()">
                    Cerrar Sesión
                </button>
                <button class="btn__mediano btn_sesion">
                    Editar datos
                </button>
            </article>
            
        </section>

        <section id="pedidos" class="datosUsuario" v-if="mostrarPedidos" >
            <h2 class="datos__titulo">Mis pedidos: </h2>
            <Pedido />
        </section>

        <section id="direcciones" class="datosUsuario"  v-if="mostrarDirecciones" >
            <h2 class="datos__titulo">Mis direcciones</h2>
            <div  v-for="d in this.direcciones" :key="d.id">
                <Direccion >
                    <template #NombreCalle>{{ d.nombre_calle }}</template>
                    <template #Pais>{{ d.pais }}</template>
                    <template #Ciudad>{{ d.ciudad }}</template>
                    <template #Postal>{{ d.codigo_postal }}</template>
                </Direccion>
            </div>
            <dialog class="dir__dialog" id="dir__dialog" modal-mode="mega">
                <header class="header__dialog">
                    <h5><img src="../assets/img/ubicacion.png" alt="icono de ubicación" class="header__dialog__img" />Nueva Dirección </h5>
                </header>
                <form class="dialog__form" method="tarjeta__dialog">
                    <label for="calle">Nombre de la calle <font color="red">*</font></label>
                    <input id="calle" name="calle" type="text" v-model="calle" v-on:blur="calleValida" placeholder="Ej: avda Castro Nº 33" class="input__dialog" required />
                    <p v-if="errorCalle" class="dialog__mensajesError">Escribe un nombre válido.</p>
                    <label for="piso">Piso</label>
                    <input id="piso" name="piso" type="text" v-model="piso" v-on:blur="pisoValido" class="input__dialog" />
                    <p v-if="errorPiso" class="dialog__mensajesError">Escribe un número de piso válido.</p>
                    <label for="provincia">Provincia <font color="red">*</font></label>
                    <input id="provincia" name="provincia" type="text" v-model="provincia" v-on:blur="provinciaValida" class="input__dialog" required />
                    <p v-if="errorProvincia" class="dialog__mensajesError">Escribe una provincia válida.</p>
                    <label for="pais">País <font color="red">*</font></label>
                    <input id="pais" name="pais" type="text" v-model="pais" v-on:blur="paisValido" class="input__dialog" required />
                    <p v-if="errorPais" class="dialog__mensajesError">Escribe un pais válido.</p>
                    <label for="ciudad">Ciudad <font color="red">*</font></label>
                    <input id="ciudad" name="ciudad" type="text" v-model="ciudad" v-on:blur="ciudadValida" class="input__dialog" required />
                    <p v-if="errorCiudad" class="dialog__mensajesError">Escribe una ciudad válida.</p>
                    <label for="codigoPostal">Código Postal <font color="red">*</font></label>
                    <input id="codigoPostal" name="codigoPostal" type="text" v-model="codigoPostal" v-on:blur="codigoValido" class="input__dialog" required />
                    <p v-if="errorPostal" class="dialog__mensajesError">Escribe un cógigo postal válido (5 dígitos).</p>
                </form>
                <footer class="footer__dialog">
                    <button class="btn__mediano btn__cancelar" type="reset" onclick="dir__dialog.close()">Cancelar</button>
                    <button class="btn__mediano btn__confirmar" @click="direccion()">
                        Añadir
                    </button>
                </footer>
            </dialog>
            <button onclick="dir__dialog.showModal()" class="btn__mediano btn__direccion">Añadir Dirección </button>
        </section>

        <section id="tarjetas" class="datosUsuario" v-if="mostrarTarjetas" >
            <h2 class="datos__titulo tarjeta__titulo" >Mis tarjetas</h2>
            <div id="cTarjetas" class="coleccion_tarjetas" v-for="t in this.tarjetas" :key="t.id" >
                <Tarjeta>
                    <template #Numero >**** **** **** {{ t.n_tarjeta.slice(-4) }}</template>
                    <template #Titular>{{ t.titular }}</template>
                    <template #Fecha>{{ t.vencimiento }}</template>
                </Tarjeta>
            </div>
            <dialog class="tarjeta__dialog" id="tarjeta__dialog" modal-mode="mega">
                <header class="header__dialog">
                    <h5><img src="../assets/img/tarjeta-bancaria.png" alt="icono tarjeta" class="header__dialog__img" />Nueva Tarjeta </h5>
                </header>
                <form class="dialog__form" method="tarjeta__dialog">
                    <label for="titular">Nombre del titular <font color="red">*</font></label>
                    <input id="titular" name="titular"  type="text" v-model="titular" v-on:blur="titularValido" class="input__dialog" required />
                    <p v-if="errorTitular" class="dialog__mensajesError">Escribe un nombre de titular válido</p>
                    <label for="numeroTarjeta">Número de la tarjeta <font color="red">*</font></label>
                    <input id="numeroTarjeta" name="numeroTarjeta" type="text" v-model="numeroTarjeta" v-on:blur="tarjetaValida" placeholder="XXXX XXXX XXXX XXXX" class="input__dialog" required />
                    <p v-if="errorTarjeta" class="dialog__mensajesError">Escribe un número válido</p>
                    <label for="vencimiento">Fecha de vencimiento <font color="red">*</font></label>
                    <input id="vencimiento" name="vencimiento" type="text" v-model="vencimiento" v-on:blur="vencimientoValido" placeholder="dd/mm" class="input__dialog" required/>
                    <p v-if="errorVencimiento" class="dialog__mensajesError">Escribe una fecha de vencimiento válida (dd/mm)</p>
                    <label for="cvv">Cvv<font color="red">*</font></label>
                    <input id="cvv" name="cvv" type="text" v-model="cvv" v-on:blur="cvvValido" placeholder="XXX" class="input__dialog" required/>
                    <p v-if="errorCvv" class="dialog__mensajesError">Excribe un número de cvv válido (3 dígitos)</p>
                </form>
                <footer class="footer__dialog">
                    <button class="btn__mediano btn__cancelar" type="reset" onclick="tarjeta__dialog.close()">Cancelar</button>
                    <button class="btn__mediano btn__confirmar" @click="tarjeta()" >
                        Añadir
                    </button>
                </footer>
            </dialog>
            <button onclick="tarjeta__dialog.showModal()" class="btn__mediano btn__tarjeta">Añadir Tarjeta</button>
        </section>
        <Footer />
    </section>
    </body>
</template>

<script>
/**
 * @file Usuario.vue - Componente para la página de usuario.
 * @uthor Paula Flor
 * 
 * @vue-data {Object} usuario - Almacena todos los usuarios.
 * @vue-data {String} nombre - Almacena el nombre del usuario que se encuentra almacenado en el localStorage.
 * @vue-data {String} apellidos - Almacena los apellidos del usuario que se encuentran almacenados en el localStorage.
 * @vue-data {String} email - Almacena el email del usuario que se encuentra almacenado en el localStorage.
 * @vue-data {Boolean} nuevadireccion - Si es verdadero se muestra el formulario para una nueva dirección.
 * @vue-data {String} direcciones - Almacena las direcciones del usuario que se encuentran almacenados en el localStorage.
 * @vue-data {String} tarjetas - Almacena la tarjeta del usuario que se encuentra almacenado en el localStorage.
 * 
 * @vue-data {Boolean} mostrarDatos - Muestra la información de los datos del usuario
 * @vue-data {Boolean} mostrarPedidos - Muestra la información de los pedidos del usuario.
 * @vue-data {Boolean} mostrarDirecciones - Muestra la información de las direcciones.
 * @vue-data {Boolean} mostrarTarjetas - Muestra la información relativa a las tarjetas del usuario.
 * @vue-data {String} calle - Almacena la calle.
 * @vue-data {Int} numero - Almacena el número de la casa.
 * @vue-data {Int} piso - Almacena el número del piso.
 * @vue-data {String} provincia - Almacena la provincia.
 * @vue-data {Int} codigoPostal - Almacena el código postal.
 * @vue-data {Boolean} errorCalle - Si es verdadero muestra el mensaje de error.
 * @vue-data {Boolean} errorNumero - Si es verdadero muestra el mensaje de error.
 * @vue-data {Boolean} errorPiso - Si es verdadero muestra el mensaje de error.
 * @vue-data {Boolean} errorProvincia- Si es verdadero muestra el mensaje de error.
 * @vue-data {Boolean} errorPostal - Si es verdadero muestra el mensaje de error.
 * @vue-data {String} titular - Almacena el titular de la tarjeta.
 * @vue-data {String} numeroTarjeta - Almacena el número de la tarjeta.
 * @vue-data {String} vencimiento - Almacena la fecha de vencimiento de la tarjeta.
 *  @vue-data {String} cvv - Almacena el cvv de la tarjeta.
 * @vue-data {Boolean} nuevaTarjeta - Muestra el formulario para añadir una nueva tarjeta.
 * @vue-data {Boolean} errorTitular - Si es true aparece el mensaje de error.
 * @vue-data {Boolean} errorTarjeta - Si es true aparece el mensaje de error.
 * @vue-data {Boolean} errorVencimiento - Si es true aparece el mensaje de error.
 * @vue-data {Boolean} errorCvv - Si es true aparece el mensaje de error.
 * @vue-data {String} nombresReg - Expresión regular para validar el texto.
 * @vue-data {String} numeroReg - Expresión regular para validar el numero de calle y piso.
 * @vue-data {String} postalReg - Expresión regular para validar el código postal.
 * @vue-data {String} tarjetaReg - Expresión regular para validar el número de la tarjeta.
 * @vue-data {String} vencimientoReg - Expresión regular para validar la fecha de vencimiento de la tarjeta.
 * 
 * @vue-event cerrarSesion - Permite cerrar sesión.
 * @vue-event misDatos - Permite que solo se muestre la información de los datos del usuario.
 * @vue-event misPedidos - Permite que solo se muestre la información de los pedidos.
 * @vue-event misDirecciones - Permite que solo de muestre la información de las direcciones.
 * @vue-event misTarjetar - Permite que solo se muestren los datos de las tarjetas.
 * @vue-event calleValida - Valida la expresion regular con el valor de calle.
 * @vue-event calleValida - Valida la expresion regular con el valor de calle.
 * @vue-event numeroValida - Valida la expresion regular con el valor del número.
 * @vue-event pisoValida - Valida la expresion regular con el valor del piso.
 * @vue-event provinciaValida - Valida la expresion regular con el valor de la provincia.
 * @vue-event codigoValido - Valida la expresion regular con el valor del código postal.
 * 
 * @vue-event direccion - Si no hay fallos almacena el valor de la direccion en la base de datos.
 * @vue-event titularValido - Valida la expresión regular con el valor del titular.
 * @vue-event tarjetaValida - Valida la expresión regular con el valor del número de la tarjeta.
 * @vue-event vencimientoValido - Valida la expresión regular con el valor del vencimiento.
 * @vue-event tarjeta - Si no hay errores se almacena la tarjeta en la base de datos.
 */
    export default {
        data() {
            return {
                idUsuario: localStorage.getItem('idUsuario'),
                usuario: {},
                tarjetas: {},
                direcciones: {},
                mostrarDatos: true,
                mostrarPedidos:false,
                mostrarDirecciones:false,
                mostrarTarjetas:false,
                mostrarMensaje:false,

                calle: "",
                pais: "",
                ciudad: "",
                piso: "",
                provincia: "",
                codigoPostal: "",
                errorCalle:false,
                errorPiso:false,
                errorPais:false,
                errorCiudad: false,
                errorProvincia:false,
                errorPostal:false,

                titular:"",
                numeroTarjeta:"",
                vencimiento:"",
                cvv: "",
                nuevatarjeta:false,
                errorTitular: false,
                errorTarjeta:false,
                errorVencimiento:false,
                errorCvv: false,

                nombresReg:  new RegExp(/^[A-z]{3,}[\s]*[A-z]*[\s]*[A-z]*[\s]*[A-z]*/),
                postalReg: new RegExp(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/),
                numeroReg: new RegExp(/^\d{1,3}$/),
                cvvReg: new RegExp(/^\d{3}$/),
                tarjetaReg : new RegExp(/^(?:\d{15,16}|\d{4}(?:(?:\s+\d{4}){3}|\s+\d{6}\s\d{5}))$/),
                vencimientoReg: new RegExp(/^\d{2}\/\d{2}$/)

            }
        },
        mounted(){
            this.getUser();
            this.getCard();
            this.getAddresses();
        },
        methods: {
            async getUser(){
                console.log(this.idUsuario)
                const response = await fetch(`http://localhost:8080/kimi/usuario/${this.idUsuario}`);
                this.usuario = await response.json();
            },

            async getCard(){
                const response = await fetch(`http://localhost:8080/kimi/tarjetas/usuario/${this.idUsuario}`);
                this.tarjetas = await response.json();
            },

            async getAddresses(){
                const response = await fetch(`http://localhost:8080/kimi/direcciones/usuario/${this.idUsuario}`);
                this.direcciones = await response.json();
            },

            cerrarSesion(){
                localStorage.clear();
                this.$router.push('/');
            },

            misDatos(){
                this.mostrarDatos = true;
                this.mostrarDirecciones = false;
                this.mostrarPedidos = false;
                this.mostrarTarjetas = false;
            },

            misPedidos(){
                this.mostrarPedidos = true;
                this.mostrarDatos = false;
                this.mostrarDirecciones = false;
                this.mostrarTarjetas = false;
            },

            misDirecciones(){
                this.mostrarDirecciones = true;
                this.mostrarDatos = false;
                this.mostrarPedidos = false;
                this.mostrarTarjetas = false;
            },

            misTarjetas(){
                this.mostrarTarjetas = true;
                this.mostrarDatos = false;
                this.mostrarDirecciones = false;
                this.mostrarPedidos = false;
            },

            otraDireccion(){
                if(this.nuevadireccion == false){
                    this.nuevadireccion = true;
                }else{
                    this.nuevadireccion = false;
                }
            },

            otraTarjeta(){
                if(this.nuevatarjeta == false){
                    this.nuevatarjeta = true;
                }else{
                    this.nuevatarjeta = false;
                }
            },

            ciudadValida(){
                this.errorCiudad = !this.nombresReg.test(this.ciudad);
            },

            calleValida(){
                this.errorCalle = !this.nombresReg.test(this.calle);
            },

            paisValido(){
                this.errorPais = !this.nombresReg.test(this.pais);
            },

            pisoValido(){
                this.errorPiso = !this.numeroReg.test(this.piso);
            },

            provinciaValida(){
                this.errorProvincia = !this.nombresReg.test(this.provincia)
            },

            codigoValido(){
                this.errorPostal = !this.postalReg.test(this.codigoPostal);
            },

            async direccion(){
                if(!this.errorCiudad && !this.errorCalle && !this.errorProvincia && !this.errorPais && !this.errorPiso && !this.errorPostal){
                    const nuevaDireccion = {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ nombre_calle: `${this.calle}`, piso: `${this.piso}` , provincia: `${this.provincia}`, pais: `${this.pais}`, codigo_postal: `${this.codigoPostal}`, ciudad: `${this.ciudad}`, usuarioId: `${this.idUsuario}`})
                    }
                    const result = await fetch(`http://localhost:8080/kimi/direccion`, nuevaDireccion);
                    dir__dialog.close();
                    this.mostrarMensaje= true,
                    this.$router.push('usuario');
                }
            },

            titularValido(){
                this.errorTitular = !this.nombresReg.test(this.titular);
            },

            tarjetaValida(){
                this.errorTarjeta = !this.tarjetaReg.test(this.numeroTarjeta);
            },

            vencimientoValido(){
                this.errorVencimiento = !this.vencimientoReg.test(this.vencimiento);
            },

            cvvValido(){
                this.errorCvv = !this.cvvReg.test(this.cvv);
            },

            async tarjeta(){
                if(!this.errorTitular && !this.errorTarjeta && !this.errorVencimiento && !this.errorcvv){
                    const nuevaTarjeta = {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ cvv: `${this.cvv}`, titular: `${this.titular}` , n_tarjeta: `${this.numeroTarjeta}`, vencimiento: `${this.vencimiento}`, usuarioId: `${this.idUsuario}`})
                    }
                    const result = await fetch(`http://localhost:8080/kimi/tarjeta`, nuevaTarjeta);
                    tarjeta__dialog.close();
                    this.mostrarMensaje=true;
                    
                }
            }

        }
    }

</script>