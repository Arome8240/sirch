import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";

import card from "./contract/card.abi.json";
import IERC from "./contract/ierc.abi.json";

import tshirts from "./t-shirt.png"
import sunglass from "./sunglasses.png"
import snicker from "./snicker.png"
import trouser from "./trouser.png"


import { v4 as uuidv4 } from "uuid";

const ERC20_DECIMALS = 18;

const contractAddress = "0xfB0989319118d16963DC970750f54CC93A38cBFC";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

const links = ['Home', 'About Us', 'Pricing', 'Contact Us']

export default function App() {
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [cUSDContract, setCUSDContract] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [cards, setCards] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [giftAddress, setGiftAddress] = useState("");

  const celoConnect = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
        console.log(user_address);
        const cUSDContract = new kit.web3.eth.Contract(
          IERC,
          cUSDContractAddress
        );
        setCUSDContract(cUSDContract);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error");
    }
  };

  const getBalance = useCallback(async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

      const contract = new kit.web3.eth.Contract(card, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);

  /*const buyCard = async (_index) => {
    const amount = price;
    console.log(amount);
    const prices = new BigNumber(price * 3).shiftedBy(ERC20_DECIMALS).toString();
    try {
      await cUSDContract.methods
        .approve(contractAddress, prices)
        .send({ from: address });
      //await contract.methods.buyProduct(_index).send({ from: address });
    } catch (error) {
      console.log(error);
    }
  };*/

  useEffect(() => {
    celoConnect();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
    } else {
      console.log("no kit");
    }
  }, [kit, address]);

  return (
    <div className="App">
      <header className="flex items-center justify-between py-7 lg:px-desktop mx-auto sticky top-0 bg-white/80">
        
        <a className="cursor-pointer" href="/">
          <h1 className="font-bold text-2xl">SHOP.<span className="text-green-300">PRO</span></h1>
        </a>

        <ul className="md:flex hidden items-center space-x-14">
          {
            links.map(item => {
              return (
                <li className="group cursor-pointer"><a className="font-medium group-hover:text-green-300 transition-all duration-300">{item}</a></li>
              )
            })
          }
        </ul>

        <div className="space-x-8 hidden lg:block">
          <a
           className="border cursor-pointer border-green-300 py-3 px-7 rounded-lg text-green-300 font-medium hover:bg-green-300 hover:text-white transition-all"
           to="#"
          >Balance :40 cUSD</a>
        </div>
        <button className="px-7 hover:text-gray-500 md:hidden">
        <svg  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="black">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
      </button>
      </header>
      
      <div className="container">

            <div className="grid grid-cols-1 px-2 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">

                <div className="bg-white rounded-md border-2 px-4 py-4">
                    <img src={tshirts} height="20" alt=""/>
                    <h2 className="tracking-widest text-md mt-2 mb-1">T Shirts</h2>
                    <h1 className="title-font text-lg text-silver mb-3">Price: CUSD25</h1>
                    <button className="mt-3 hover:bg-green-300 hover:text-white text-green-300 text-sm border rounded-md px-10 border-green-300 py-1">Buy</button>
                </div>

                <div className="bg-white rounded-md border-2 px-4 py-4">
                    <img src={sunglass} className="justify-center" alt=""/>
                    <div classsName="mt-50">
                        <h2 className="tracking-widest text-md mt-2 mb-1">Sunglass</h2>
                        <h1 className="title-font text-lg text-silver">Price: CUSD8</h1>
                        <button className="hover:bg-green-300 hover:text-white text-green-300 text-sm border rounded-md px-10 border-green-300 py-1">Buy</button>
                    </div>
                </div>

                <div className="bg-white rounded-md border-2 px-4 py-4">
                    <img src={snicker} alt=""/>
                    <div className="mt-32">
                        <h2 className="tracking-widest text-md mt-2 mb-1">Air Force Snicker</h2>
                        <h1 className="title-font text-lg text-silver mb-3">Price: CUSD30</h1>
                        <button className="hover:bg-green-300 hover:text-white text-green-300 text-sm border rounded-md px-10 border-green-300 py-1">Buy</button>
                    </div>
                </div>

                <div className="bg-white rounded-md border-2 px-4 py-4">
                    <img src={trouser} alt=""/>
                    <div className="mt-20">
                        <h2 className="tracking-widest text-md mt-2 mb-1">Plain Trouser</h2>
                        <h1 className="title-font text-lg text-silver mb-3">Price: CUSD15</h1>
                        <button className="hover:bg-green-300 hover:text-white text-green-300 text-sm border rounded-md px-10 border-green-300 py-1">Buy</button>
                    </div>
                </div>

            </div>

            </div>
    </div>
  );
}
