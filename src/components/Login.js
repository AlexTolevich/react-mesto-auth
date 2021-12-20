import React from 'react';

function Login () {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

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
            <h2 className="login__title">Вход</h2>
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
                    onChange={handleChangeEmail}
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
                    onChange={handleChangePassword}
                    required
                />
                <span id="password-error" className="login__error"/>
                <button type="submit" className="login__button">Войти</button>
            </form>
        </section>
        </>
    )
}

export default Login;