<template>
    <header class="header">
        <RouterLink to="/"><img alt="Logo de la tienda" src="../assets/img/logoTienda 1.png" class="header__logo"/> </RouterLink>
        <article class="header__barraBusqueda">
            <input class="header__inputBusqueda" type="text" placeholder="Buscar en kimi" />
            <button class="header__busqueda"><img alt="icono de una lupa" src="../assets/img/lupa.png"/></button>
        </article>
        <article class="nav-bar">
            <RouterLink to="/usuario" class="link__usuario" style="text-decoration: none; color: inherit;"><img alt="icono de usuario" src="../assets/img/userIcon.png" class="iconos_header" /><p class="p_header">Usuario</p></RouterLink>
            <RouterLink to="/contacto" class="link__contacto" style="text-decoration: none; color: inherit;"><img alt="icono de telefono" src="../assets/img/telefono.png" class="iconos_header "/><p class="p_header">Contacto</p></RouterLink>
        </article>
    </header>
</template>