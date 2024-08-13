import { Formik, Form, Field } from "formik";
import { z, object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

// Zod
const addProductFormSchema = object({
  title: string({
    required_error: "*Please enter a title",
  }),
  price: string({
    required_error: "*Please enter a price",
  }),
  description: string({
    required_error: "*Please enter a description",
  }),
  image: string({
    required_error: "*Image is required",
  }),
  category: z.string().min(3, "*Category must be at least 3 characters long"),
});

// add product
const addProduct = async (product) => {
  const response = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// fetch products
const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const AddProductForm = () => {
  const queryClient = useQueryClient();
  
  const { data: products = [], isSuccess } = useQuery({
    queryKey: ["getProducts"],
    queryFn: fetchProducts,
  });

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      console.log("Product added successfully:", newProduct);
      alert("Product added successfully");

      if (isSuccess) {
        // Update the cache directly
        queryClient.setQueryData(["getProducts"], (oldData) => {
          return [...oldData, newProduct];
        });
      }
    },
    onError: (error) => {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    },
  });

  return (
    <Formik
      initialValues={{
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        await mutation.mutateAsync({
          title: values.title,
          price: Number(values.price),
          description: values.description,
          image: values.image,
          category: values.category,
        });
        resetForm();
      }}
      validationSchema={toFormikValidationSchema(addProductFormSchema)}
    >
      {({ errors }) => (
        <Form>
          <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <div>
              <label className="text-base font-semibold text-black block">
                Title
              </label>
              <Field
                type="text"
                name="title"
                placeholder="Enter title"
                className="rounded-lg w-full border border-gray-300 p-2 mt-1"
              />
              {!!errors.title && (
                <div className="text-red-500 pt-2 text-sm">{errors.title}</div>
              )}
            </div>

            <div className="mt-4">
              <label className="text-base font-semibold text-black block">
                Price
              </label>
              <Field
                type="text"
                name="price"
                placeholder="Enter price"
                className="rounded-lg w-full border border-gray-300 p-2 mt-1"
              />
              {!!errors.price && (
                <div className="text-red-500 pt-2 text-sm">{errors.price}</div>
              )}
            </div>

            <div className="mt-4">
              <label className="text-base font-semibold text-black block">
                Description
              </label>
              <Field
                type="text"
                name="description"
                placeholder="Enter description"
                className="rounded-lg w-full border border-gray-300 p-2 mt-1"
              />
              {!!errors.description && (
                <div className="text-red-500 pt-2 text-sm">{errors.description}</div>
              )}
            </div>

            <div className="mt-4">
              <label className="text-base font-semibold text-black block">
                Image
              </label>
              <Field
                type="text"
                name="image"
                placeholder="Enter image URL"
                className="rounded-lg w-full border border-gray-300 p-2 mt-1"
              />
              {!!errors.image && (
                <div className="text-red-500 pt-2 text-sm">{errors.image}</div>
              )}
            </div>

            <div className="mt-4">
              <label className="text-base font-semibold text-black block">
                Category
              </label>
              <Field
                type="text"
                name="category"
                placeholder="Enter category"
                className="rounded-lg w-full border border-gray-300 p-2 mt-1"
              />
              {!!errors.category && (
                <div className="text-red-500 pt-2 text-sm">{errors.category}</div>
              )}
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className={clsx(
                  "bg-red-500 px-4 py-2 rounded-md text-white",
                  mutation.isPending ? "opacity-50" : null
                )}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductForm;
