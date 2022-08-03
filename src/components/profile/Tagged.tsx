import Styles from "./tagged.module.scss";

export const Tagged = () => {
  return (
    <section className={Styles.tagged_section}>
          <h1>Photos of you</h1>
          <p>When people tag you in photos, they'll appear here.</p>
    </section>
  );
};
