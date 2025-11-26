import { useState } from "react";

export function SortDropdown({ value, setSort }) {
  const [open, setOpen] = useState(false);

  const sortOptions = [
    { label: "Sort by Price", value: "" },
    { label: "Low to High", value: "price" },
    { label: "High to Low", value: "-price" },
  ];

  return (
    <div className="relative w-full mt-2">
      <div
        className="border border-gray-300 bg-amber-100 p-2 rounded-md flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm">
          {sortOptions.find((o) => o.value === value)?.label || "Sort by Price"}
        </span>
        <span className="text-lg">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="absolute left-0 top-full w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto z-50 shadow-lg ">
          {sortOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setSort(option.value);
                setOpen(false);
              }}
              className={`p-2 hover:bg-amber-200 cursor-pointer text-sm ${
                value === option.value ? "font-bold text-blue-600" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
