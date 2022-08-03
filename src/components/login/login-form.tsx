import Styles from "./login-form.module.scss";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { webAuth } from "../../auth0/auth0";
import { useState } from "react";
import { Loader } from "../loader/Loader";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const loginUser = async ({
    email,
    password,
    setIsLoggingIn,
  }: {
    email: string;
    password: string;
    setIsLoggingIn: (state: boolean) => void;
  }) => {
    webAuth.client.login(
      {
        realm: `${process.env.REACT_APP_AUTH0_DB_CONNECTION}`,
        username: email,
        password: password,
      },
      async (err, result) => {
        if (err) {
          return err;
        }
        // Default expiration time for refresh token is 30days(2592000 secs)
        if (result.idToken) {
          sessionStorage.setItem(
            "expiresAt",
            `${2592000 + new Date().getTime()}`
          );
          sessionStorage.setItem("refreshToken", result.refreshToken);
        } else {
          window.location.reload();
        }
        webAuth.client.userInfo(result.accessToken, async (err, userInfo) => {
          if (err) {
            console.error("Something went wrong");
            return;
          }
          setIsLoggingIn(false);
          dispatch(login(userInfo));
        });
      }
    );
  };
  console.log(isLoggingIn);
  return (
    <>
      {isLoggingIn ? (
        <Loader />
      ) : (
        <Formik
          validationSchema={schema}
          validateOnMount
          onSubmit={async (values, { setSubmitting }) => {
            setIsLoggingIn(true);
            await loginUser({ ...values, setIsLoggingIn });
          }}
          initialValues={{
            email: "",
            password: "",
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
                  placeholder="Phone number, username or email address"
                />
                <Form.Control.Feedback
                  type={errors.email && touched.email ? "invalid" : undefined}
                >
                  {errors.email ?? "Looks good!"}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={errors.password && touched.password ? true : false}
                />
                <Form.Control.Feedback
                  type={
                    errors.password && touched.password ? "invalid" : undefined
                  }
                >
                  {errors.password ?? "Looks good!"}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className={Styles.signup_button}
                disabled={!isValid || isSubmitting ? true : false}
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
