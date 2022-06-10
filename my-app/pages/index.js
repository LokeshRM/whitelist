import Head from "next/head";
import web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useState, useRef, useEffect } from "react";
import { abi, address } from "../contract";
import Image from "next/image";

export default function Home() {
  const [walletconnected, setWalletConnected] = useState(false);
  const [totalwhitelisted, settotalWhitelisted] = useState("0");
  const [userListed, setuserListed] = useState(false);

  const web3modalRef = useRef();

  const getProvider = async (needSigner = false) => {
    const instance = await web3modalRef.current.connect();
    const provider = new providers.Web3Provider(instance);
    const { chainId } = await provider.getNetwork();
    if (chainId !== 3) {
      window.alert("change to ropsten network");
      throw new Error("change the network");
    }
    if (needSigner) {
      const signer = provider.getSigner();
      return signer;
    }
    return provider;
  };
  const connectWallet = async () => {
    try {
      await getProvider();
      setWalletConnected(true);
      getNoOfwhitelisted();
      getWhitelistStatus();
    } catch (err) {
      console.log(err);
    }
  };

  const getWhitelistStatus = async () => {
    try {
      const provider = await getProvider();
      const contract = new Contract(address, abi, provider);
      const signer = await getProvider(true);
      const addressOfsigner = await signer.getAddress();
      const status = await contract.whiteListAddresses(addressOfsigner);
      setuserListed(status);
    } catch (err) {
      console.log(err);
    }
  };

  const getNoOfwhitelisted = async () => {
    try {
      const provider = await getProvider();
      const contract = new Contract(address, abi, provider);
      const noOfwhitelisted = await contract.whiteListed();
      settotalWhitelisted(noOfwhitelisted.toString());
    } catch (err) {
      console.log(err);
    }
  };

  const addWhitelist = async () => {
    try {
      const signer = await getProvider(true);
      const contract = new Contract(address, abi, signer);
      const tx = await contract.addToWhiteList();
      await tx.wait();
      window.alert("added to white list");
      getNoOfwhitelisted();
      getWhitelistStatus();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!walletconnected) {
      web3modalRef.current = new web3Modal({
        network: "ropsten",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
      setTimeout(() => {
        getNoOfwhitelisted();
      }, 5000);
    }
  }, [walletconnected]);

  const render = () => {
    if (!walletconnected) {
      return (
        <button
          onClick={connectWallet}
          className="px-3 py-4 my-4 text-white font-bold bg-gradient-to-r from-green-400 to-blue-800 hover:from-blue-400 hover:to-green-800 hover:shadow-xl hover:text-zinc-900  rounded shadow-lg shadow-blue-500/40 hover:shadow-indigo-500/40"
        >
          Connect
        </button>
      );
    }
    if (userListed) {
      return (
        <p className="font-mono font-light mt-8">
          {" "}
          you are already in whitelist
        </p>
      );
    } else {
      return (
        <button
          onClick={addWhitelist}
          className="px-3 py-4 my-4 text-white font-bold bg-gradient-to-r from-green-400 to-blue-800 hover:from-blue-400 hover:to-green-800 hover:text-zinc-900 hover:shadow-xl rounded shadow-lg shadow-blue-500/40 hover:shadow-indigo-500/40"
        >
          Join whiteList
        </button>
      );
    }
  };

  return (
    <div className="bg-[#000] h-screen flex flex-col-reverse md:flex-row">
      <Head>
        <title>Whitelist Dapp</title>
        <meta
          name="description"
          content="whitelist for crypto rain nft collection"
        />
      </Head>
      <div className="md:my-40 md:mx-20 mx-auto my-10 text-white">
        <p className="font-serif lg:text-4xl font-light text-3xl mb-6 ">
          Welcome to Crypto Rain
        </p>
        <div className="font-mono font-light">
          <p>Nft Collection for developers in crypto</p>
          <p>{totalwhitelisted}/10 have already whitlisted</p>
        </div>

        {render()}
      </div>

      <div className="md:ml-10 mx-auto md:mt-[100px]">
        <Image src="/home.png" alt="home image" width={666} height={394} />
      </div>
    </div>
  );
}
