import React from "react";
import { Modal, Box } from "@mui/material";
import { X } from "lucide-react";
const CustomModel = ({
 
  open,
  setOpen,
children
  // component: Component,
}) => {
  return (
   
      <div className="">
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          style={{ overflow: 'scroll' }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          BackdropProps={{
            onClick: (event) => event.stopPropagation(), 
          }}
        >
           
          <Box className="absolute   top-[50%] left-[50%]  -translate-x-1/2 -translate-y-1/2 md:w-[600px] w-[90%]  bg-white h-[90vh] rounded-[8px] outline-none shadow p-4 overflow-y-scroll">
          <X size={35} className="text-indigo-600 font-bold p-0 hover:cursor-pointer absolute right-0 top-0" onClick={()=>setOpen(false)}/>
            {/* <Component setOpen={setOpen} />  */}
            {children}
          </Box>
        </Modal>
      </div>
    
  );
};

export default CustomModel;
