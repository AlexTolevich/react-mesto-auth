import React, {useState} from 'react';
import {Link}            from 'react-router-dom';

function Register () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!email || !password) {
            return;
        }
        // TO DO
    }

    return (
        <>
            <section className="login">
                <h2 className="login__title">Регистрация</h2>
                <form className="login__form">
                    <input
                        aria-label="Ваша почта"
                        type="Email"
                        name="email"
                        id="email"
                        className="login__input"
                        placeholder="Email"
                        minLength="2"
                        // value={name}
                        // onChange={handleChangeName}
                        required
                    />
                    <span id="email-error" className="login__error"/>
                    <input
                        aria-label="Пароль"
                        type="Password"
                        name="password"
                        id="password"
                        className="login__input"
                        placeholder="Пароль"
                        minLength="6"
                        maxLength="200"
                        // value={description}
                        // onChange={handleChangeDescription}
                        required
                    />
                    <span id="password-error" className="login__error"/>
                    <button type="submit" className="login__button">Зарегистрироваться</button>
                </form>
                <p className="login__text">Уже зарегистрированы? <a className="login__link" >Войти</a></p>
            </section>
        </>
    )
}

export default Register;