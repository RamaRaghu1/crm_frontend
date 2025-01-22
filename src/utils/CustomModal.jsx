import React from "react";
import { Modal, Box } from "@mui/material";
import { X } from "lucide-react";
const CustomModel = ({
  open,
  setOpen,
  children,
  // component: Component,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      BackdropProps={{
        onClick: (event) => event.stopPropagation(),
      }}
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 md:w-[600px] w-[90%] bg-white rounded-[8px] outline-none shadow p-4 max-h-[90vh] overflow-y-auto">
        <X
          size={35}
          className="text-indigo-600 font-bold p-0 hover:cursor-pointer absolute right-0 top-0"
          onClick={() => setOpen(false)}
        />
        {/* <Component setOpen={setOpen} />  */}
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModel;
