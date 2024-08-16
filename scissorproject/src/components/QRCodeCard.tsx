// import React, { useState } from "react";
// import { useQRCode } from "../contexts/QRCodeContexts";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCopy,
//   faChevronLeft,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";

// const ITEMS_PER_PAGE = 10; // Number of items per page

// const QRCodeTable: React.FC = () => {
//   const { qrCodes } = useQRCode();
//   const [currentPage, setCurrentPage] = useState<number>(1); // State to track the current page

//   if (!qrCodes || qrCodes.length === 0) {
//     return <p>No QR codes found.</p>;
//   }

//   // Calculate the indexes for slicing
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const paginatedQRCodes = qrCodes.slice(startIndex, endIndex);

//   // Handle page change
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="bg-white rounded-lg">
//       <h4 className="text-xl font-medium text-gray-700 mb-4">Your QR Codes</h4>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//         {paginatedQRCodes.map((qrCode) => (
//           <div
//             key={qrCode.id}
//             className="flex flex-row bg-white p-4 rounded-lg mb-4 items-center border border-gray-300"
//           >
//             <img
//               src={qrCode.qrCodeData}
//               alt="QR Code"
//               className="w-32 h-32 max-w-xs"
//               onError={(e) =>
//                 console.error("Failed to load image", e, qrCode.qrCodeData)
//               }
//             />
//             <div className="ml-4">
//               <p className="text-blue-500 hover:underline">
//                 <a
//                   href={qrCode.originalUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="truncate block max-w-xs"
//                   title={qrCode.originalUrl}
//                 >
//                   {qrCode.originalUrl}
//                 </a>
//               </p>
//               <p className="text-gray-600 mt-2">
//                 Created At:{" "}
//                 {qrCode.createdAt
//                   ? qrCode.createdAt.toDate().toISOString().split("T")[0]
//                   : "N/A"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-end mt-4">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-violet-500 text-white rounded-l-md "
//         >
//           <FontAwesomeIcon icon={faChevronLeft} />
//         </button>
//         <span className="px-4 py-2">
//           Page {currentPage} of {Math.ceil(qrCodes.length / ITEMS_PER_PAGE)}
//         </span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage * ITEMS_PER_PAGE >= qrCodes.length}
//           className="px-4 py-2 bg-violet-500 text-white rounded-r-md "
//         >
//           <FontAwesomeIcon icon={faChevronRight} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QRCodeTable;

import React, { useState } from "react";
import { useQRCode } from "../contexts/QRCodeContexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import QRCode from "qrcode.react";

const ITEMS_PER_PAGE = 6; // Number of items per page

const QRCodeTable: React.FC = () => {
  const { qrCodes } = useQRCode();
  const [currentPage, setCurrentPage] = useState<number>(1); // State to track the current page

  if (!qrCodes || qrCodes.length === 0) {
    return <p>No QR codes found.</p>;
  }

  // Calculate the indexes for slicing
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedQRCodes = qrCodes.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg">
      <h4 className="text-xl font-medium text-gray-700 mb-4">Your QR Codes</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {paginatedQRCodes.map((qrCode) => (
          <div
            key={qrCode.id}
            className="flex flex-row bg-white p-4 rounded-lg mb-4 items-center border border-gray-300"
          >
            <div className="w-32 h-32">
              <QRCode value={qrCode.originalUrl} size={128} />
            </div>
            <div className="ml-4">
              <p className="text-blue-500 hover:underline">
                <a
                  href={qrCode.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate block max-w-xs"
                  title={qrCode.originalUrl}
                >
                  {qrCode.originalUrl}
                </a>
              </p>
              <p className="text-gray-600 mt-2">
                Created At:{" "}
                {qrCode.createdAt
                  ? qrCode.createdAt.toDate().toISOString().split("T")[0]
                  : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-violet-500 text-white rounded-l-md "
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {Math.ceil(qrCodes.length / ITEMS_PER_PAGE)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * ITEMS_PER_PAGE >= qrCodes.length}
          className="px-4 py-2 bg-violet-500 text-white rounded-r-md "
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default QRCodeTable;
