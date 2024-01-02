import { useFormik } from "formik";
import { AiOutlinePlus } from "react-icons/ai";
import * as Yup from "yup";
import { addTodo } from "../api/todoApi";

interface AddTodoProps {
  onAddTodo: () => void;
 }

export default function AddTodo({onAddTodo}: AddTodoProps) {
  const formik = useFormik({
    initialValues: {
      id: "",
      task: "",
      status: "active",
    },
    validationSchema: Yup.object({
      task: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(30, "Must be 30 characters or less")
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        await addTodo(values);
        onAddTodo();
      } catch (err) {
        console.log("error adding todo");
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex gap-2 relative">
        <input
          type="text"
          placeholder={"Press Enter or click the + button"}
          id="task"
          name="task"
          value={formik.values.task}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="py-3 px-5 block w-full border-gray-200 rounded-full focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.errors.task ? (
          <p className="absolute -top-7 left-5 text-red-600">
            {formik.errors.task}
          </p>
        ) : null}
        <button type="submit" className="bg-gray-200 rounded-full">
          <AiOutlinePlus />
        </button>
      </form>
    </>
  );
}
