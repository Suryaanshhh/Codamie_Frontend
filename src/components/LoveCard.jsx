export const LoveCard=({fileName,comment1,comment2,codeLine1,codeLine2,codeLine3,codeLine4,returnLine})=>{
  return  <div className="bg-white-300 h-[300px] w-[250px] rounded-2xl flex m-auto mb-16 shadow-2xl">
               <div className="flex flex-col m-2">
               <div className="font-bold text-pink-600">
                    Love.js
                </div>
                <div className="font-semibold mt-2">
                    import heart from "ME"
                </div>
                <div className="font-semibold mt-2">
                 // Always use const.
                </div>
                <div className="font-semibold mt-2">
                 // Because Love is constant.
                </div>
                <div className="font-semibold mt-2">
                 const Love = "You" ;
                </div>
                <div className="font-semibold mt-2">
                 heart.push(Love);
                </div>
                <div className="font-semibold mt-2">
                 heart.push(Affection);
                </div>
                <div className="font-semibold mt-2">
                 heart.push(care);
                </div>
                <div className="font-semibold mt-2">
                 return heart ;
                </div>
               </div>
        </div>
}