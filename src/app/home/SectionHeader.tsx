import Image from "next/image";
import React from "react";

import PromoTag from "@/components/PromoTag";
import { headerSection } from "@/data/content";
import shoe_box from "@/images/banner-02.png";

const SectionHeader = () => {
  return (
    <div className='container flex justify-center items-center  gap-y-5 lg:flex lg:gap-5 lg:gap-y-0'>
      <div className='basis-[100%] items-center space-y-10 rounded-md md:rounded-2xl p-2 md:p-5 md:flex md:space-y-0 bg-white sm:bg-blue-100'>
        <div className='basis-[70%]  md:pl-10'>
          <h4 className='sm:mb-5 text-3xl sm:text-xl text-center sm:text-left font-medium text-primary'>
            {headerSection.title}
          </h4>
          <h1
            className='hidden sm:inline-block text-[55px] font-medium tracking-tight'
            style={{ lineHeight: "1em" }}>
            {headerSection.heading}
          </h1>
          <p className='my-10 w-[80%] hidden md:inline-block  text-sm md:text-[20px] text-neutral-500'>
            {headerSection.description}
          </p>
        </div>
        <div className='hidden md:flex basis-[30%] justify-center'>
          <Image src={shoe_box} alt='shoe box' className=' md:w-[75%]' />
        </div>
      </div>

      {/* <div className='mt-5 basis-[30%] lg:mt-0'>
        <PromoTag />
      </div> */}
    </div>
  );
};

export default SectionHeader;
