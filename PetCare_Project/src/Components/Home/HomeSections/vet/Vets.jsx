import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { VetsFetch } from "../../../../AxiosFetchs/EntityReduxFetchs/VetsFetch";
import user_image from "../../../../assets/Icons/ user.jpg";
import "../vet/vets.scss";
import Loading from "../../../loading/Loading";
import { VET_FILTER_OPTIONS } from "../filter/filterOptions";
import { Pagination } from "antd";

const Vets = () => {
  let dispatch = useDispatch();
  let array = useSelector((state) => state.vets.vetsArray);
  let isArrayLoading = useSelector((state) => state.vets.isLoading);
  let totalVets = useSelector((state) => state.vets.totalVets);
  let arrayError = useSelector((state) => state.vets.error);
  const [vetFilterOptions, setVetFilterOptions] = useState(VET_FILTER_OPTIONS);


  const onChange = (page, pagesize) => {
    setVetFilterOptions((p) => ({ ...p, pageNumber: page, pageSize: pagesize }));
    window.scrollTo(0, 1);
  };

  useEffect(() => {
    dispatch(VetsFetch(vetFilterOptions));
  }, [vetFilterOptions]);

  if (isArrayLoading) {
    return <Loading />;
  }

  if (arrayError) {
    return <h1>ERROR</h1>;
  }

  return (
    <div style={{ width: "100%" }}>
      <div className="users-cont">
        {array &&
          array.map((vet, index) => (
            <Link key={index} to={`/Vetinfo/${vet.id}`} state={{ vet }}>
              <div className="user-self" key={index}>
                <div className="user-img-cont">
                  <img
                    src={
                      (vet.profileImageUrl && vet.profileImageUrl) || user_image
                    }
                    alt="user_image"
                  />
                </div>
                <div className="users-info-cont">
                  <div className="user-fullname">
                    <p>{vet.firstname + " " + vet.lastname}</p>
                  </div>
                  <div className="user-email">
                    <p>{vet.email}</p>
                  </div>
                  <div className="user-phone">
                    <p>{vet.createdTime}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {!isArrayLoading && (
        <Pagination
          total={totalVets}
          defaultPageSize={vetFilterOptions.pageSize}
          defaultCurrent={1}
          current={vetFilterOptions.pageNumber}
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

export default Vets;
