import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { useToken } from "../auth/useToken";
import axios from "axios";

const LogInPage = () => {
  const [, setToken] = useToken();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email")
        .required("An email address is required."),
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await axios.post(
          `${config.backendUrl}/api/login`,
          { email: values.email, password: values.password },
          { withCredentials: true }
        );

        const { token } = response.data;
        setToken(token);
        navigate("/dashboard");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setFieldError("email", "Email or password is incorrect.");
        } else {
          console.log("An error occurs while user logs in.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Handle Enter key press to trigger form submit
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      formik.handleSubmit(); // Submit the form when Enter is pressed
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                onKeyDown={handleKeyDown} // Trigger form submit on Enter key press
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
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="/#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                {...formik.getFieldProps("password")}
                onKeyDown={handleKeyDown} // Trigger form submit on Enter key press
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
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log In
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create a new account
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LogInPage;
