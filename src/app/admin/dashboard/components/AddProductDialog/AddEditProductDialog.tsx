import "./AddEditProductDialog.css";
import FormInput from "@/app/shared/components/Inputs/FormInput";
import {
  AppButton,
  Loading,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { toCapitalize } from "@/helpers/strings/strings";
import { db, storage } from "@/services/firebase/config";
import { PhotoIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";

export default function AddEditProductDialog({
  btn,
  refresh,
  defProduct = {
    id: "",
    name: "",
    category: "",
    description: "",
    price: 0.0,
    quantity: 0.0,
    sold: 0,
    images: [],
    shipping: 0.0,
    removed: false,
  },
}: {
  btn?: JSX.Element;
  refresh?: () => void;
  defProduct?: IProduct;
}) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState<IProduct>(defProduct);

  useEffect(() => {
    if (defProduct.images.length > 0) setImagePreviews(defProduct.images);
  }, [defProduct]);

  const fetchCategories = async () => {
    const q = query(collection(db, "categories"));

    const querySnapshot = await getDocs(q);
    const categoriesArray = querySnapshot.docs.map((doc) => {
      return doc.data().name;
    });
    setCategories(categoriesArray);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArr = Array.from(files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...fileArr]);

    const readPromises: Promise<string>[] = [];

    fileArr.forEach((file) => {
      readPromises.push(
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result);
            } else {
              reject("Could not read file");
            }
          };
          reader.readAsDataURL(file);
        })
      );
    });

    Promise.all(readPromises)
      .then((newImagePreviews) => {
        setImagePreviews((prevPreviews) => [
          ...prevPreviews,
          ...newImagePreviews,
        ]);
      })
      .catch((err) => {
        console.error("Error reading files:", err);
      });
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const uploadImages = async (files: File[], id: string) => {
    const imageUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `products/${id}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Wait for the upload to complete
      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // You can add code to show upload progress here if you wish
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          async () => {
            // Upload completed successfully, now we can get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            imageUrls.push(downloadURL);
            resolve();
          }
        );
      });
    }
    return imageUrls;
  };

  const addProduct = async () => {
    if (
      !product.name ||
      !product.category ||
      !product.description ||
      !product.price ||
      !product.quantity ||
      !product.shipping
    )
      return setError("Please fill all fields");
    if (product.price < 1) return setError("Price must be greater than 0");
    if (product.quantity < 1)
      return setError("Quantity must be greater than 0");
    if (product.shipping < 1)
      return setError("Shipping fee must be greater than 0");

    if (
      product.images.length < 1 &&
      (!selectedFiles || selectedFiles.length === 0)
    )
      return setError("Please upload at least one image");

    setLoading(true);
    setError(null);
    try {
      let imageUrls: string[] = imagePreviews.filter((preview) =>
        preview.startsWith("https:")
      );
      let addedImageUrls: string[] = [];
      const docRef = product.id
        ? doc(db, "products", product.id)
        : doc(collection(db, "products"));

      if (selectedFiles) {
        addedImageUrls = await uploadImages(selectedFiles, docRef.id);
      }

      imageUrls = [...imageUrls, ...addedImageUrls];

      const newProduct = {
        ...product,
        id: docRef.id,
        images: imageUrls,
        createdAt: product.createdAt ?? new Date(),
        updatedAt: new Date(),
      };
      await setDoc(docRef, newProduct);
      setProduct(newProduct);
      setAdded(true);
      setProduct({
        id: "",
        name: "",
        category: "",
        description: "",
        price: 0,
        quantity: 0,
        sold: 0,
        images: [],
        shipping: 0,
        removed: false,
      });
      setSelectedFiles([]);
      setImagePreviews([]);
    } catch (error: any) {
      console.log("ERROR", error);
      console.log("ERROR.message", error?.message);
      setError(error?.message ?? error ?? "An error occured");
    }
    setLoading(false);
    if (refresh) refresh();
  };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      {btn ? (
        <div onClick={handleOpen}>{btn}</div>
      ) : (
        <AppButton
          className="flex gap-2 justify-center items-center"
          onClick={handleOpen}
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add New Product</span>
        </AppButton>
      )}

      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader className="flex flex-col text-start w-full items-start">
          <h2>
            {loading
              ? "Adding New Product..."
              : added
              ? "New Product Added"
              : "Enter Product Details"}
          </h2>
          {error && <p className="error">{error}</p>}
        </DialogHeader>
        <DialogBody
          divider
          className="flex flex-col gap-2 h-[25rem] overflow-auto"
        >
          {loading ? (
            <div className="flex justify-center items-center h-full w-full">
              <Loading />
            </div>
          ) : added ? (
            <div className="flex flex-col justify-center items-center gap-2 h-full">
              <Image
                alt="Success"
                src="/assets/images/success.gif"
                width={200}
                height={200}
              />
              <h3 className="text-2xl text-center">
                Product added successfully
              </h3>
            </div>
          ) : (
            <>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[5rem] w-full border border-gray-400 bg-gray-200 flex rounded-lg items-center justify-center gap-2 cursor-pointer"
              >
                <PhotoIcon className="h-10 w-10 text-gray-500" />
                <p className="text-gray-500 text-lg font-semibold flex items-center">
                  Add Images
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*"
                  hidden
                />
              </div>
              <div className="upload__img-wrap">
                {imagePreviews.map((preview, index) => (
                  <div className="upload__img-box" key={index}>
                    <div
                      style={{ backgroundImage: `url(${preview})` }}
                      className="img-bg"
                    >
                      <div
                        className="upload__img-close"
                        onClick={() => removeFile(index)}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <FormInput
                placeholder="Name"
                onChange={(e) => {
                  setProduct({ ...product, name: e.target.value });
                }}
                value={product.name}
              />
              <FormInput
                placeholder="Category"
                options={categories}
                type="select"
                onChange={(e) => {
                  setProduct({
                    ...product,
                    category: e
                      .replaceAll("&", "and")
                      .replaceAll(" ", "-")
                      .toLowerCase(),
                  });
                }}
                value={toCapitalize(
                  product.category.replaceAll("-", " ").replaceAll("and", "&")
                )}
              />
              <FormInput
                placeholder="Description"
                type="textarea"
                height="80px"
                onChange={(e) => {
                  setProduct({ ...product, description: e.target.value });
                }}
                value={product.description}
              />
              <FormInput
                placeholder="Quantity"
                type="number"
                onChange={(e) => {
                  setProduct({
                    ...product,
                    quantity: parseInt(e.target.value),
                  });
                }}
                value={
                  product.quantity < 1 ? undefined : product.quantity.toString()
                }
              />
              <FormInput
                placeholder="Price (GH₵)"
                type="number"
                onChange={(e) => {
                  setProduct({ ...product, price: parseFloat(e.target.value) });
                }}
                value={product.price < 1 ? undefined : product.price.toString()}
              />
              <FormInput
                placeholder="Shipping Fee"
                type="number"
                onChange={(e) => {
                  setProduct({
                    ...product,
                    shipping: parseFloat(e.target.value),
                  });
                }}
                value={
                  product.shipping < 1 ? undefined : product.shipping.toString()
                }
              />
            </>
          )}
        </DialogBody>
        <DialogFooter>
          {!loading && (
            <>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>{added ? "Close" : "Cancel"}</span>
              </Button>
              <AppButton
                onClick={
                  added
                    ? () => {
                        setAdded(false);
                      }
                    : addProduct
                }
              >
                {added ? "Add Another Product" : "Add Product"}
              </AppButton>
            </>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
