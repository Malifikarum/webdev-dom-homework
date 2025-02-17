import { appElement, formElement, nameInputElement } from "../main.js";
import { login, registration, setToken } from "./api.js";
import { fetchGet } from "./fetchGet.js";
import { renderLogin } from "./loginPage.js";
import _ from 'lodash';

export const renderRegistration = ({ listElement, listElementData }) => {

    const registrationHtml = `
    <div class="add-form">
    <h3>Форма регистрации</h3>
    <input type="text" class="add-form-user-name" id="name-input-registration" placeholder="Введите имя">
    <input type="text" class="add-form-login" id="login-input-registration" placeholder="Введите логин">
    <input type="text" class="add-form-password" id="password-input-registration" placeholder="Введите пароль">
    <button class="add-form-button" id="button-registration">Зарегистрироваться</button>
    <a href="#" class="link link-login-page">Войти</a>
    </div>
    `;

    appElement.innerHTML = registrationHtml;

    const buttonElement = document.getElementById("button-registration");
    const regNameInputElement = document.getElementById("name-input-registration");
    const regLoginInputElement = document.getElementById("login-input-registration");
    const regPasswordInputElement = document.getElementById("password-input-registration");


    buttonElement.addEventListener("click", () => {
        registration({
            name: _.capitalize(regNameInputElement.value),
            login: regLoginInputElement.value,
            password: regPasswordInputElement.value,
        })
        .then((response) => {
            alert('Новый пользователь успешно зарегистрирован');
            return response;
        })
        .then((responseData) => {
            login({
                login: responseData.user.login,
                password: responseData.user.password,
            })
            setToken(responseData.user.token);
            nameInputElement.value = responseData.user.name;
        })
        .then(() => {
            fetchGet({ listElementData });
            appElement.style.display = "none";
            listElement.style.display = "flex";
            formElement.style.display = "flex";
        })
        .catch((error) => {
            if (error.message === 'Пользователь с таким логином уже сущетсвует') {
                alert('Пользователь с таким логином уже сущетсвует');
                nameInputElement.value = "";
            }
            else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
            }
            console.warn(error);
        });


        regNameInputElement.value = "";
        regLoginInputElement.value = "";
        regPasswordInputElement.value = "";
    })
    renderLogin({ listElement, listElementData });
};