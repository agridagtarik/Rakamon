import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import slices from "../redux/slices";
import { useSelector } from "react-redux";

function AddEditTaskModal({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.slices.allData);
  const role = useSelector((state) => state.slices.user.role);
  const oneUser = useSelector((state) => state.slices.user);
  const allUsers = useSelector((state) => state.slices.users);

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [personel, setPersonel] = useState();

  const validationSchema = Yup.object({
    title: Yup.string().trim().required("Task name is required"),
    description: Yup.string().trim().required("Description is required"),
    personel: Yup.object().shape({
      id: Yup.number().required("Personel is required"),
      title: Yup.string().required("Personel name is required"),
    }),
    status: Yup.string().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      personel: {},
      status: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        title: values.title,
        description: values.description,
        personel: values.personel,
        status: values.status,
        newColIndex: allData?.columns.findIndex(
          (col) => col.name === values.status
        ),
      };

      if (type === "add") {
        dispatch(slices.actions.addTask(payload));
      } else {
        dispatch(
          slices.actions.editTask({ ...payload, taskIndex, prevColIndex })
        );
      }
      setIsAddTaskModalOpen(false);
      if (type === "edit") setIsTaskModalOpen(false);
    },
  });
  useEffect(() => {
    const col = allData?.columns[prevColIndex];
    const task = col?.tasks?.[taskIndex] || {};

    if (role === "user") {
      setPersonel([oneUser]);
    } else {
      setPersonel(allUsers);
    }
    if (type === "edit" && isFirstLoad && task) {
      formik.setValues({
        title: task?.title || "",
        description: task?.description || "",
        personel: task?.personel || {},
        status: task?.status || "",
      });
      setIsFirstLoad(false);
    }
  }, [
    allData?.columns,
    allData.personel,
    allUsers,
    formik,
    isFirstLoad,
    oneUser,
    prevColIndex,
    role,
    taskIndex,
    type,
  ]);

  return (
    <div
      className={`py-6 px-6 pb-40 absolute left-0 flex right-0 top-0 ${
        device === "mobile" ? "bottom-[-100vh]" : "bottom-0"
      } dropdown`}
      onClick={(e) =>
        e.target === e.currentTarget && setIsAddTaskModalOpen(false)
      }
    >
      <div className="scrollbar-hide max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-5 py-5 rounded-xl">
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Task</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-5 flex flex-col space-y-1">
            <label className="text-sm text-gray-500">Task Name</label>
            <input
              {...formik.getFieldProps("title")}
              type="text"
              className="bg-transparent px-3 py-1 rounded-md border border-gray-600 focus:outline-[#8E1616]"
              placeholder="Enter a task name"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-[10px]">{formik.errors.title}</p>
            )}
          </div>

          <div className="mt-5 flex flex-col space-y-1">
            <label className="text-sm text-gray-500">Description</label>
            <textarea
              {...formik.getFieldProps("description")}
              className="bg-transparent px-3 py-1 rounded-md border border-gray-600 focus:outline-[#8E1616] min-h-[100px]"
              placeholder="Enter a task description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-[10px]">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-col space-y-3">
            <label className="text-sm text-gray-500">Personel</label>
            <select
              {...formik.getFieldProps("personel.id")}
              onChange={(e) => {
                const selectedPersonel = personel?.find(
                  (p) => p.id === Number(e.target.value)
                );
                formik.setFieldValue("personel", selectedPersonel);
              }}
              className="px-3 py-1 rounded-md border border-gray-300 focus:outline-[#8E1616]"
            >
              <option value="">Choose a Personel</option>
              {personel?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5 flex flex-col space-y-3">
            <label className="text-sm text-gray-500">Current Status</label>
            <select
              {...formik.getFieldProps("status")}
              className="px-3 py-1 rounded-md border border-gray-300 focus:outline-[#8E1616]"
            >
              <option value="">Choose a Status</option>
              {allData?.columns?.map((col, index) => (
                <option key={index} value={col.name}>
                  {col.name}
                </option>
              ))}
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
            {type === "edit" ? "Save" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
