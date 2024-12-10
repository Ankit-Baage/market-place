import React, { useMemo } from "react";
import { Carousel } from "../carousel/Carousel";
import { Advertisement } from "../advertisement/Advertisement";

export const Banner = React.memo(({ data }) => {
  const isCarousel = useMemo(() => data?.length > 1, [data]);

  return isCarousel ? (
    <Carousel images={data} />
  ) : (
    <Advertisement image={data} />
  );
});

