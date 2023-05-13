<script setup>
    import Header from './header.vue';
</script>

<template>
    <Header /> 
    <body>
        <div class="botones">
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
        </div>

        <div id="usuario" class="datosUsuario" v-if="mostrarDatos" >
            <div class="informacionUsuario">
                <img  class="avatar" src="../assets/images/Hachi.jpg" alt="Avatar del usuario" />
                <div class="lineaVertical"></div>
                
                <div class="datos">
                    <h6>Nombre: {{ nombre }}</h6>
                    <h6>Apellidos: {{ apellidos }}</h6>
                    <h6>Email: {{ email }}</h6>
                    <h6>Nombre de usuario: {{ nombreusu }}</h6>
                </div>
            </div>
            <div class="botones">
                <button class="btn__mediano" @click="cerrarSesion">
                    Cerrar Sesión
                </button>
            </div>
            
        </div>

        <div id="pedidos" class="datosUsuario" v-if="mostrarPedidos" >
            <h2 class="texto__usuario">Mis pedidos: </h2>
            <p class="texto__usuario">pedido</p>
        </div>

        <div id="direcciones" class="datosUsuario"  v-if="mostrarDirecciones" >
            <h2 class="texto__usuario">Mis direcciones</h2>
            <p class="texto__usuario">{{ direcciones }}</p>
            <button @click="otraDireccion()">
                Añadir dirección
            </button>
            <form v-if="nuevadireccion" v-on:submit.prevent="direccion()" class="formulario formularioUsuario">
                <label for="tipoCalle">Tipo de calle</label>
                <input id="tipoCalle" name="tipoCalle" placeholder="Avenida, calle..." type="text" v-model="calle" v-on:blur="calleValida" required />
                <p v-if="errorCalle" class="mensajesError">Escribe una calle válida</p>
                <label for="nombreCalle">Nombre de la calle</label>
                <input id="nombreCalle" name="nombreCalle" type="text" v-model="nombreCalle" v-on:blur="nombreValido" required />
                <p v-if="errorNombre" class="mensajesError">Escribe un nombre válido</p>
                <label for="numeroCalle">Número</label>
                <input type="number" id="numeroCalle" name="numeroCalle" v-model="numero" v-on:blur="numeroValido" required />
                <p v-if="errorNumero" class="mensajesError">No has introducido un número</p>
                <label for="piso">Piso</label>
                <input id="piso" name="piso" type="text" v-model="piso" v-on:blur="pisoValido" />
                <p v-if="errorPiso" class="mensajesError">Escribe el número de piso</p>
                <label for="provincia">Provincia</label>
                <input id="provincia" name="provincia" type="text" v-model="provincia" v-on:blur="provinciaValida" required />
                <p v-if="errorProvincia" class="mensajesError">Escribe una provincia válida</p>
                <label for="codigoPostal">Código Postal</label>
                <input id="codigoPostal" name="codigoPostal" type="text" v-model="codigoPostal" v-on:blur="codigoValido" required />
                <p v-if="errorPostal" class="mensajesError">Escribe un cógigo postal válido (5 dígitos)</p>
                <button class="btn__usuario">
                    Añadir
                </button>
            </form>
            
        </div>

        <div id="tarjetas" class="datosUsuario" v-if="mostrarTarjetas" >
            <h2 class="texto__usuario" >Mis tarjetas</h2>
            <p class="texto__usuario" >{{ tarjetas }}</p>
            <button @click="otraTarjeta()">
                Añadir Tarjeta
            </button>
            <form v-if="nuevatarjeta" v-on:submit.prevent="tarjeta()" class="formulario formularioTarjeta">
                <label for="titular">Nombre del titular</label>
                <input id="titular" name="titular"  type="text" v-model="titular" v-on:blur="titularValido" required />
                <p v-if="errorTitular" class="mensajesError">Escribe un nombre de titular válido</p>
                <label for="numeroTarjeta">Número de la tarjeta</label>
                <input id="numeroTarjeta" name="numeroTarjeta" type="text" v-model="numeroTarjeta" v-on:blur="tarjetaValida" placeholder="XXXX XXXX XXXX XXXX" required />
                <p v-if="errorTarjeta" class="mensajesError">Escribe un número válido</p>
                <label for="vencimiento">Fecha de vencimiento</label>
                <input id="vencimiento" name="vencimiento" type="text" v-model="vencimiento" v-on:blur="vencimientoValido" placeholder="dd/mm" required/>
                <p v-if="errorVencimiento" class="mensajesError">Escribe una fecha de vencimiento válida (dd/mm)</p>
                <button>
                    Añadir
                </button>
            </form>
        </div>

        <Volver />
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
 * @vue-data {String} nombreusu - Almacena el nombre de usuario que se encuentra almacenado en el localStorage. 
 * @vue-data {Boolean} nuevadireccion - Si es verdadero se muestra el formulario para una nueva dirección.
 * @vue-data {String} direcciones - Almacena las direcciones del usuario que se encuentran almacenados en el localStorage.
 * @vue-data {String} tarjetas - Almacena la tarjeta del usuario que se encuentra almacenado en el localStorage.
 * 
 * @vue-data {Boolean} mostrarDatos - Muestra la información de los datos del usuario
 * @vue-data {Boolean} mostrarPedidos - Muestra la información de los pedidos del usuario.
 * @vue-data {Boolean} mostrarDirecciones - Muestra la información de las direcciones.
 * @vue-data {Boolean} mostrarTarjetas - Muestra la información relativa a las tarjetas del usuario.
 * @vue-data {String} calle - Almacena la calle.
 * @vue-data {String} nombreCalle - Almacena el nombre de la calle.
 * @vue-data {Int} numero - Almacena el número de la casa.
 * @vue-data {Int} piso - Almacena el número del piso.
 * @vue-data {String} provincia - Almacena la provincia.
 * @vue-data {Int} codigoPostal - Almacena el código postal.
 * @vue-data {Boolean} errorCalle - Si es verdadero muestra el mensaje de error.
 * @vue-data {Boolean} errorNombre - Si es verdadero muestra el mensaje de error.
 * @vue-data {Boolean} errorNumero - Si es verdadero muestra el mensaje de error.
 * @vue-data {Boolean} errorPiso - Si es verdadero muestra el mensaje de error.
 * @vue-data {Boolean} errorProvincia- Si es verdadero muestra el mensaje de error.
 * @vue-data {Boolean} errorPostal - Si es verdadero muestra el mensaje de error.
 * @vue-data {String} titular - Almacena el titular de la tarjeta.
 * @vue-data {String} numeroTarjeta - Almacena el número de la tarjeta.
 * @vue-data {String} vencimiento - Almacena la fecha de vencimiento de la tarjeta.
 * @vue-data {Boolean} nuevaTarjeta - Muestra el formulario para añadir una nueva tarjeta.
 * @vue-data {Boolean} errorTitular - Si es true aparece el mensaje de error.
 * @vue-data {Boolean} errorTarjeta - Si es true aparece el mensaje de error.
 * @vue-data {Boolean} errorVencimiento - Si es true aparece el mensaje de error.
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
 * @vue-event nombreValida - Valida la expresion regular con el valor del nombre de la calle.
 * @vue-event numeroValida - Valida la expresion regular con el valor del número.
 * @vue-event pisoValida - Valida la expresion regular con el valor del piso.
 * @vue-event provinciaValida - Valida la expresion regular con el valor de la provincia.
 * @vue-event codigoValido - Valida la expresion regular con el valor del código postal.
 * 
 * @vue-event direccion - Si no hay fallos almacena el valor de la direccion en el localStorage.
 * @vue-event titularValido - Valida la expresión regular con el valor del titular.
 * @vue-event tarjetaValida - Valida la expresión regular con el valor del número de la tarjeta.
 * @vue-event vencimientoValido - Valida la expresión regular con el valor del vencimiento.
 * @vue-event tarjeta - Si no hay errores se almacena la tarjeta en el localStorage.
 */
    export default {
        data() {
            return {
                usuario: {},
                nombre: localStorage.getItem("usuario"),
                apellidos: localStorage.getItem("apellidos"),
                email: localStorage.getItem("email"),
                nombreusu: localStorage.getItem("nombreusu"),
                nuevadireccion: false,
                direcciones: localStorage.getItem("direccion"),
                tarjetas: localStorage.getItem("tarjetas"),

                mostrarDatos: true,
                mostrarPedidos:false,
                mostrarDirecciones:false,
                mostrarTarjetas:false,

                calle: "",
                nombreCalle: "",
                numero: "",
                piso: "",
                provincia: "",
                codigoPostal: "",
                errorCalle:false,
                errorNombre:false,
                errorNumero:false,
                errorPiso: false,
                errorProvincia:false,
                errorPostal:false,

                titular:"",
                numeroTarjeta:"",
                vencimiento:"",
                nuevatarjeta:false,
                errorTitular: false,
                errorTarjeta:false,
                errorVencimiento:false,

                nombresReg:  new RegExp(/^[A-z]{3,}[\s]*[A-z]*[\s]*[A-z]*[\s]*[A-z]*/),
                numeroReg: new RegExp(/^\d{1,3}$/),
                postalReg: new RegExp(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/),
                tarjetaReg : new RegExp(/^(?:\d{15,16}|\d{4}(?:(?:\s+\d{4}){3}|\s+\d{6}\s\d{5}))$/),
                vencimientoReg: new RegExp(/^\d{2}\/\d{2}$/)

            }
        },
        methods: {
            cerrarSesion(){
                if(window.confirm('¿Estás seguro que quieres cerrar sesión?')){
                    localStorage.clear();
                    this.$router.push('/');
                }
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

            calleValida(){
                this.errorCalle = !this.nombresReg.test(this.calle);
            },

            nombreValido(){
                this.errorNombre = !this.nombresReg.test(this.nombreCalle);
            },

            numeroValido(){
                this.errorNumero = !this.numeroReg.test(this.numero);
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

            direccion(){
                if(!this.errorCalle && !this.errorNombre && !this.errorProvincia && !this.errorNumero && !this.errorPiso && !this.errorPostal){
                    const nuevadir = this.calle + ' ' + this.nombreCalle + ' ' + this.numero + ' ' + this.piso + ' ,' + this.provincia ;
                    localStorage.setItem("direccion", nuevadir)
                    alert("nueva dirección añadida");
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

            tarjeta(){
                if(!this.errorTitular && !this.errorTarjeta && !this.errorVencimiento){
                    let ultimosNumeros ="";
                    this.numeroTarjeta = this.numeroTarjeta.trim()
                    for( let i=0 ; i < this.numeroTarjeta.length ; i++){
                        if(i >= 14){
                            ultimosNumeros += this.numeroTarjeta[i];
                            console.log(ultimosNumeros)
                        }
                    }
                    console.log(ultimosNumeros)
                    const credito = '**** **** **** ' + ultimosNumeros;
                    localStorage.setItem("tarjetas", credito);
                    alert("Tarjeta añadida");
                }
            }

        }
    }

</script>