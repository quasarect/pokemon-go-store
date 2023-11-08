import React, { useState } from "react";
import "./ShopAccountDetail.css";
import RedButton from "../RedButton/RedButton";
import { assetIdApi } from "../../context/api";
import userData from "../../hooks/userData";
import { useParams } from "react-router-dom";

const ShopAccountDetail = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = userData(assetIdApi(id), "GET");

  const [showPrivateDetails, setShowPrivateDetails] = useState(false);

  if (data === null) {
    return <div className="shop-account-detail">...Loading</div>;
  }

  const renderAttribute = (attribute, value) => (
    <div className="sh-text-style">
      <span className="sh-d">
        {attribute.replace(/_/g, " ").charAt(0).toUpperCase() +
          attribute.replace(/_/g, " ").slice(1)}
      </span>{" "}
      : {value}
    </div>
  );

  const displayAttributes = showPrivateDetails ? data.private : data.info;

  return (
    <div className="shop-account-detail">
      {Object.entries(displayAttributes).map(([attribute, value]) =>
        renderAttribute(attribute, value)
      )}

      <div className="sh-btn">
        {data.private && (
          <div className="sh-text-style">
            <button
              className="view-private-details-button"
              onClick={() => setShowPrivateDetails(!showPrivateDetails)}
            >
              {showPrivateDetails
                ? "Hide Private Details"
                : "View Private Details"}
            </button>
          </div>
        )}
        {!data.private && (
          <RedButton
            text={"BUY NOW"}
            type={"buyAsset"}
            credit={data.price}
            id={data._id}
          />
        )}
      </div>
    </div>
  );
};

export default ShopAccountDetail;
