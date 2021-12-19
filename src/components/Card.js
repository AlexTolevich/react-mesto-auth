import React                from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card({link, name, counterLikes, card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

// Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_active'}`);

    function handleCardClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }


    return (
        <article className="element">
            <img src={link} alt={`Фото ${name}`} className="element__photo" onClick={handleCardClick}/>
            <div className="element__title-container">
                <h2 className="element__title">{name}</h2>
                <div className="element__like-container">
                    <button
                        aria-label="Отметить нравится"
                        type="button"
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                    />
                    <span className="element__likes-count">{counterLikes}</span>
                </div>
            </div>
            {isOwn && <button
                aria-label="Удалить карточку"
                type="button"
                className="element__remove"
                onClick={handleDeleteClick}
            />}
        </article>
    )
}

export default Card