<template>
    <header class="header-section dashboard__header">
        <div class="container p-0">
            <div class="header-wrapper">
                <div class="menu__left__wrap">
                    <div class="logo-menu px-2">
                        <RouterLink to="/" class="logo">
                            <img src="/img/logo/logo.png" alt="logo">
                        </RouterLink>
                    </div>
                    <ul class="main-menu">
                        <li v-if="sessionToken">
                            <RouterLink to="/" class="active">
                                <span>Anasayfa</span>
                            </RouterLink>
                        </li>
                        <li v-if="sessionToken">
                            <RouterLink to="/casino">
                                <span>Casino</span>
                            </RouterLink>
                        </li>
                        <li v-if="sessionToken">
                            <RouterLink to="/live-casino">
                                <span>Canlı Casino</span>
                            </RouterLink>
                        </li>
                        <li class="cmn-grp">
                            <span class="cmn--btn text-dark">
                                <span class="rela">Deposit</span>
                            </span>
                        </li>
                    </ul>
                </div>

                <div class="dashboar__wrap">
                    <div class="items d__text" v-if="sessionToken">
                        <span class="small">Bakiye</span>
                        <h6>{{ userInfo?.finance?.balance != null ? userInfo?.finance?.balance : 0 }} {{ userInfo?.finance?.currency }}</h6>
                    </div>
                    <div class="items d__cmn" v-if="sessionToken">
                        <RouterLink to="/account/tickets" class="cmn--btn text-dark">
                            <span class="d-inline-block">Kuponlar</span>
                        </RouterLink>
                    </div>
                    <div class="items dashboar__social" v-if="sessionToken">
                        <div class="d-lg-none" style="margin-right: 8px">
                            <span class="text-white">
                                <b>{{ userInfo?.finance?.balance != null ? userInfo?.finance?.balance : 0 }}</b> {{ userInfo?.finance?.currency }}
                            </span>
                        </div>
                        <div class="custom-dropdown">
                            <div class="custom-dropdown__user" data-set="custom-dropdown">
                                <a href="javascript:;" class="icons">
                                    <i class="fa fa-user text-dark"></i>
                                </a>
                            </div>
                            <div class="custom-dropdown__content">
                                <div class="custom-dropdown__body">
                                    <ul class="custom-dropdown__list">
                                        <li>
                                            <RouterLink to="/account" class="custom-dropdown__body-link">
                                                <span class="custom-dropdown__body-icon">
                                                    <i class="fas fa-layer-group"></i>
                                                </span>
                                                <span class="custom-dropdown__body-text">
                                                    Hesabım
                                                </span>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/account/tickets" class="custom-dropdown__body-link">
                                                <span class="custom-dropdown__body-icon">
                                                    <i class="fa fa-ticket"></i>
                                                </span>
                                                <span class="custom-dropdown__body-text">
                                                    Kuponlarım
                                                </span>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/account/password" class="custom-dropdown__body-link">
                                                <span class="custom-dropdown__body-icon">
                                                    <i class="fa fa-lock"></i>
                                                </span>
                                                <span class="custom-dropdown__body-text">
                                                    Şifremi Değiştir
                                                </span>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/account/history" class="custom-dropdown__body-link">
                                                <span class="custom-dropdown__body-icon">
                                                    <i class="fa fa-list"></i>
                                                </span>
                                                <span class="custom-dropdown__body-text">
                                                    Hesap Özeti
                                                </span>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/sign-out" class="custom-dropdown__body-link">
                                                <span class="custom-dropdown__body-icon">
                                                    <i class="fas fa-sign-out-alt"></i>
                                                </span>
                                                <span class="custom-dropdown__body-text">
                                                    Çıkış
                                                </span>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="lang d-flex align-items-center px-2">
                        <div class="header-bar d-lg-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { SESSION } from '../helpers/V_APP.js'
import Language from '../helpers/Language.js'

export default {
    data() {
        return {
            lang: Language(),
            sessionToken: null,
        }
    },
    props: {
        userInfo: Object
    },
    created() {
        this.sessionToken = SESSION.sessionController('token');
        // console.log('----');
        // alert(userInfo);
        // this.balance = userInfo.finance.balance
    },

}
</script>