import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sheltersFetch } from '../../../../AxiosFetchs/EntityReduxFetchs/SheltersFetch';
import user_image from "../../../../assets/Icons/ user.jpg";
import { Link } from 'react-router-dom';
import  "../shelters/shelters.scss"


const Shelters = () => {
    let dispatch = useDispatch();
    const array = useSelector((state) => state.shelters.sheltersArray);
    let isArrayLoading = useSelector((state) => state.shelters.isLoading);
    let arrayError = useSelector((state) => state.shelters.error);
    console.log(array);
  
    useEffect(() => {
      dispatch(sheltersFetch());
    }, []);
  
    if (isArrayLoading) {
      return <h1>LOADING</h1>;
    }
  
    if (arrayError) {
      return <h1>ERROR</h1>;
    }
  return (
    <div className="users-cont">
      {
        array.map((shelter,index)=>(
          <div className="user-self" key={index}>
          <div className="user-img-cont">
            <img
              src={(shelter.shelterImageUrl && shelter.shelterImageUrl) || user_image}
              alt="user_image"
            />
          </div>
          <div className="users-info-cont">
            <div className="user-fullname">
              <Link to={`/shelterInfo/${shelter.id}`} state={{ shelter }}>
                <p>{shelter.shelterName}</p>
              </Link>
            </div>
          </div>
        </div>
        ))
      }
    </div>
  )
}

export default Shelters