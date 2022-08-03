import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { LoginForm } from "../components/login/login-form";
import Styles from "./login.module.scss";

export const Login = () => {
  useEffect(() => {
    document.title = "Login . Instagram";
    return () => {
      document.title = "Instagram";
    };
  });
  return (
    <>
      <div className={Styles.container}>
        <main className={Styles.form_wrapper}>
          <img
            src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
            alt="logo"
            className={Styles.insta_logo}
          />
          <LoginForm />
          <div className={Styles.separator}>
            <span className={Styles.separator_text}>OR</span>
          </div>
          <Button variant="primary" className={Styles.fb_login_btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M15.402 21v-6.966h2.333l.349-2.708h-2.682V9.598c0-.784.218-1.319 1.342-1.319h1.434V5.857a19.19 19.19 0 0 0-2.09-.107c-2.067 0-3.482 1.262-3.482 3.58v1.996h-2.338v2.708h2.338V21H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4.598z"
                fill="rgba(66,103,178,1)"
              />
            </svg>
            <span>Log in with Facebook</span>
          </Button>
          <Link to="/accounts/password/reset" className={Styles.forgot_password}>Forgotten your password?</Link>
        </main>
        <section className={Styles.signup_link_wrapper}>
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </section>
        <p className={Styles.get_app}>Get the app.</p>
        <div className={Styles.app_link}>
          <img
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
            alt="app store"
          />
          <img
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
            alt="play store"
          />
        </div>
      </div>
      <Footer/>
    </>
  );
};
