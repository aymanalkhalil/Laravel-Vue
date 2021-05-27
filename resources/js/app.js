/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");
window.Vue = require("vue");

import Form from "vform";
import router from "./router";
import { Button, HasError, AlertError } from "vform/src/components/bootstrap5";

import VueProgressBar from "vue-progressbar";

const options = {
    color: "#bffaf3",
    failedColor: "#874b4b",
    thickness: "5px",
    transition: {
        speed: "0.2s",
        opacity: "0.6s",
        termination: 300
    },
    autoRevert: true,
    location: "left",
    inverse: false
};

Vue.use(VueProgressBar, options);

import swal from "sweetalert2";
window.swal = swal;

// const toast = swal.mixin({
//     toast: true,
//     position: "top-end",
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true,
//     didOpen: toast => {
//         toast.addEventListener("mouseenter", swal.stopTimer);
//         toast.addEventListener("mouseleave", swal.resumeTimer);
//     }
// });
// window.toast = toast;

import toastr from "toastr";
window.toast = toastr;

window.Form = Form;
let Fire = new Vue();
window.Fire = Fire;

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// const router = new VueRouter({
//     mode: "history",
//     routes // short for `routes: routes`
// });

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component(
    "passport-clients",
    require("./components/passport/Clients.vue").default
);

Vue.component(
    "passport-authorized-clients",
    require("./components/passport/AuthorizedClients.vue").default
);

Vue.component(
    "passport-personal-access-tokens",
    require("./components/passport/PersonalAccessTokens.vue").default
);
const app = new Vue({
    el: "#app",
    router
});