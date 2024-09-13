"use client";

import { Card, Spinner } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";

const Conflict = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -500 }}
          className="modal-container"
        >
          <div className="flex justify-center items-center w-full h-full">
            <Card className="p-4 w-[400px] h-[200px] flex justify-center items-center flex-col bg-[#fff3cd] border border-[#ffeeba] text-[#856404]">
              <div className="text-[20px] text-center font-extrabold">
                <div> Não foi possivel se inscrever</div>
              </div>
              <div className="mt-4 text-center ">
                Você não pode se inscrever em dois eventos ao mesmo tempo.
              </div>
            </Card>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Conflict;
