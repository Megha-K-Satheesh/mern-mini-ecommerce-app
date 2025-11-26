import { useState } from "react";

export function CategoryDropdown({ options, value, setCategory }) {
  const [open, setOpen] = useState(false);
  const allOptions = ["All Category", ...options];

  return (
    <div className="relative w-full mt-2">
      <div
        className="border border-gray-300 p-2 rounded-md flex justify-between items-center cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm">{value || "All Category"}</span>
        <span className="text-lg">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="absolute left-0 top-full w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto z-50 shadow-lg">
          {allOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setCategory(item === "All Category" ? "" : item);
                setOpen(false);
              }}
              className="p-2 hover:bg-amber-200 cursor-pointer text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
