import { useState } from "react";
import {useAddress,useContract} from "@thirdweb-dev/react"
import Image from "next/image"
import Header from "../components/header"
import Footer from "../components/footer";

export default  function Create () {
 

  const {contract:erc721}=useContract("0x03ea4b2F400ef807a4bBBef8E37D4CD72C249aEF","nft-collection")
  const {contract:erc1155}=useContract("0x1ab9044C60530B2D301489ABe7EaE4733bba3e85","edition")
 

  const address=useAddress()
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Name, setName] = useState("");
  const [nfttype, setNfttype] = useState("erc721");
  const [Quantity, setQuantity] = useState(1);
  const [networks,setNetworks]=useState("mumbai")
  
 const [picture, setPicture] = useState({
  preview: "/video-calling.png",
  img: ""
});


 
  
 const metadata_erc1155 = {

  name: Name,
  title: Title,
  description: Description,
  image:picture.img,
  quantity:Quantity  

}

const metadata_erc721 = {

  name: Name,
  title: Title,
  description: Description,
  image:picture.img


}

///minting code

const payloaderc721 = {
  metadata: metadata_erc721,
  to: address,
  quantity:1,
  price: 0
}

const payloaderc1155 = {
  metadata: metadata_erc1155,
  to: address,
  quantity: Quantity,
  price: 0
}


async function ERC1155() {

  const signedPayload = await erc1155?.signature.generate(payloaderc1155);
  const tx = erc1155?.signature.mint(signedPayload);
  //const tx = await contract?.mintTo(address, metadata_erc1155);
  const receipt = tx?.receipt; // the transaction receipt
  const tokenId = tx?.id; // the id of the NFT minted

  //const nft = await tx?.data();
  console.log("Receipt" + receipt + "  " + "tokenid" + tokenId)

}



  //method for erc721
  async function ERC721() {

    const signedPayload = await erc721?.signature.generate(payloaderc721);
    const tx = erc721?.signature.mint(signedPayload);
    //const tx = await contract?.mintTo(address, metadata_erc1155);
    const receipt = tx?.receipt; // the transaction receipt
    const tokenId = tx?.id; // the id of the NFT minted

    //const nft = await tx?.data();
    console.log("Receipt" + receipt + "  " + "tokenid" + tokenId)

  }
  


  
  

  console.log(address)
  return (
    <div className="">
     <Header></Header>
     <title>Mint | Krypt</title>
     <div className="container">
     <div style={{ "background-image": "url('https://nftcollection.xyz/wp-content/uploads/2021/12/nftcollection1-768x404.png') ", "height": "400px", "background-size": "cover" }}>
    <center><span style={{"textAlign" : "center" , "font-size":"40px","background-color" : "white"}}>Mint Your NFT </span></center>
</div>
    <div className="row">

      <div className="col" style={{backgroundColor:""}}>

      <section className="container">
        
        <div className="form-group">
           <center>
           <div className="">



</div>
           </center>
          
       
          <div className="">
            {/* <!-- File Upload --> */}
          <h3 style={{"margin-top" : "10px"}}>Upload and Start Minting your NFT</h3>
            <div className="">
              <label
                htmlFor="item-name"
                className=""
              >
                File Upload<span className="text-red">*</span>
              </label>
              <input
                type="file"
                id="item-file"
                className="form-control"
                placeholder="Item file"
          
                onChange={(e)=>setPicture({...picture,img:e.target.files[0],preview:`${URL.createObjectURL(e.target.files[0])}`})}
                required
              />
            </div>

            {/* <!-- Name --> */}
            <div className="mb-6">
              <label
                htmlFor="item-name"
                className=""
              >
                Name<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="item-name"
                className="form-control"
                placeholder="Item name"
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>

           {/* <!-- Title--> */}
           <div className="mb-6">
              <label
                htmlFor="item-name"
                className=""
              >
                Title<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="item-name"
                className="form-control"
                placeholder="Item title"
                onChange={(e)=>setTitle(e.target.value)}
                required
              />
            </div>
           

            {/* <!-- Description --> */}
            <div className="mb-6">
              <label
                htmlFor="item-description"
                className=""
              >
                Description
              </label>
              
              <textarea
                id="item-description"
                className="form-control"
                rows="4"
                required
                placeholder="Provide a detailed description of your item."
                onChange={(e)=>setDescription(e.target.value)}
              ></textarea>
            </div>

          
    
        

            {/* <!-- Supply --> */}
            <button onClick={()=>setNfttype("erc1155")} className="btn btn-warning"> erc1155 options</button>

            {
            nfttype!=="erc721"?
            <>
            
            <div className="mb-6">
              <label
                htmlFor="item-supply"
                className=""
              >
                Supply
              </label>

              <div className="">
                <p className="">
                 
                </p>
              </div>

              <input
                type="text"
                id="item-supply"
                className="form-control"
                placeholder="1"
                onChange={(e)=>setQuantity(e.target.value)}
              />
              
            <button onClick={()=>setNfttype("erc721")} className="btn btn-danger">close</button>
            <button
            onClick={()=>ERC1155()}
              className="btn btn-primary"
            >
              mint  erc1155
            </button>
            </div>


            
            </>:<></>}
          
           

            {/* <!-- Submit --> */}
            <button
            onClick={()=>ERC721()}
              className="btn btn-primary"
            >
  Mint erc721
            </button>
          </div>
        </div>
      </section>
      {/* <!-- end create --> */}




      </div>

      <div className="col" style={{backgroundColor:"#bfbfbf"}}>
      <div>
        <h3 style={{"margin-top" : "10px" , "color" : "black"}}>NFT Preview</h3>
      </div>
      <Image  src={picture.preview} width={300} height={300}></Image>


      </div>

    </div>




     <Footer></Footer>
    </div>
    </div>
  );
};
