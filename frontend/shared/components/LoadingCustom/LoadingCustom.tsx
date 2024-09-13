"use client";

import { Card, Spinner } from "@nextui-org/react";

const LoadingCustom = () => {
  return (
    <div className="modal-container">
      <div className="flex justify-center items-center w-full h-full">
        <Card className="p-4">
          <Spinner color="current" size="lg" />
        </Card>
      </div>
    </div>
  );
};

export default LoadingCustom;
