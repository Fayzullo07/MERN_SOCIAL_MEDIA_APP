import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoading = (props) => {
  const { height, count, rodius } = props;
  return (
    <div>
      <Skeleton height={height} count={count} borderRadius={rodius} />
    </div>
  );
};

export default SkeletonLoading;
