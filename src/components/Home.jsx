// src/Home.jsx
import React, { useEffect, useState } from "react";
import { getContract, getWalletClient } from "@wagmi/core";
import { usePublicClient } from "wagmi";
import abi from "../artifacts/MultiSigWallet.json";
import dummy_abi from "../artifacts/dummy.json";
import { createWalletClient, custom, encodeFunctionData } from "viem";
import { modeTestnet } from "viem/chains";
import { useAccount } from "wagmi";

const Home = () => {
  const { address, isConnected } = useAccount();
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState("");
  const [indexConfirm, setIndexConfirm] = useState("");
  const [indexExecute, setIndexExecute] = useState("");
  const [getIndex, setGetIndex] = useState("");
  const [contract, setContract] = useState(null);
  const publicClient = usePublicClient();
 

  const handleTransactionSubmit = async () => {
    try {
      const client = createWalletClient({
        chain: modeTestnet,
        transport: custom(window.ethereum),
      });
      const { request } = await publicClient.simulateContract({
        address: "0x125328D415Ef139Af95810746D64C11B43F45Bb7", // calling multiSig
        abi: abi.abi,
        functionName: "submitTransaction",
        args: [to, value, data],
        account: address,
      });
      await client.writeContract(request);
      console.log("Transaction Submitted");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="Home"
      className="min-h-screen flex items-center justify-center bg-black text-white"
    >
      <div className="text-center mt-20">
        <div className="bg-backgroundTint p-4 md:p-8 m-8 rounded-lg shadow-lg  md:w-96">
          <p
            className="text-center  mb-4 text-gray-500"
            style={{ fontSize: "12px" }}
          >
            MultiSig wallet address:<br></br>
            0x125328D415Ef139Af95810746D64C11B43F45Bb7
          </p>
          <h2 className="text-2xl font-bold text-center mb-4 text-purple-300">
            Submit transaction
          </h2>
          <div className="mb-4">
            <input
              type="text"
              className="bg-backgroundTint mt-1 p-2 border rounded-md w-full text-white
              hover:border-mainColor focus:border-mainColor focus:outline-none"
              placeholder="To (destination contract address)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="bg-backgroundTint mt-1 p-2 border rounded-md w-full text-white
              hover:border-mainColor focus:border-mainColor focus:outline-none"
              placeholder="Value (wei) ( '0' if no value to send)"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="bg-backgroundTint mt-1 p-2 border rounded-md w-full text-white
              hover:border-mainColor focus:border-mainColor focus:outline-none"
              placeholder="function encoded (bytes)"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <p className="text-center mb-4 text-gray-500">
              Submits a new transaction for approval by the wallet owners *will
              cost gas*
            </p>
            <button
              className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
              onClick={handleTransactionSubmit}
            >
              Submit Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
