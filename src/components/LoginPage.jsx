import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import slices from "../redux/slices";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.slices.isAuthenticated);
  const turkishIdValidation = Yup.string()
    .matches(/^[1-9][0-9]{10}$/, "Must be 11 digits and cannot start with 0")
    .test("isValidTC", "Invalid Turkish Identity Number", (value) => {
      if (!value) return false;
      if (value.length !== 11) return false;

      const digits = value.split("").map(Number);
      if (digits[0] === 0) return false;

      const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
      const evenSum = digits[1] + digits[3] + digits[5] + digits[7];

      const tenthDigit = (oddSum * 7 - evenSum) % 10;
      if (digits[9] !== tenthDigit) return false;

      const eleventhDigit = digits.slice(0, 10).reduce((a, b) => a + b, 0) % 10;
      return digits[10] === eleventhDigit;
    });
  const formik = useFormik({
    initialValues: {
      identification: "",
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      identification: turkishIdValidation.required(
        "Identity number is required"
      ),
      userName: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(slices.actions.login(values));
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/homepage");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-[#8E1616] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-[#8E1616] text-center mb-5">
              Login
            </h1>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <input
                  id="identification"
                  name="identification"
                  type="text"
                  className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                  placeholder="Identity number"
                  {...formik.getFieldProps("identification")}
                />
                {formik.touched.identification &&
                formik.errors.identification ? (
                  <p className="text-red-500 text-[10px]">
                    {formik.errors.identification}
                  </p>
                ) : null}
              </div>
              <div>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                  placeholder="Username"
                  {...formik.getFieldProps("userName")}
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <p className="text-red-500 text-[10px]">
                    {formik.errors.userName}
                  </p>
                ) : null}
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500 text-[10px]">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                className={`rounded-md px-4 py-2 w-full font-semibold shadow-lg transition-all duration-300 
                ${
                  formik.isValid && formik.dirty
                    ? "bg-[#8E1616] text-white hover:bg-red-700 hover:scale-105"
                    : "bg-gray-400 text-[#8E1616] cursor-not-allowed"
                }`}
                disabled={!formik.isValid || !formik.dirty}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
