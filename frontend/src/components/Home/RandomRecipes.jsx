import React from "react";
import CachedIcon from "@mui/icons-material/Cached";

import CardRandom from "./CardRandom";

function RandomRecipes({ dataRandom, handleRandom }) {
  return (
    <div>
      <div className="flex items-center mb-3">
        <h2 className="inline-block bg-customGreen rounded-[10rem] text-white py-2 px-4  text-xl shadow-sm">
          Random Food
        </h2>
        <button onClick={handleRandom} type="button" className="py-2 px-4">
          <CachedIcon fontSize="large" />
        </button>
      </div>

      <div className="flex overflow-scroll min-h-[165px] md:overflow-y-hidden">
        {dataRandom.map((item) => (
          <CardRandom item={item} />
        ))}
      </div>
    </div>
  );
}

export default RandomRecipes;
