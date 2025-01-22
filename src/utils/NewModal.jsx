import React from "react";
import { Modal, Box } from "@mui/material";

const NewModal = ({
  open,
  setOpen,
  children,

}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 outline-none w-[450px]  bg-white rounded-[8px] shadow p-4 max-h-[80vh] overflow-y-auto">
        {children}
      </Box>
    </Modal>
  );
};

export default NewModal;
