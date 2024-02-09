<template>
       
       <section class="dashboard__body mt__30 pb-60"> 
        <div class="container">
            <div class="row g-4">
                <div class="col-xxl-3 col-xl-3 col-lg-4">
                    <div class="dashboard__side__bar">
                        <ul class="account__menu">
                            <li>
                                <RouterLink to="/account/tickets">
                                    <span class="icons">
                                        <i class="icon-details"></i>
                                    </span>
                                    <span>
                                        Kuponlarım
                                    </span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/account" class="active">
                                    <span class="icons">
                                        <i class="icon-details"></i>
                                    </span>
                                    <span>
                                       Kişisel Bilgilerim
                                    </span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/account/password">
                                    <span class="icons">
                                        <i class="icon-details"></i>
                                    </span>
                                    <span>
                                       Şifremi Değiştir
                                    </span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/account/history">
                                    <span class="icons">
                                        <i class="icon-details"></i>
                                    </span>
                                    <span>
                                        Hesap Özeti
                                    </span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/account/language">
                                    <span class="icons">
                                        <i class="icon-details"></i>
                                    </span>
                                    <span>
                                       Dil Ayarları
                                    </span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/sign-out">
                                    <span class="icons">
                                        <i class="fas fa-sign-out-alt text-white"></i>
                                    </span>
                                    <span>
                                       Çıkış
                                    </span>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xxl-9 col-xl-9 col-lg-8">
                    <div class="dashboard__body__wrap">
                        <h3 class="account__head mb__30">
                            Kişisel Bilgilerim
                        </h3>
                        <div class="identity__details bgbox">
                            <div class="identity__left mb-5">
                                <form action="#">
                                    <div class="row g-2 mb-3">
                                        <div class="col-lg-6">
                                            <div class="form__box">
                                                <label for="name">Ad Soyad</label>
                                                <input type="text" v-bind:value="userInfo.personal.name" class="form-control" disabled="true">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form__box">
                                                <label for="name">Kullanıcı Adı</label>
                                                <input type="text" v-bind:value="userInfo.personal.nickname" class="form-control" disabled="true">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form__box">
                                                <label for="name2">E-Posta</label>
                                                <input type="text" v-bind:value="userInfo.personal.email" class="form-control" disabled="true">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="save__btn mt-3 d-flex">
                                <a href="javascript:;" class="cmn--btn text-dark">
                                    <span>Kaydet</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            userInfo: Object
        },
    }
</script>