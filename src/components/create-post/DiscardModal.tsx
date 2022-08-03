import { createPortal } from "react-dom";
import Styles from "./discardModal.module.scss";

type myProps = {
  toggleModal: (state: boolean) => void;
  resetFile: (state: {
    type: string;
    url: string;
    isSubmitting: boolean;
  }) => void;
  resetStep: (state: string) => void;
};

export const DiscardModal = (props: myProps) => {
  const discardPost = () => {
    props.resetFile({ type: "", url: "", isSubmitting: false });
    props.resetStep("new");
    props.toggleModal(false);
  };

  return createPortal(
    <main className={Styles.modal_wrapper}>
      <div className={Styles.modal}>
        <p className={Styles.discard_heading}>Discard post?</p>
        <p className={Styles.warning_text}>
          If you leave, your edits won't be saved.
        </p>
        <p className={Styles.discard_btn} onClick={discardPost}>
          Discard
        </p>
        <p
          className={Styles.cancel_btn}
          onClick={() => props.toggleModal(false)}
        >
          Cancel
        </p>
      </div>
    </main>,
    document.getElementById("root") as HTMLElement
  );
};
