import React from "react";

interface SearchHistoryProps {
  lat: number;
  long: number;
  date: Date | string;
  time: string;
  onclick: any;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  lat,
  long,
  date,
  onclick,
  time,
}) => {
  const formattedDate = date instanceof Date ? date.toLocaleDateString() : date;
  return (
    <div
      className="flex justify-between border-b-2 mb-2 border-slate-100 cursor-pointer"
      onClick={onclick}
    >
      <h5 className="text-slate-600 text-md">
        Lat: {lat}, Long: {long}
      </h5>
      <h6 className="text-slate-600 text-sm">
        {formattedDate}, {time}
      </h6>
    </div>
  );
};
