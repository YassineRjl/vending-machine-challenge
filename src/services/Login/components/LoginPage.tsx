import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import portraitImg from "../assets/portraitImg.jpeg";
import { signin } from "../../../api";
import { LANDING_PAGE_URL } from "../../../utils";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const LoginPage = () => {
  const navigate = useNavigate();

  const authenticate = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    await signin({
      username,
      password,
    })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err: AxiosError) => {
        alert((err.response?.data as { message: string })?.message);
        console.log(err);
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
            "Your vending machine coffee is unmatched. I literally traded my
            morning Starbucks ritual for your service, very convenient!" -
            <span className="not-italic">Max Gutsche</span>
          </span>
        </div>
        <p className="absolute top-12 right-12">
          New user?{" "}
          <Link
            to={"/signup"}
            className="text-teal-700 hover:text-teal-600 font-medium cursor-pointer"
          >
            Create an account
          </Link>
        </p>
        <div className="w-full flex items-center justify-center ">
          <div className="w-[80%] md:w-[60%] lg:w-[40%] h-full">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Sign in to Vending Machine
            </h1>

            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={authenticate}
            >
              {({ errors, touched }) => (
                <Form>
                  {/* Username input */}
                  <div>
                    <div
                      className={`mt-6 relative ${
                        errors.username && touched.username && "border-red-500"
                      }`}
                    >
                      <Field
                        type="text"
                        id="username_floating_outlined"
                        name="username"
                        className={`autofill:bg-white block px-3 pb-3 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer`}
                        placeholder=""
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

                  <div className="w-full flex justify-end items-center mt-6">
                    <button
                      type="submit"
                      className="w-40 block bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl px-4 py-3"
                    >
                      Sign In
                    </button>
                  </div>

                  <div className="relative">
                    <p className="text-[#84818A] absolute top-16 text-12">
                      Protected by reCAPTCHA and subject to the{" "}
                      <a
                        className="text-[#009580] "
                        href={`${LANDING_PAGE_URL}/privacy-policy`}
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
