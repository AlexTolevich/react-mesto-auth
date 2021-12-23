import React                                  from 'react';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Header                                 from './Header.js';
import Main                                   from './Main.js';
import Footer                                 from './Footer.js';
import PopupWithForm                          from './PopupWithForm.js';
import ImagePopup                             from './ImagePopup.js';
import {api}                                  from '../utils/api.js';
import {CurrentUserContext}                   from '../contexts/CurrentUserContext.js';
import EditProfilePopup                       from './EditProfilePopup.js';
import EditAvatarPopup                        from './EditAvatarPopup.js';
import AddPlacePopup                          from './AddPlacePopup.js';
import Login                                  from './Login.js';
import Register                               from './Register.js';
import InfoTooltip                            from './InfoTooltip.js';
import ProtectedRoute                         from './ProtectedRoute.js';
import * as auth                              from '../utils/auth.js';


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
    const [isInfoTooltipStatus, setIsInfoTooltipStatus] = React.useState(true);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const navigate = useNavigate();

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            // проверяем токен пользователя
            auth
                .checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setEmail(res.data.email);
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка проверки токена: ${err}`);
                    setLoggedIn(false);
                });
        }
    }, []);

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

        document.addEventListener('keyup', handleEscClose);
        return () =>
            document.removeEventListener('keyup', handleEscClose);
    }, []);

    function onLogin(email, password) {
        auth
            .signin(email, password)
            .then(res => {
                if (res.token) {
                    // Устанавливаем в стейты email и признак того, что пользователь залогинен
                    localStorage.setItem('jwt', res.token);
                    setLoggedIn(true);
                    setEmail(email);
                    navigate('/');
                }
            })
            .catch((err) => {
                setIsInfoTooltipStatus(false);
                handleInfoTooltip();
                console.log(`Ошибка входа: ${err}`);
            });
    }

    function onRegister(email, password) {
        auth
            .signup(email, password)
            .then(res => {
                if (res.data._id) {
                    setIsInfoTooltipStatus(true);

                    navigate('/sign-in');
                } else {
                    setIsInfoTooltipStatus(false);
                }
            })
            .catch((err) => {
                setIsInfoTooltipStatus(false);
                console.log(`Ошибка регистрации: ${err}`);
            })
            .finally(() => handleInfoTooltip()
            );
    }

    function onSignOut() {
        setLoggedIn(false);
        setEmail('');
        navigate('/sign-in');
        localStorage.removeItem('jwt');
    }

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

    function handleInfoTooltip() {
        setIsInfoTooltipOpened(true);
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
            closeAllPopups();
        }
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsInfoTooltipOpened(false)
        setSelectedCard(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <Routes>
                    <Route path="/"
                           element={
                               <>
                                   <Header email={email} title="Выйти" to="/sign-in" onClick={onSignOut}/>
                                   <ProtectedRoute
                                       component={Main}
                                       loggedIn={loggedIn}
                                       onEditAvatar={handleEditAvatarClick}
                                       onEditProfile={handleEditProfileClick}
                                       onAddPlace={handleAddPlaceClick}
                                       onCardClick={handleCardClick}
                                       onCardLike={handleCardLike}
                                       onCardDelete={handleCardDelete}
                                       cards={cards}
                                   />
                               </>}
                    />

                    <Route path={loggedIn ? '' : '/sign-in'}
                           element={
                               <>
                                   <Header title="Регистрация" to="/sign-up"/>
                                   <Login
                                       onLogin={onLogin}
                                   />
                               </>
                           }
                    />

                    <Route path={loggedIn ? '' : '/sign-up'}
                           element={
                               <>
                                   <Header title="Войти" to="/sign-in"/>
                                   <Register
                                       onRegister={onRegister}
                                   />
                               </>
                           }
                    />

                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>

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

                {/*Пока не работает, как сдам ПР 12 доделать функционал!!!
                По рекомендации ревью "Для попапа подтверждения можно было
                создать свой компонент ConfirmationPopup"*/}
                <PopupWithForm
                    name="confirmation"
                    title="Вы уверены?"
                    isOpen={false}
                    onClose={closeAllPopups}
                    onCloseOverlayClick={closeOverlayClick}
                    buttonTitle="Да"
                />

                <InfoTooltip
                    isInfoTooltipStatus={isInfoTooltipStatus}
                    isOpen={isInfoTooltipOpened}
                    onClose={closeAllPopups}
                    onCloseOverlayClick={closeOverlayClick}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
