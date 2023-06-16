<template>
    <section class="pedido" >
        <article class="pedido__caja" >
            <article class="pedido__info" >
                <h6><slot name="nombrePedido"></slot></h6>
                <p>Total : <slot name="total"></slot></p>
                <p>Estado del pedido: <slot name="estado"></slot></p>
            </article>
        </article>
    </section>
</template>
