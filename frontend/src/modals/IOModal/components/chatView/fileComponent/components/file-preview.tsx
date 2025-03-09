// import { useState } from "react";
// import IconComponent, {
//   ForwardedIconComponent,
// } from "../../../../../../components/common/genericIconComponent";
// import { Skeleton } from "../../../../../../components/ui/skeleton";
// import formatFileName from "../utils/format-file-name";

// const supImgFiles = ["png", "jpg", "jpeg", "gif", "bmp", "webp", "image"];

// export default function FilePreview({
//   error,
//   file,
//   loading,
//   onDelete,
// }: {
//   loading: boolean;
//   file: File;
//   error: boolean;
//   onDelete: () => void;
// }) {
//   const fileType = file.type.toLowerCase();
//   const isImage = supImgFiles.some((type) => fileType.includes(type));

//   return (
//     <div className="group relative pb-2">
//       {loading ? (
//         isImage ? (
//           <div className="flex h-20 w-20 items-center justify-center   border border-ring bg-silver">
//             {/* <svg
//               aria-hidden="true"
//               className={`h-10 w-10 animate-spin fill-black   `}
//               viewBox="0 0 100 101"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                 fill="currentColor"
//               />
//               <path
//                 d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                 fill="currentFill"
//               />
//             </svg> */}
//             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M15.24 8.46944H14.475V9.40843H15.24V14.1158H16V1.87793H15.24V8.46944Z" fill="#000001"/>
//               <path d="M15.24 14.1157H14.475V15.0609H15.24V14.1157Z" fill="#000001"/>
//               <path d="M15.24 0.938965H14.475V1.87796H15.24V0.938965Z" fill="#000001"/>
//               <path d="M14.475 5.64624H13.715V6.58524H14.475V5.64624Z" fill="#000001"/>
//               <path d="M6.86002 15.0609V14.1157H5.33502V15.0609H1.52502V15.9999H14.475V15.0609H6.86002Z" fill="#000001"/>
//               <path d="M12.955 8.46951H12.19V7.53052H9.90499V8.46951H9.145V9.40851H7.62V10.3537H9.145V11.2927H9.90499V12.2317H11.43V11.2927H12.955V10.3537H14.475V9.40851H12.955V8.46951Z" fill="#000001"/>
//               <path d="M13.715 6.58545H12.955V7.53062H13.715V6.58545Z" fill="#000001"/>
//               <path d="M11.43 4.70117H10.67V6.58534H11.43V4.70117Z" fill="#000001"/>
//               <path d="M9.905 12.2317H8.38V13.1769H9.905V12.2317Z" fill="#000001"/>
//               <path d="M9.14501 6.58545H8.38V7.53062H9.14501V6.58545Z" fill="#000001"/>
//               <path d="M8.38 5.64624H7.62V6.58524H8.38V5.64624Z" fill="#000001"/>
//               <path d="M8.37999 13.1768H6.85999V14.1158H8.37999V13.1768Z" fill="#000001"/>
//               <path d="M7.61997 8.46948H6.09497V9.40848H7.61997V8.46948Z" fill="#000001"/>
//               <path d="M6.095 7.53052H3.81V8.46951H6.095V7.53052Z" fill="#000001"/>
//               <path d="M3.81003 8.46948H2.28503V9.40848H3.81003V8.46948Z" fill="#000001"/>
//               <path d="M14.475 0H1.52502V0.938996H14.475V0Z" fill="#000001"/>
//               <path d="M2.28502 9.40845H1.52502V10.3536H2.28502V9.40845Z" fill="#000001"/>
//               <path d="M1.52501 14.1157H0.765015V15.0609H1.52501V14.1157Z" fill="#000001"/>
//               <path d="M1.52501 0.938965H0.765015V1.87796H1.52501V0.938965Z" fill="#000001"/>
//               <path d="M0.765 11.2926H1.525V10.3536H0.765V1.87793H0V14.1158H0.765V11.2926Z" fill="#000001"/>
//             </svg>

//           </div>
//         ) : (
//           <div
//             className={`relative ${
//               isImage ? "h-20 w-20" : "h-20 w-80"
//             } cursor-wait   border border-ring bg-silver transition duration-300`}
//           >
//             <div className="ml-3 flex h-full w-full items-center gap-2 text-sm">
//               <Skeleton className="h-10 w-10  " />
//               <div className="flex flex-col gap-1">
//                 <Skeleton className="h-3 w-48" />
//                 <Skeleton className="h-3 w-10" />
//               </div>
//             </div>
//           </div>
//         )
//       ) : error ? (
//         <div>Error...</div>
//       ) : (
//         <div
//           className={`relative mt-2 ${
//             isImage ? "h-20 w-32" : "h-20 w-32"
//           } cursor-pointer   border border-border bg-silver transition duration-300`}
//         >
//           {isImage ? (
//             <img
//               src={URL.createObjectURL(file)}
//               alt="file"
//               className="block h-full w-full   border border-border"
//             />
//           ) : (
//             <div className="ml-3 flex h-full w-full items-center gap-2 text-sm">
//               <ForwardedIconComponent name="File" className="h-8 w-8" />
//               <div className="flex flex-col">
//                 <span className="font-bold">{formatFileName(file.name)}</span>
//                 <span>File</span>
//               </div>
//             </div>
//           )}
//           <div
//             className={`absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center opacity-100 transition-opacity`}
//           >
//             <div
//               className="group flex h-7 w-7 cursor-pointer items-center justify-center     p-2 transition-all hover:bg-input"
//               onClick={onDelete}
//             >
//               <IconComponent
//                 name="X"
//                 className="h-4 w-4 stroke-muted-foreground stroke-2 group-hover:stroke-primary"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import formatFileName from "../utils/format-file-name";

export default function FilePreview({
  file,
  onDelete,
}: {
  file: File;
  onDelete: () => void;
}) {
  const fileName = formatFileName(file.name);

  return (
    <div className="relative mt-px flex flex-col items-center">
      <div className="relative flex px-3 py-1 items-center justify-center bg-silver shadow-button">
        <span className="text-center text-sm font-bold text-black truncate">
          {fileName}
        </span>
        {/* Delete button */}
        <div
          className="absolute -top-2 -right-2 flex h-5 w-5 cursor-pointer items-center justify-center bg-light-gray"
          onClick={onDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
