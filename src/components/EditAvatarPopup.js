import PopupWithForm from './PopupWithForm.js';
import React         from 'react';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, onCloseOverlayClick}) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({avatar: avatarRef.current.value});
    }

    React.useEffect(() => {
            avatarRef.current.value = ''
        }, [isOpen]
    )

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonTitle="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onCloseOverlayClick={onCloseOverlayClick}
        >
            <input
                aria-label="Ссылка на аватар"
                type="url"
                name="avatar"
                id="avatar-img-link"
                className="popup__input popup__input_type_avatar-link"
                required
                placeholder="Ссылка на аватар"
                ref={avatarRef}
            />
            <span id="avatar-img-link-error" className="popup__error"/>
        </PopupWithForm>
    )
}

export default EditAvatarPopup