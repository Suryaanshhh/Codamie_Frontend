export const LoveCard = () => {
    return <>
        <Card fileName="Love.js" importStatement='import heart from "Me"'
            comment1={"// Use const only"}
            comment2={"// As love is constant"}
            codeLine1={"const Love = You ;"}
            codeLine2={"heart.push(Love);"}
            codeLine3={"heart.push(Affection);"}
            codeLine4={"heart.push(care);"}
            returnLine={"return heart ;"}
        />
        <Card fileName="Us.js" importStatement='import bond from "Heart"'
            comment1={"// Defined once only"}
            comment2={"// As we are one"}
            codeLine1={"const Us = You + Me;"}
            codeLine2={"bond.push(Us);"}
            codeLine3={"bond.push(Memories);"}
            codeLine4={"bond.push(Moments);"}
            returnLine={"return bond;"}
        />
        <Card fileName="Together.js" importStatement='import time from "Life"'
            comment1={"// Loop runs always"}
            comment2={"// As love never ends"}
            codeLine1={"const Together = Forever;"}
            codeLine2={"time.push(Together);"}
            codeLine3={"time.push(Laughter);"}
            codeLine4={"time.push(Happiness);"}
            returnLine={"return time;"}
        />
        <Card fileName="Soul.js" importStatement='import destiny from "Fate"'
            comment1={"// Matched once only"}
            comment2={"// As we belong"}
            codeLine1={"const Soul = You & Me;"}
            codeLine2={"destiny.push(Soul);"}
            codeLine3={"destiny.push(Heartbeat);"}
            codeLine4={"destiny.push(Energy);"}
            returnLine={"return destiny;"}
        />
    </>
}

function Card({ fileName, importStatement, comment1, comment2, codeLine1, codeLine2, codeLine3, codeLine4, returnLine }) {
    return <div className="bg-white-300 h-[300px] w-[250px] rounded-2xl flex m-auto mb-16 shadow-2xl mt-10">
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


