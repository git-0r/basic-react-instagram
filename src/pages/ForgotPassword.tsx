import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import Styles from "./forgot-password.module.scss";
import * as yup from "yup";
import { webAuth } from "../auth0/auth0";

export const ForgotPassword = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
  });

  return (
    <>
      <main className={Styles.container}>
        <div className={Styles.form_wrapper}>
          <span className={Styles.lock_circle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M6 8V7a6 6 0 1 1 12 0v1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2zm13 2H5v10h14V10zm-8 5.732a2 2 0 1 1 2 0V18h-2v-2.268zM8 8h8V7a4 4 0 1 0-8 0v1z" />
            </svg>
          </span>
          <p className={Styles.login_trouble}>Trouble with logging in?</p>
          <p>
            Enter your email address, phone number or username, and we'll send
            you a link to get back into your account.
          </p>
          <Formik
            validationSchema={schema}
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              webAuth.changePassword(
                {
                  connection: `${process.env.REACT_APP_AUTH0_DB_CONNECTION}`,
                  email: values.email,
                },
                function (err, resp) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(resp);
                  }
                }
              );
            }}
            initialValues={{
              email: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
              isSubmitting,
            }) => (
              <Form
                className={Styles.signup_form}
                noValidate
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-2" controlId="email">
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email ? true : false}
                    placeholder="Email address, phone number or username"
                    className={Styles.email_input}
                  />
                  <Form.Control.Feedback
                    type={errors.email && touched.email ? "invalid" : undefined}
                  >
                    {errors.email ?? "Looks good!"}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isValid || isSubmitting ? true : false}
                >
                  Send Login Link
                </Button>
              </Form>
            )}
          </Formik>
          <div className={Styles.separator}>
            <span className={Styles.separator_text}>OR</span>
          </div>
          <p className={Styles.create_new_account}>Create New Account</p>
        </div>
        <Link to="/login">Back to Login</Link>
      </main>
      <Footer />
    </>
  );
};
