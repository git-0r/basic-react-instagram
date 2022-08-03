import Styles from "./saved.module.scss";

export const Saved = () => {
    return (
      <section className={Styles.saved_section}>
        <h1>Save</h1>
        <p>
          Save photos and videos that you want to see again. No one is notified,
          and only you can see what you've saved.
        </p>
      </section>
    );
}