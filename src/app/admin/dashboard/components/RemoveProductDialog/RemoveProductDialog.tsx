import {
  AppButton,
  Loading,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { db } from "@/services/firebase/config";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function RemoveProductDialog({
  btn,
  refresh,
  defProduct,
}: {
  btn?: JSX.Element;
  refresh?: () => void;
  defProduct: IProduct;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleRemoveProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const productRef = doc(db, "products", defProduct.id);
      await setDoc(productRef, {
        ...defProduct,
        removed: true,
        updatedAt: Date.now(),
      });
      if (refresh) refresh();
      handleOpen();
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      {btn ? (
        <div onClick={handleOpen}>{btn}</div>
      ) : (
        <AppButton
          className="flex gap-2 justify-center items-center"
          onClick={handleOpen}
        >
          <TrashIcon className="h-5 w-5" />
          <span>Add New Product</span>
        </AppButton>
      )}

      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader className="flex flex-col text-start w-full items-start">
          <h2>{loading ? "Removing Product..." : "Confirm Product Removal"}</h2>
          {error && <p className="error">{error}</p>}
        </DialogHeader>
        <DialogBody divider className="flex flex-col gap-2 overflow-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full w-full">
              <Loading />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p>
                Are you sure you want to remove{" "}
                <span className="font-semibold">{defProduct.name}</span> from
                the your store?
              </p>
              <p>This action cannot be undone.</p>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          {!loading && (
            <>
              <Button
                variant="text"
                color="blue-gray"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <AppButton
                loading={loading}
                onClick={handleRemoveProduct}
                className="bg-red-500"
              >
                Confirm
              </AppButton>
            </>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
