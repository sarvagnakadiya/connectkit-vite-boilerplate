// FunctionGenerator.jsx
import React, { useState } from "react";
import dummy_abi from "../artifacts/dummy.json";
import { encodeFunctionData } from "viem";

const FunctionGenerator = () => {
  const [functionName, setFunctionName] = useState("");
  const [params, setParams] = useState([]);
  const [paramInput, setParamInput] = useState("");

  const handleAddParam = () => {
    setParams([...params, paramInput]);
    setParamInput("");
  };

  const handleGenerate = () => {
    const bytesData = encodeFunctionData({
      abi: dummy_abi.abi,
      functionName: functionName,
      args: params, // Assuming your args are JSON parseable
    });
    console.log(bytesData);
  };

  return (
    <div
      id="generateBytes"
      className="min-h-screen flex items-center justify-center bg-black text-white"
    >
      <div className="text-center">
        <div className="mb-4">
          <input
            type="text"
            className="bg-gray-800 p-2 rounded-md text-white"
            placeholder="Function Name"
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="bg-gray-800 p-2 rounded-md text-white mr-2"
            placeholder="Function Param"
            value={paramInput}
            onChange={(e) => setParamInput(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            className="bg-green-500 px-4 py-2 rounded-md"
            onClick={handleGenerate}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunctionGenerator;
