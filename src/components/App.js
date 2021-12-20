import React                from 'react';
import Header               from './Header.js';
import Main                 from './Main.js';
import Footer               from './Footer.js';
import PopupWithForm        from './PopupWithForm.js';
import ImagePopup           from './ImagePopup.js';
import {api}                from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import EditProfilePopup     from './EditProfilePopup.js';
import EditAvatarPopup      from './EditAvatarPopup.js';
import AddPlacePopup        from './AddPlacePopup.js';
import Login                from './Login.js';
import Register             from './Register.js';


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api
            .updateCardLike(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(`Ошибка изменения данных лайка: ${err}`);
            });
    }

    function handleCardDelete(delCard) {
        api
            .deleteCard(delCard._id)
            .then(() => setCards(cards.filter(currentCard => currentCard._id !== delCard._id)))
            .catch((err) => {
                console.log(`Ошибка удаления карточки: ${err}`);
            });
    }

    React.useEffect(() => {
        api
            .getAppInfo()
            .then(([userInfoRes, cardListRes]) => {
                setCurrentUser(userInfoRes);
                setCards(cardListRes);
            })
            .catch((err) => {
                console.log(`Ошибка загрузки данных: ${err}`);
            });

        function handleEscClose(event) {
            if (event.key === 'Escape') {
                closeAllPopups()
            }
        }
        document.addEventListener('keyup', handleEscClose)
        return () =>
            document.removeEventListener('keyup', handleEscClose)
    }, [])

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleUpdateUser(data) {
        api
            .setUserInfo(data)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка обновления данных профиля: ${err}`);
            })
    }

    function handleUpdateAvatar(data) {
        api
            .setAvatar(data)
            .then((userInfoRes) => {
                setCurrentUser(userInfoRes);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка обновления аватара: ${err}`);
            })
    }

    function handleAddPlaceSubmit(data) {
        api
            .postNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка добавления карточки: ${err}`);
            })
    }

    function closeOverlayClick(event) {
        if (event.target.classList.contains('popup_opened')) {
            closeAllPopups()
        }
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <Header/>
                <Login/>
                <Register/>
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                />

                <Footer/>

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    onCloseOverlayClick={closeOverlayClick}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    onCloseOverlayClick={closeOverlayClick}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    onCloseOverlayClick={closeOverlayClick}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    onCloseOverlayClick={closeOverlayClick}
                />

                <PopupWithForm
                    name="confirmation"
                    title="Вы уверены?"
                    isOpen={false}
                    onClose={closeAllPopups}
                    onCloseOverlayClick={closeOverlayClick}
                    buttonTitle="Да"
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
