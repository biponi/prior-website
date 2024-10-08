import React from "react";

import ProductSlider from "@/components/ProductSlider";
import Heading from "@/shared/Heading/Heading";

const SectionBestDeals = () => {
  return (
    <div className='px-2 sm:px-0  sm:container'>
      <Heading
        isCenter
        isMain
        desc={
          "Explore a stunning range of women's shoes and handbags at PriorBD.com . Find the latest styles in footwear and purses to complement your wardrobe"
        }>
        {"Your Ultimate Fashion Destination"}
      </Heading>
      <div className='overflow-hidden rounded-2xl bg-gray p-5'>
        <div className='pb-2'>
          <ProductSlider />
        </div>
      </div>
    </div>
  );
};

export default SectionBestDeals;
