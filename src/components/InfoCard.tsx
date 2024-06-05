import React, { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  value: number;
  unit?: string;
  icon?: ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  unit,
  icon,
}) => {
  return (
    <div className="col-auto">
      <div className="shadow-md p-2 flex flex-col justify-start items-start bg-white/10 border-t-2 rounded-lg">
        <div className="text-white ">{icon}</div>
        <h3 className=" text-white/50 text-sm">{title}</h3>
        <h4 className="text-white font-bold capitalize">
          {value}
          {unit}
        </h4>
      </div>
    </div>
  );
};
