import { initializeApp } from 'firebase/app';
// import { translations } from '../translation/langs';
// import { getLangFromStorage } from '../translation/translate';
import Notiflix from 'notiflix';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBgWT3X_OQeVji4QMqoYhE3xZ9-_rIXVb4',
  authDomain: 'filmoteka-geek.firebaseapp.com',
  projectId: 'filmoteka-geek',
  storageBucket: 'filmoteka-geek.appspot.com',
  messagingSenderId: '189885109540',
  appId: '1:189885109540:web:0ce48954a2686df48c4fb1',
};

// let lang = getLangFromStorage();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// auth.languageCode = lang;

const authBtn = document.querySelector('[data-modal-google-auth]');
const logOutBtn = document.querySelector('[data-logout]');
const loginBtn = document.querySelector('[data-modal-login]');
const singUpBtn = document.querySelector('[data-modal-signup]');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

window.addEventListener('load', onLoadCheckStat);

function onLoadCheckStat() {
  // const libraryItem = document.querySelector('[data-library-item]');
  // console.log(libraryItem);
  const logOutItem = document.querySelector('[data-logout-item');
  const logInItem = document.querySelector('[data-login-item');

  if (localStorage.getItem('actions')) {
    logInItem.classList.add('visually-hidden');
    // libraryItem.classList.remove('visually-hidden');
    logOutItem.classList.remove('visually-hidden');
    logOutBtn.addEventListener('click', googleAuthHandler);
    logOutBtn.addEventListener('click', logout);
  } else {
    // libraryItem.classList.add('visually-hidden');
    logOutItem.classList.add('visually-hidden');
    authBtn.addEventListener('click', googleAuthHandler);
    singUpBtn.addEventListener('click', createAccount);
    loginBtn.addEventListener('click', loginEmailPasword);
    logInItem.classList.remove('visually-hidden');
  }
}

async function googleAuthHandler(e) {
  if (localStorage.getItem('actions') === 'logged-in') {
    logout();
  } else {
    document.querySelector('[data-loginmodal]').classList.add('is-hidden');

    try {
      await signInWithPopup(auth, provider).then(res => {
        Notiflix.Notify.success(`Welcome to your library`);
        localStorage.setItem('actions', 'logged-in');
        window.location.href = './library.html';
      });
    } catch (error) {
      return;
    }
  }
}

async function createAccount(e) {
  e.preventDefault();
  const loginEmail = emailInput.value;
  const loginPassword = passwordInput.value;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    Notiflix.Notify.info(`Account created successfully`);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Notiflix.Notify.info(`user already in use`);
    }
    if (error.code === 'auth/invalid-email') {
      Notiflix.Notify.info(`Invalid data recieved`);
    }
  }
}

async function loginEmailPasword(e) {
  e.preventDefault();
  const loginEmail = emailInput.value;
  const loginPassword = passwordInput.value;
  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
      res => {
        document.querySelector('[data-loginmodal]').classList.add('is-hidden');
        localStorage.setItem('actions', 'logged-in');
        window.location.href = './library.html';
      }
    );
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      Notiflix.Notify.info(`Invalid data received`);
    }
    if (error.code === 'auth/user-not-found') {
      Notiflix.Notify.info(`sorry, user not found`);
    }
    return;
  }
}

async function logout() {
  await signOut(auth);
  Notiflix.Notify.info(`You signed out`);
  localStorage.removeItem('actions');
  window.location.href = './index.html';
}
