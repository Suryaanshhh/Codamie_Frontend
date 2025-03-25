export const LoveCard=({fileName,importStatement,comment1,comment2,codeLine1,codeLine2,codeLine3,codeLine4,returnLine})=>{
  return  <div className="bg-white-300 h-[300px] w-[250px] rounded-2xl flex m-auto mb-16 shadow-2xl">
               <div className="flex flex-col m-2">
               <div className="font-bold text-pink-600">
                    {fileName}
                </div>
                <div className="font-semibold mt-2">
                    {importStatement}
                </div>
                <div className="font-semibold mt-2">
                 {comment1}
                </div>
                <div className="font-semibold mt-2">
                 {comment2}
                </div>
                <div className="font-semibold mt-2">
                 {codeLine1}
                </div>
                <div className="font-semibold mt-2">
                 {codeLine2}
                </div>
                <div className="font-semibold mt-2">
                 {codeLine3}
                </div>
                <div className="font-semibold mt-2">
                 {codeLine4}
                </div>
                <div className="font-semibold mt-2">
                 {returnLine}
                </div>
               </div>
        </div>
}