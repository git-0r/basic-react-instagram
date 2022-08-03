import Styles from "./footer.module.scss";

export const Footer = () => {
    return (
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
    );
}