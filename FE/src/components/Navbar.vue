<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminId");
    console.log("Logout");
};

const name = localStorage.getItem('adminName');
const userDefined = name !== null;
const route = userDefined ? "/profile" : "/login";
</script>

<template>
    <header class="header js-header header--top header--not-bottom">
        <div class="header__container header__container--second">
            <div class="header__new">
                <RouterLink to="/" class="header__logotip">
                    <img
                        src="https://static.honestdocs.id/assets/footer-logo-cb214c17fc4ea968b8e0564f38bbb4cb7be3ee14d57e0e823a847a26337bd280.svg"
                        loading="lazy"
                    />
                </RouterLink>
                <div class="header__link-shop">
                    <RouterLink
                        class="header__health-shop js-ga-nav-bar"
                        :to="route"
                        ><img
                            class="header__link-img"
                            src="https://static.honestdocs.id/assets/shop/icon-hdmall-e21ae4916c92d2e41d52be4afa2f4f9df2ae481dbfb5b8c96e704fc7c2547cda.svg"
                            loading="lazy"
                        />
                        <span class="is-regular" v-if="userDefined==true">
                            {{ name }}
                        </span>
                        <span class="is-regular" v-else> Login </span>
                        <span class="is-hover" v-if="userDefined==true">
                            View Profile
                        </span>
                        <span class="is-hover" v-else> Login </span>
                    </RouterLink>
                </div>
            </div>
            <div class="header__row">
                <ul class="header__list header__list--second js-menu-links">
                    <li class="header__item">
                        <a
                            class="header__link js-ga-nav-bar header__link--second"
                            href="/penyakit"
                            >Home</a
                        >
                    </li>
                    <li class="header__item">
                        <RouterLink
                            class="header__link header__link--second js-ga-nav-bar"
                            to="/records"
                            >Records</RouterLink
                        >
                    </li>
                    <li class="header__item">
                        <a
                            class="header__link header__link--second js-ga-nav-bar"
                            href="/rumah-sakit"
                            >User</a
                        >
                    </li>
                </ul>
                <ul class="header__account-list" v-if="userDefined==true">
                    <li class="header__account-item">
                        <a
                            class="header__account-link header__link"
                            href="/login"
                            @click="logoutHandler()"
                            >Logout</a
                        >
                    </li>
                </ul>
            </div>
            <div class="header__layer header__layer--other"></div>
        </div>

        <div class="progress-bar-top"></div>
    </header>
</template>
