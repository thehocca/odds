<script setup>
    import Loader from '@/components/Loader.vue' 
</script>

<template>
    <section class="dashboard__body mt-5 mb-5">
        <div class="container">
            <div class="register__modal">
                <div class="modal-content-custom">
                    <div class="modal-body-custom">
                        <div class="row align-items-center g-4">
                            <div class="col-lg-6">
                                <div class="modal__left">
                                    <img src="/img/modal/modal.png" alt="modal">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="modal__right">
                                    <div class="tab-content" id="myTabContent2">
                                        <div class="tab-pane fade show active" id="home2" role="tabpanel">
                                            <div class="form__tabs__wrap">
                                                <form action="#0">
                                                    <div class="form__grp">
                                                        <label for="emailsign">Email</label>
                                                        <input type="email" v-model="email" id="emailsign"
                                                            placeholder="Email Your">
                                                    </div>
                                                    <div class="form__grp">
                                                        <label for="toggle-password3">Password</label>
                                                        <input id="toggle-password3" v-model="password" type="password"
                                                            placeholder="Your Password">
                                                        <span id="#toggle-password3"
                                                            class="fa fa-fw fa-eye field-icon toggle-password3"></span>
                                                    </div>
                                                    <div class="login__signup">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" id="remem">
                                                            <label class="form-check-label" for="remem">
                                                                Remember me
                                                            </label>
                                                        </div>
                                                        <a href="#0">
                                                            Forgot Password
                                                        </a>
                                                    </div>
                                                    <div class="create__btn">
                                                        <a href="javascript:;" @click="submit()" class="cmn--btn text-dark">
                                                            <span>Sign In</span>
                                                        </a>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Loader v-if="loader" :text="loaderText" />
    </section>
</template>

<script>

import { VAPP, USER, _V, FUNC, SESSION } from '../helpers/V_APP.js'
import Language from '../helpers/Language.js'
export default {
    data() {
        return {
            email: 'player',
            password: '123123',
            error: false,
            lang: Language(),
            sessionToken: null,
            loader: false,
            loaderText: 'Oturum Açılıyor',
        };
    },
    async created() {

        // GİRİŞ BAŞARILI DEĞİL İSE
        if (this.$route.query.error == 'invalid')
            this.error = true;

        // OTURUM AÇIK İSE
        if (SESSION.sessionController('token'))
            this.$router.push('/')

        this.sessionToken = SESSION.sessionController('token');

        await _V.getLang();
        // console.log(this.sessionToken);
    },
    methods: {
        submit() {
            // LOADER AÇ
            this.loader = true;

            USER.LOGIN(this.email, this.password);
        }
    },
}

</script>  