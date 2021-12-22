import success from '../images/success.svg';
import error   from '../images/error.svg'

function InfoTooltip({isOpen, onClose, onCloseOverlayClick, isInfoTooltipStatus}) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`} onClick={onCloseOverlayClick}>
            <div className="popup__container popup__container_type_tooltip">
                <img src={isInfoTooltipStatus ? success : error} alt={isInfoTooltipStatus ? "иконка успешной регистрации" : "иконка ошибки"} className="popup__image"/>
                <h2 className="popup__title popup__title_type_auth">{isInfoTooltipStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
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