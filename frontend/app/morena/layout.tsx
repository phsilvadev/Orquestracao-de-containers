"use client";

import Header from "@/shared/components/Header/Header";

const LayoutMorena = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-screen h-screen">
      <Header />
      {children}
    </section>
  );
};

export default LayoutMorena;
