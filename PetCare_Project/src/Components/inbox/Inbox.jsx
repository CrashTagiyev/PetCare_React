import React from "react";
import { useAuth } from "../../Hooks/useAuth";
import PetCareAPI from "../../APIs/PetCareAPI";
import "../inbox/inbox.scss"


const Inbox = () => {
  const {user}=useAuth();
    
  return (
    <>
    <div>
      <div>
        <h2>Inbox</h2>
      </div>
      <div className="inbox-container">
        <div className="inbox-left-side">
          
        </div>
        <div className="inbox-right-side">

        </div>
      </div>
    </div>

    </>
  );
};

export default Inbox;
