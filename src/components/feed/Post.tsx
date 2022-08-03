import { SyntheticEvent, useState } from "react";
import { useSelector } from "react-redux";
import { appState } from "../../routes/LoggedInRoutes";
import Styles from "./post.module.scss";
import { IPost } from "../../redux/postSlice";

const Post = (props: { post: IPost }) => {
  const user = useSelector((state: appState) => state.auth.user);
  const [comment, setComment] = useState("");

  const handleCommentForm = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setComment(target?.value);
  };
  return (
    <>
      <section className={Styles.post}>
        <header className={Styles.post_header}>
          <div className={Styles.avatar_wrapper}>
            <img src={user.picture} alt="avatar" className={Styles.avatar} />
          </div>
          <div className={Styles.nickname_wrapper}>
            <p>{user.nickname}</p>
            <p>Original audio</p>
          </div>
          <div className={Styles.options_wrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm14 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
        </header>
        <div className={Styles.content_wrapper}>
          {props.post.fileType === "image" ? (
            <img src={props.post.fileURL} alt="file"/>
          ) : (
            <video src={props.post.fileURL}></video>
          )}
        </div>
        <div className={Styles.icons_wrapper}>
          <div className={Styles.left_icons}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0H24V24H0z" />
              <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M10 3h4a8 8 0 1 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8zm2 14h2a6 6 0 1 0 0-12h-4a6 6 0 0 0-6 6c0 3.61 2.462 5.966 8 8.48V17z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M1.923 9.37c-.51-.205-.504-.51.034-.689l19.086-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.475.553-.717.07L11 13 1.923 9.37zm4.89-.2l5.636 2.255 3.04 6.082 3.546-12.41L6.812 9.17z" />
            </svg>
          </div>
          <div className={Styles.right_icons}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1zm13 2H6v15.432l6-3.761 6 3.761V4z" />
            </svg>
          </div>
        </div>
        <p className={Styles.likes_count}>324,424 likes</p>
        <p className={Styles.caption_wrapper}>
          <span className={Styles.nickname}>{user.nickname} </span>
          {props.post.caption}
        </p>
        <p className={Styles.comments_count}>View all 2,200 comments</p>
        <p className={Styles.created_at}>1 DAY AGO</p>
        <div className={Styles.comment_box}>
          <div className={Styles.emoji_wrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0zm1-2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </div>
          <form className={Styles.comment_form}>
            <input
              type="text"
              placeholder="Add a comment..."
              required
              value={comment}
              onChange={handleCommentForm}
            />
            <button disabled={!comment ? true : false}>Post</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Post;