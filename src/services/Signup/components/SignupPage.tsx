import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signup } from "../../../api";
import { LANDING_PAGE_URL } from "../../../utils";
import portraitImg from "../../Login/assets/portraitImg.jpeg";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  checkTerms: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});

export const SignupPage = () => {
  const navigate = useNavigate();

  const localSignup = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    await signup({
      username,
      password,
      role: "buyer",
    })
      .then(() => {
        navigate("/login");
      })
      .catch((err: AxiosError) => {
        console.log(err);
        alert((err.response?.data as { message: string })?.message);
      });
  };

  return (
    <div className="h-screen w-full bg-white font-poppins">
      <div className="flex justify-between items-center w-full h-full ">
        <div className="w-3/6 h-full relative hidden md:block">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${portraitImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <span className="absolute bottom-24 text-white text-24 font-medium px-12 italic">
            "I went from waiting 15 minutes in the morning for my coffee to 5
            minutes. I highly recommend this service!" -
            <span className="not-italic">Max Gutsche</span>
          </span>
        </div>
        <p className="absolute top-12 right-12">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-teal-700 hover:text-teal-600 font-medium cursor-pointer"
          >
            Sign in
          </Link>
        </p>
        <div className="w-full flex items-center justify-center ">
          <div className="w-[80%] md:w-[60%] lg:w-[40%] h-full">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Sign up to Vending Machine
            </h1>

            <Formik
              initialValues={{
                username: "",
                password: "",
                checkTerms: false,
              }}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={localSignup}
            >
              {({ errors, touched, ...props }) => (
                <Form>
                  <div>
                    <div
                      className={`mt-6 relative ${
                        errors.username && touched.username && "border-red-500"
                      }`}
                    >
                      <Field
                        type="username"
                        id="username_floating_outlined"
                        name="username"
                        className={`autofill:bg-white block px-3 pb-3 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer`}
                        placeholder=" "
                      />

                      <label
                        htmlFor="username_floating_outlined"
                        className="hover:cursor-text absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 bg-white peer-focus:bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Username
                      </label>
                    </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Password input */}
                  <div>
                    <div
                      className={`mt-6 relative ${
                        errors.password && touched.password && "border-red-500"
                      }`}
                    >
                      <Field
                        type="password"
                        id="password_floating_outlined"
                        name="password"
                        className={`autofill:bg-white block px-3 pb-3 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer`}
                        placeholder=" "
                      />
                      <label
                        htmlFor="password_floating_outlined"
                        className="hover:cursor-text absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 bg-white peer-focus:bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Password
                      </label>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* checkmark for terms of service */}
                  <div className="mt-6 flex items-start">
                    <Field
                      type="checkbox"
                      id="terms"
                      name="checkTerms"
                      className="mt-1 peer h-4 w-4 cursor-pointer border border-gray-300 rounded-md checked:bg-teal-600 checked:border-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-blue-500"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I agree to the{" "}
                      <a
                        className="text-[#009580] "
                        href={`${LANDING_PAGE_URL}/privacy-service`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Vending Machine Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        className="text-[#009580]"
                        href={`${LANDING_PAGE_URL}/terms-of-service`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Terms of Service.
                      </a>
                    </label>
                  </div>
                  <ErrorMessage
                    name="checkTerms"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <button
                    type="submit"
                    className="w-full block bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl px-4 py-3 mt-8"
                  >
                    Sign Up
                  </button>

                  <div className="relative">
                    <p className="text-[#84818A] absolute top-16 text-12">
                      Protected by reCAPTCHA and subject to the{" "}
                      <a
                        className="text-[#009580] "
                        href={`${LANDING_PAGE_URL}/privacy-policy`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        VendingMachine Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        className="text-[#009580]"
                        href={`${LANDING_PAGE_URL}/terms-of-service`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Terms of Service.
                      </a>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
