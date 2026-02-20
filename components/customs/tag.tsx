import React from "react";

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-2 py-0.5 bg-primary/10 text-primary  text-xs font-bold rounded w-fit ">
      {children}
    </div>
  );
};

export default Tag;
