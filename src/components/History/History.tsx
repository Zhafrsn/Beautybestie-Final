import React from "react";
import "../../styles/History.css";

const History: React.FC = () => {
  return (
    <div className="History-Container">
        <div className="History-Title">
          <h1>History</h1>
          <p>You can see your previous order here!</p>
       </div>
       <hr />
       <div className="History-Isi">
        <div className="History-Isi-Products">
          <div className="History-Isi-Products-1">
            <div className="History-Product-Wrapper">
             <img src="images/FaceWash6.png" alt="img" />
              <div className="History-Products-1-Detail">
                <h4 className="History-Products-1-Name">Bright Stuff Face Toner</h4>
                <p className="History-Products-Category">Face Wash</p>
                <p className="History-Products-Total"> X2 </p>
                </div>
              </div>
            <div className="History-Products-Price">
              <h4>IDR 19.000</h4>
            </div>
          </div>
          <div className="History-Isi-Products-2">
            <div className="History-Product-Wrapper">
            <img src="images/FaceWash6.png" alt="img" />
            <div className="History-Products-2-Detail">
             <h4 className="History-Products-2-Name">Magic Colour Lip Serum</h4>
             <p className="History-Products-Category">Lip Care</p>
             <p className="History-Products-Total"> X1 </p>
             </div>
            </div>
            <div className="History-Products-Price">
              <h4>IDR 53.500</h4>
            </div>
          </div>
        </div>
        <hr />
        <div className="History-Isi-Amount">
          <h4>Amount: </h4>
          <h4>IDR 72.500</h4>
        </div>
        <div className="History-Isi-Button">
          <button className="History-Rate">Rate</button>
          <button className="History-CP">Chat</button>
          <button className="History-CP">Purchase</button>
        </div>
      </div>
    </div>
 );
};
export default History;
