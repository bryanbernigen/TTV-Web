<script setup>
import axios from "axios";

const loginHandler = () => {
    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;
    axios
        .post("http://localhost:5000/api/admin/login", {
            email: email,
            password: password,
        })
        .then((response) => {
            if (response.status === 200) {
                const admin = response.data.admin;
                //Store token in local storage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("adminName", admin.name);
                localStorage.setItem("adminEmail", admin.email);
                localStorage.setItem("adminId", admin.id);
                //Redirect to Home
                window.location.href = "/";
            } else {
                alert(response.data.message);
            }
        })
        .catch((error) => {
            alert("Login failed, please try again");
        });
};
</script>

<template>
    <div class="container container--fluid">
        <div class="container__inners">
            <div class="registration registration__sign-in">
                <div class="registration__container">
                    <a class="registration__logo" href="/"
                        ><img
                            src="https://static.honestdocs.id/assets/form-logo-4280bcd446d4888d9132d90ef744bc7d54bd5a4d9ef032735b9f6b1cd51f86aa.svg"
                            loading="lazy"
                        />
                    </a>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1"
                                >Email address</label
                            >
                            <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                            />
                        </div>
                    </form>
                    <button class="btn btn-primary" @click="loginHandler()">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
