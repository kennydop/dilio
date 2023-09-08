import FormInput from "@/app/shared/components/Inputs/FormInput";
import { AppButton } from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";

export default function SelectAddressDialog({
  setName,
  setPhone,
  setAddress,
  PayButton,
}: {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  PayButton: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <AppButton onClick={handleOpen}>CheckOut</AppButton>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>Enter Address</DialogHeader>
        <DialogBody divider className="flex flex-col gap-2">
          <FormInput
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <FormInput
            placeholder="Phone"
            type="tel"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <FormInput
            placeholder="Address"
            type="address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {PayButton}
        </DialogFooter>
      </Dialog>
    </>
  );
}
