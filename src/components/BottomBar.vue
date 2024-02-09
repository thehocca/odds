<template>
    <ul class="footer__menu d-lg-none">
        <li>
            <RouterLink to="/" class="d-grid justify-content-center">
                <span><i class="fa fa-home"></i></span>
                <span class="texta">Anasayfa</span>
            </RouterLink>
        </li>
        <li>
            <RouterLink to="/" class="d-grid justify-content-center">
                <span><i class="fas fa-table-tennis"></i></span>
                <span class="texta">Sporlar</span>
            </RouterLink>
        </li>
        <li class="header-bartwo d-lg-none">
            <span class="bars"><i class="fas fa-bars"></i></span>
            <span class="cros"> <i class="fa-solid fa-xmark"></i></span>
        </li>
        <li>
            <RouterLink to="/casino" class="d-grid justify-content-center">
                <span><i class="fas fa-table-tennis"></i></span>
                <span class="texta">Casino</span>
            </RouterLink>
        </li>
        <li>
            <RouterLink to="/account/tickets" class="d-grid justify-content-center">
                <span><i class="fa fa-user"></i></span>
                <span class="texta">Kuponlar</span>
            </RouterLink>
        </li>
    </ul>
</template>