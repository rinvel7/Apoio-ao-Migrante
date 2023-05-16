import FirebaseCtrl from "./scripts/firebaseCtrl";
import UiCtrl from "./scripts/uiCtrl";
import "./SCSS/index.scss";
import './bootstrap/css/bootstrap.min.css';
import "./SCSS/index.scss";

import "./bootstrap/css/bootstrap.min.css" 
import "./font-awesome/css/font-awesome.min.css" 
import "./css/owl.carousel.css" 
import "./css/owl.theme.css" 
import "./css/owl.transitions.css" 
import "./css/animate.css"
import "./css/lightbox.css"
import "./css/style.css"
import "./css/responsive.css"
import "./comunity.html"



import './bootstrap/css/bootstrap-theme.min.css';
import './bootstrap/css/bootstrap.css';
// import './bootstrap/css/bootstrap.css.map';/
import './bootstrap/js/bootstrap.js';
import './bootstrap/js/bootstrap.min';
const firebaseCtrl = new FirebaseCtrl();
const uiCtrl = new UiCtrl();

window.addEventListener("load", () => {
  firebaseCtrl.initApp();
  uiCtrl.init();
  firebaseCtrl.on("userloginstarted", () => {
    uiCtrl.showSpinner();
  });
  firebaseCtrl.on("userloginended", () => {
    uiCtrl.removeSpinner();
  });
  firebaseCtrl.on("userauthchanged", async (user) => {
    if (user) {
      uiCtrl.removeLogin();
      uiCtrl.updateUserImage(user.photoURL || "static/imgs/space-invaders.svg");
      uiCtrl.showSpinner();
      const novel = await firebaseCtrl.getNovel();
      uiCtrl.updateNovel(novel);
      uiCtrl.removeSpinner();
      return;
    }
    uiCtrl.showLogin();
  });
  uiCtrl.on("anonymousLogInBtn", "click", () => {
    firebaseCtrl.logIn(true);
  });
  uiCtrl.on("googleLogInBtn", "click", () => {
    firebaseCtrl.logIn();
  });
  uiCtrl.on("logOutBtn", "click", () => {
    firebaseCtrl.logOut();
  });
  uiCtrl.on("newNovelPartForm", "submit", async (e) => {
    e.preventDefault();
    const textArea = e.target.querySelector("textarea");
    const newParagraph = textArea.value.trim();
    if (!newParagraph) {
      return;
    }
    uiCtrl.showSpinner();
    const response = await firebaseCtrl.addPartToNovel(newParagraph);
    const novel = await firebaseCtrl.getNovel();
    uiCtrl.updateNovel(novel);
    textArea.value = "";
    uiCtrl.removeSpinner();
  });
  uiCtrl.onClickNovelPartDeleteBtn(async (idPart) => {
    uiCtrl.showSpinner();
    await firebaseCtrl.removeNovelPart(idPart);
    const novel = await firebaseCtrl.getNovel();
    uiCtrl.updateNovel(novel);
    uiCtrl.removeSpinner();
  });
});