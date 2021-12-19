function ImagePopup({card, onClose, onCloseOverlayClick}) {
    return (
        <div className={`popup popup_type_full-screen ${card ? 'popup_opened' : ''}`} onClick={onCloseOverlayClick}>
            <div className="popup__image-container">
                <img src={card ? card.link : ''} alt={card ? card.name : ''} className="popup__image"/>
                <p className="popup__image-caption">{card ? card.name : ''}</p>
                <button
                    aria-label="Закрыть окно просмотра фотографий"
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}
                />
            </div>
        </div>
    )
}

export default ImagePopup