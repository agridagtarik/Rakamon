import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import slices from "../redux/slices";

function AddEditUserModal({
  type,
  device,
  setIsUserModalOpen,
  setIsAddUserModalOpen,
}) {
  const dispatch = useDispatch();

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

  const validationSchema = Yup.object({
    title: Yup.string().trim().required("Name-Surname is required"),
    identification: turkishIdValidation.required("Identity number is required"),
    userName: Yup.string()
      .trim()
      .min(4, "User Name must be at least 4 characters")
      .required("User Name is required"),
    password: Yup.string()
      .trim()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
    status: Yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      identification: "",
      userName: "",
      password: "",
      status: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        title: values.title,
        identification: values.identification,
        userName: values.userName,
        password: values.password,
        status: values.status,
      };

      dispatch(slices.actions.addUser(payload));
      setIsAddUserModalOpen(false);
      if (type === "edit") setIsUserModalOpen(false);
    },
  });

  return (
    <div
      className={`py-6 px-6 pb-40 absolute left-0 flex right-0 top-0 ${
        device === "mobile" ? "bottom-[-100vh]" : "bottom-0"
      } dropdown`}
      onClick={(e) =>
        e.target === e.currentTarget && setIsAddUserModalOpen(false)
      }
    >
      <div className="scrollbar-hide max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-5 py-5 rounded-xl">
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} User</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-5 flex flex-col space-y-1">
            <label className="text-sm text-gray-500">Name-Surname</label>
            <input
              {...formik.getFieldProps("title")}
              type="text"
              className="bg-transparent px-3 py-1 rounded-md border border-gray-600 focus:outline-[#8E1616]"
              placeholder="Enter a Name-Surname"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-[10px]">{formik.errors.title}</p>
            )}
          </div>

          <div className="mt-5 flex flex-col space-y-1">
            <label className="text-sm text-gray-500">Identity number</label>
            <input
              {...formik.getFieldProps("identification")}
              type="text"
              className="bg-transparent px-3 py-1 rounded-md border border-gray-600 focus:outline-[#8E1616]"
              placeholder="Enter a Identity number"
            />
            {formik.touched.identification && formik.errors.identification && (
              <p className="text-red-500 text-[10px]">
                {formik.errors.identification}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-col space-y-1">
            <label className="text-sm text-gray-500">User Name</label>
            <input
              {...formik.getFieldProps("userName")}
              type="text"
              className="bg-transparent px-3 py-1 rounded-md border border-gray-600 focus:outline-[#8E1616]"
              placeholder="Enter a User Name"
            />
            {formik.touched.userName && formik.errors.userName && (
              <p className="text-red-500 text-[10px]">
                {formik.errors.userName}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-col space-y-1">
            <label className="text-sm text-gray-500">Password</label>
            <input
              {...formik.getFieldProps("password")}
              type="text"
              className="bg-transparent px-3 py-1 rounded-md border border-gray-600 focus:outline-[#8E1616]"
              placeholder="Enter a Password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-[10px]">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-col space-y-3">
            <label className="text-sm text-gray-500">User Role</label>
            <select
              {...formik.getFieldProps("status")}
              className="px-3 py-1 rounded-md border border-gray-300 focus:outline-[#8E1616]"
            >
              <option value="">Choose a Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            type="submit"
            className={`rounded-md px-4 py-2 mt-4 w-full font-semibold shadow-lg transition-all duration-300 
                ${
                  formik.isValid && formik.dirty
                    ? "bg-[#8E1616] text-white hover:bg-red-700 hover:scale-105"
                    : "bg-gray-400 text-[#8E1616] cursor-not-allowed"
                }`}
            disabled={!formik.isValid || !formik.dirty}
          >
            {type === "edit" ? "Save" : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEditUserModal;
