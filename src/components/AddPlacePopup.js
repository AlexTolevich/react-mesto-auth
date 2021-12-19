import PopupWithForm from './PopupWithForm.js';
import React         from 'react';

function AddPlacePopup({isOpen, onClose, onAddPlace, onCloseOverlayClick}) {
    const [nameCard, setNameCard] = React.useState('')
    const [linkCard, setLinkCard] = React.useState('')

    function handleChangeCardName(event) {
        setNameCard(event.target.value);
    }

    function handleChangeCardLink(event) {
        setLinkCard(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onAddPlace({
            name: nameCard,
            link: linkCard,
        });
    }


    React.useEffect(() => {
        setNameCard('');
        setLinkCard('');
    }, [isOpen]);

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            buttonTitle="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onCloseOverlayClick={onCloseOverlayClick}
        >
            <input
                aria-label="Название фото"
                type="text"
                name="name"
                id="place-name"
                className="popup__input popup__input_is_place-name"
                required
                placeholder="Название"
                minLength="2"
                maxLength="30"
                onChange={handleChangeCardName}
                value={nameCard}
            />
            <span id="place-name-error" className="popup__error"/>
            <input
                aria-label="Ссылка на картинку"
                type="url"
                name="link"
                id="place-img-link"
                className="popup__input popup__input_is_img-link"
                required
                placeholder="Ссылка на картинку"
                onChange={handleChangeCardLink}
                value={linkCard}
            />
            <span id="place-img-link-error" className="popup__error"/>
        </PopupWithForm>

    )
}

export default AddPlacePopup