import PopupWithForm        from './PopupWithForm.js';
import React                from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser, onCloseOverlayClick}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser({
            name,
            description,
        });
    }

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        if (isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            buttonTitle="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onCloseOverlayClick={onCloseOverlayClick}
        >
            <input
                aria-label="Ваше имя"
                type="text"
                name="popup_name"
                id="popup_name"
                className="popup__input popup__input_is_name"
                placeholder="Введите Ваше имя"
                minLength="2"
                maxLength="40"
                value={name}
                onChange={handleChangeName}
                required
            />
            <span id="popup-name-error" className="popup__error"/>
            <input
                aria-label="Род деятельности"
                type="text"
                name="popup_job"
                id="popup_job"
                className="popup__input popup__input_is_job"
                placeholder="Введите Ваш род деятельности"
                minLength="2"
                maxLength="200"
                value={description}
                onChange={handleChangeDescription}
                required
            />
            <span id="popup-job-error" className="popup__error"/>
        </PopupWithForm>
    )
}

export default EditProfilePopup