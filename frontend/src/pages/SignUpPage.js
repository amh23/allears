import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axois from "axios";
import { useToken } from "../auth/useToken";
import config from "../config";

const SignUpPage = () => {
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("An email address is required."),
      username: Yup.string()
        .min(8, "User name should have at least 8 characters")
        .max(50, "User name should not more then 50 characters.")
        .required("A user name is required."),
      password: Yup.string()
        .min(8, "Password length should be 8 minimum characters.")
        .matches(/[A-Z]/, "Password mush contain one capital letter.")
        .matches(/[a-z]/, "Password must contain lowercase letter.")
        .matches(/[0-9]/, "Password must contain one number.")
        .matches(/[@$!%*?&#]/, "Password must contain one speacial character.")
        .required("Password is required."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must be the same.")
        .required("Confirm password is required."),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await axois.post(
          `${config.backendUrl}/api/signup`,
          {
            email: values.email,
            username: values.username,
            password: values.password,
            confirmPassword: values.confirmPassword,
          },
          { withCredentials: true }
        );

        const { token } = response.data;
        setToken(token);
        navigate("/dashboard");
        console.log("Reponse", response);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setFieldError("email", "User already exists with this email");
        } else {
          console.error("An error occurs while user singn up.", error);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="my-3 text-center text-sm text-gray-500">
            Already have an account{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </a>
          </p>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
            </div>

            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                {...formik.getFieldProps("email")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
              <div className="text-red-500 text-xs mt-2 font-semibold">
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Name
              </label>
            </div>

            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                {...formik.getFieldProps("username")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
            </div>
            <div className="text-red-500 text-xs mt-2 font-semibold">
              {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.username}</div>
              ) : null}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                {...formik.getFieldProps("password")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
              <div className="text-red-500 text-xs mt-2 font-semibold">
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...formik.getFieldProps("confirmPassword")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
            </div>
            <div className="text-red-500 text-xs mt-2 font-semibold">
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-500 my-2px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpPage;
