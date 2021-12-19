import React                from 'react';
import Card                 from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main({onEditAvatar, onAddPlace, onEditProfile, onCardClick, cards, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <img
                        src={currentUser.avatar}
                        alt="аватар профиля"
                        className="profile__avatar"
                        onClick={onEditAvatar}
                    />
                    <div className="profile__info">
                        <div className="profile__name-container">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button
                                aria-label="Редактировать профиль"
                                type="button"
                                className="profile__edit-button"
                                onClick={onEditProfile}
                            />
                        </div>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    aria-label="Добавить карточку"
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlace}
                />
            </section>

            <section aria-label="Галерея фотографий" className="elements">
                {cards.map((card) => (
                        <Card
                            key={card._id}
                            link={card.link}
                            name={card.name}
                            counterLikes={card.likes.length}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    )
                )}
            </section>
        </main>
    )
}

export default Main