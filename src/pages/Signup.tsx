import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SignupForm } from "../components/signup/signup-form";
import Styles from "./signup.module.scss";

export const Signup = () => {
  useEffect(() => {
    document.title = "Login . Instagram"
    return () => {
      document.title = "Instagram"
    }
  })
  return (
    <>
      <div className={Styles.container}>
        <main className={Styles.form_wrapper}>
          <img
            src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
            alt="logo"
            className={Styles.insta_logo}
          />
          <p className={Styles.signup_header_text}>
            Sign up to see photos and videos from your friends.
          </p>
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
                fill="rgba(255,255,255,1)"
              />
            </svg>
            <p>Log in with Facebook</p>
          </Button>
          <div className={Styles.separator}>
            <span className={Styles.separator_text}>OR</span>
          </div>
          <SignupForm />
        </main>
        <section className={Styles.login_link_wrapper}>
          <p>
            Have an account? <Link to="/login">Log in</Link>
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
      <footer>
        <div className={Styles.footer_links}>
          <div>
            {" "}
            <a href="https://about.facebook.com/meta">Meta</a>
          </div>
          <div>
            {" "}
            <a href="https://about.instagram.com/">About</a>
          </div>
          <div>
            {" "}
            <a href="https://about.instagram.com/blog/">Blog</a>
          </div>
          <div>
            {" "}
            <a href="https://www.instagram.com/about/jobs/">Jobs</a>
          </div>
          <div>
            {" "}
            <a href="https://help.instagram.com/">Help</a>
          </div>
          <div>
            {" "}
            <a href="https://developers.facebook.com/docs/instagram">API</a>
          </div>
          <div>
            {" "}
            <a href="https://www.instagram.com/legal/privacy/">Privacy</a>
          </div>
          <div>
            {" "}
            <a href="https://www.instagram.com/legal/terms/">Terms</a>
          </div>
          <div>
            {" "}
            <a href="https://www.instagram.com/directory/profiles/">
              Top accounts
            </a>
          </div>
          <div>
            {" "}
            <a href="https://www.instagram.com/directory/hashtags/">Hashtags</a>
          </div>
          <div>
            {" "}
            <a href="https://www.instagram.com/explore/locations/">Locations</a>
          </div>
          <div>
            {" "}
            <a href="https://www.instagram.com/web/lite/">Instagram Lite</a>
          </div>
          <div>
            {" "}
            <a href="https://www.facebook.com/help/instagram/261704639352628">
              Contact uploading and non-users
            </a>
          </div>
        </div>
        <div className={Styles.footer_copyright}>
          <select>
            <option>English (UK)</option>
          </select>
          <p>© 2022 Instagram from Meta</p>
        </div>
      </footer>
    </>
  );
};
