import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sheltersFetch } from "../../../../AxiosFetchs/EntityReduxFetchs/SheltersFetch";
import user_image from "../../../../assets/Icons/ user.jpg";
import { Link } from "react-router-dom";
import "../shelters/shelters.scss";
import Loading from "../../../loading/Loading";
import { useState } from "react";
import { Pagination } from "antd";
import { SHELTER_FILTER_OPTIONS } from "../filter/filterOptions";

const Shelters = () => {
  let dispatch = useDispatch();
  const array = useSelector((state) => state.shelters.sheltersArray);
  let isArrayLoading = useSelector((state) => state.shelters.isLoading);
  let totalShelters = useSelector((state) => state.shelters.totalShelters);
  let arrayError = useSelector((state) => state.shelters.error);
  const [shelterFilterOptions, setShelterFilterOptions] = useState(SHELTER_FILTER_OPTIONS);

  const onChange = (page, pagesize) => {
    setShelterFilterOptions((p) => ({ ...p, pageNumber: page, pageSize: pagesize }));
    window.scrollTo(0, 1);
  };

  useEffect(() => {
    dispatch(sheltersFetch(shelterFilterOptions));
  }, [shelterFilterOptions]);




  if (isArrayLoading) {
    return <Loading />;
  }

  if (arrayError) {
    return <h1>ERROR</h1>;
  }
  return (
    <div style={{width:"100%"}}>
      <div className="users-cont">
        {array?.map((shelter, index) => (
          <Link
            key={index}
            to={`/shelterInfo/${shelter.id}`}
            state={{ shelter }}
          >
            <div className="user-self" key={index}>
              <div className="user-img-cont">
                <img
                  src={
                    (shelter.shelterImageUrl && shelter.shelterImageUrl) ||
                    user_image
                  }
                  alt="user_image"
                />
              </div>
              <div className="users-info-cont">
                <div className="user-fullname">
                  <p>{shelter.shelterName}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!isArrayLoading && (
        <Pagination
          total={totalShelters}
          defaultPageSize={shelterFilterOptions.pageSize}
          defaultCurrent={1}
          current={shelterFilterOptions.pageNumber}
          onChange={onChange}
          showTotal={(total) => `Total ${total} pets`}
          align="center"
          showSizeChanger
          showQuickJumper
        />
      )}
    </div>
  );
};

export default Shelters;
