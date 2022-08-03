import { SyntheticEvent, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { appState } from "../../routes/LoggedInRoutes";
import Styles from "./createPost.module.scss";
import { DiscardModal } from "./DiscardModal";
import { v4 as uuidv4 } from "uuid";
import { createPost } from "../../redux/postSlice";

type appProps = {
  toggleModal?: (cb: (state: boolean) => boolean) => void;
};

export const CreatePost = (props: appProps) => {
  const [file, setFile] = useState({ type: "", url: "", isSubmitting: false });
  const [step, setStep] = useState("new");
  const [discardModal, setDiscardModal] = useState(false);
  const [caption, setCaption] = useState("");
  const user = useSelector((state: appState) => state?.auth.user);
  const dispatch = useDispatch();

  const handleInput = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target?.files![0];
    const fileType = file.type.split("/")[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
      setFile({
        type: fileType,
        url: reader.result as string,
        isSubmitting: false,
      });
      setStep("crop");
    });
  };

  const handleCaptionChange = (e: SyntheticEvent) => {
    const target = e?.target as HTMLInputElement;
    setCaption(target?.value);
  };

  const changeModalState = () => {
    step === "crop" && setStep("share");
    if (step === "share") {
      setStep("new");
      setFile((state) => ({ ...state, isSubmitting: true }));

      const newPost = {
        id: uuidv4(),
        created_at: new Date().getTime(),
        nickname: user?.nickname,
        fileURL: file?.url,
        fileType: file?.type,
        caption: caption,
        like_count: "0",
        comment_count: "0",
      };

      dispatch(createPost(newPost));
    }
  };

  return createPortal(
    <main className={Styles.portal_wrapper}>
      <section className={Styles.image_picker_wrapper}>
        {file.isSubmitting && (
          <img
            src="https://static.cdninstagram.com/rsrc.php/v3/yi/r/CdbYOrbXeWA.gif"
            className={Styles.loading_after_submit}
            alt="loading"
          />
        )}
        <div className={Styles.heading_wrapper}>
          <div
            onClick={() => setDiscardModal(true)}
            className={Styles.prev_btn}
          >
            {step !== "new" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" />
              </svg>
            )}
          </div>
          <p className={Styles.heading}>
            {step === "crop" ? "Crop" : "Create new post"}
          </p>
          <p className={Styles.next_btn} onClick={changeModalState}>
            {step === "crop" ? "Next" : step === "new" ? "" : "Share"}
          </p>
        </div>
        {!file.url ? (
          <div className={Styles.content_wrapper}>
            <svg
              aria-label="Icon to represent media such as images or videos"
              color="#262626"
              fill="#262626"
              height="77"
              role="img"
              viewBox="0 0 97.6 77.3"
              width="96"
            >
              <path
                d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                fill="currentColor"
              ></path>
              <path
                d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                fill="currentColor"
              ></path>
              <path
                d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                fill="currentColor"
              ></path>
            </svg>
            <p>Drag photos and videos here</p>
            <label className="btn btn-primary" htmlFor="file_input">
              Select From Computer
            </label>
            <input
              onChange={handleInput}
              accept="image/*, video/*"
              type="file"
              id="file_input"
            />
          </div>
        ) : (
          <div className={Styles.file_preview_wrapper}>
            {file.type === "image" ? (
              <img
                className={Styles.file_preview}
                src={file.url}
                alt="upload"
              />
            ) : (
              <video
                className={Styles.file_preview}
                src={file.url}
                autoPlay
              ></video>
            )}
            {step === "share" && (
              <section className={Styles.caption_section}>
                <div className={Styles.userInfo}>
                  <img
                    src={user.picture}
                    className={Styles.picture}
                    alt="avatar"
                  />
                  <p className={Styles.nickname}>{user.nickname}</p>
                </div>
                <textarea
                  placeholder="Write a caption..."
                  onChange={handleCaptionChange}
                  value={caption}
                />
                <div className={Styles.post_location}>
                  <input placeholder="Add Location" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9l4.95-4.95zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                  </svg>
                </div>
                <div className={Styles.accessibility}>
                  <p>Accessibility</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                  </svg>
                </div>
                <div className={Styles.adv_settings}>
                  <p>Advanced Settings</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                  </svg>
                </div>
              </section>
            )}
          </div>
        )}
      </section>
      <button
        className={Styles.close_modal_btn}
        onClick={() => {
          props.toggleModal &&
            props?.toggleModal((state: boolean): boolean => !state);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
            fill="rgba(255,255,255,1)"
          />
        </svg>
      </button>
      {discardModal && (
        <DiscardModal
          toggleModal={setDiscardModal}
          resetFile={setFile}
          resetStep={setStep}
        />
      )}
    </main>,
    document.getElementById("root") as HTMLElement
  );
};
