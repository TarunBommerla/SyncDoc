import { RiArrowRightLine } from "@remixicon/react";
import { Link } from "react-router-dom";

const DocumentCard = () => {
  return (
    <div className="w-full">
      <div className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-gray-900">
            HEADING
          </h2>

          <p className="mt-1 text-sm text-gray-500">UPDATED</p>
        </div>

        <Link
          to={`/document/:Id`}
          className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-all duration-200 hover:bg-gray-900 hover:text-white"
        >
          <RiArrowRightLine
            size={20}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
};

export default DocumentCard;
