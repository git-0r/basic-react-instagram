import Styles from "./signup-form.module.scss";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { webAuth } from "../../auth0/auth0";

export const SignupForm = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    fullname: yup.string().required(),
    username: yup.string().required(),
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const webAuthLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    webAuth.signup(
      {
        connection: `${process.env.REACT_APP_AUTH0_DB_CONNECTION}`,
        email,
        password,
        // user_metadata: {
        // role: UserType.CUSTOMER,
        // },
      },
      async (err, result) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(result);
        // await loginUser();
      }
    );
  };

  return (
    <Formik
      validationSchema={schema}
      validateOnMount
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        // alert(JSON.stringify(values, null, 2));
        // setSubmitting(false);
        await webAuthLogin(values);
      }}
      initialValues={{
        email: "",
        fullname: "",
        username: "",
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
        <Form className={Styles.signup_form} noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-2" controlId="email">
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              isValid={touched.email && !errors.email}
              isInvalid={touched.email && errors.email ? true : false}
              placeholder="Mobile number or email address"
            />
            <Form.Control.Feedback
              type={errors.email && touched.email ? "invalid" : undefined}
            >
              {errors.email ?? "Looks good!"}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2" controlId="fullname">
            <Form.Control
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={values.fullname}
              onChange={handleChange}
              isValid={touched.fullname && !errors.fullname}
              isInvalid={touched.fullname && errors.email ? true : false}
            />
            <Form.Control.Feedback
              type={errors.fullname && touched.fullname ? "invalid" : undefined}
            >
              {errors.fullname ?? "Looks good!"}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2" controlId="username">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              isValid={touched.username && !errors.username}
              isInvalid={touched.username && errors.username ? true : false}
            />
            <Form.Control.Feedback
              type={errors.username && touched.username ? "invalid" : undefined}
            >
              {errors.username ?? "Looks good!"}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2" controlId="password">
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
              type={errors.password && touched.password ? "invalid" : undefined}
            >
              {errors.password ?? "Looks good!"}
            </Form.Control.Feedback>
          </Form.Group>
          <p className={Styles.tnc}>
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <span className={Styles.tnc_emphasis}>Learn more</span>
          </p>
          <p className={Styles.tnc}>
            By signing up, you agree to our
            <span className={Styles.tnc_emphasis}>
              {" "}
              Terms, Data Policy
            </span> and{" "}
            <span className={Styles.tnc_emphasis}>Cookie Policy</span>.
          </p>
          <Button
            variant="primary"
            type="submit"
            className={Styles.signup_button}
            disabled={!isValid || isSubmitting ? true : false}
          >
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
};
