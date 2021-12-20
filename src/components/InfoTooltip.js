function InfoTooltip({name, title, isOpen, onClose, onCloseOverlayClick, image}) {
    return(
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onCloseOverlayClick}>
            <div className="popup__container">
                <img src={image} alt={title} className="popup__image"/>
                <h2 className="popup__title popup__title_type_auth">{title}</h2>
                <button
                    aria-label="Закрыть окно"
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}
                />
            </div>
        </div>
    )
}

export default InfoTooltip;