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
                                <RouterLink to="/account">
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
                                <RouterLink to="/account/history" class="active">
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
                            Hesap Özeti
                        </h3>
                        <div class="cainoform__wrap">
                            <div class="row g-4">
                                <div class="col-xl-6">
                                    <div class="casino__date">
                                        <h4 class="f__title">
                                            Başlangıç Tarihi
                                        </h4>
                                        <div class="calender-bar">
                                            <input type="date" class="datepicker" placeholder="2024-2-2">
                                            <i class="icon-calender"></i>
                                         </div>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="casino__date">
                                        <h4 class="f__title">
                                            Bitiş Tarihi
                                        </h4>
                                        <div class="calender-bar">
                                            <input type="date" class="datepicker" placeholder="2024-2-2">
                                            <i class="icon-calender"></i>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="casinoform__tabe">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Game</th>
                                        <th>Payment Methods</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Ratio</th>
                                        <th>More</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2PQ8B4KYMJ</td>
                                        <td>Bank / CC</td>
                                        <td>5,591 USD</td>
                                        <td class="cancel">Cancel</td>
                                        <td>8.55</td>
                                        <td class="bold">...</td>
                                    </tr>
                                    <tr>
                                        <td>4TQRW5WXF4</td>
                                        <td>Credit Card</td>
                                        <td>5,591 USD</td>
                                        <td class="pending">Prnding</td>
                                        <td>2.70</td>
                                        <td class="bold">...</td>
                                    </tr>
                                </tbody>
                            </table>
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