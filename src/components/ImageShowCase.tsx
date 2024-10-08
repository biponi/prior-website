"use client";

import Image from "next/image";
import type { FC } from "react";
import React, { useState } from "react";

import LikeButton from "./LikeButton";

interface ImageShowCaseProps {
  shots: string[];
}

const ImageShowCase: FC<ImageShowCaseProps> = ({ shots }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className='space-y-3 rounded-2xl border border-neutral-300 p-2'>
      <div className='relative overflow-hidden rounded-2xl h-[350px] md:h-[520px]'>
        <LikeButton className='absolute right-5 top-5' />
        <Image
          src={shots[activeImageIndex]}
          alt='shoe image'
          fill
          quality={100}
          className='h-full w-full object-fill object-center'
        />
      </div>
      {shots.length > 1 && (
        <div className='grid grid-cols-4 gap-3'>
          {!!shots &&
            shots.map((shot, index) => (
              <div
                key={index}
                className={`${
                  activeImageIndex === index ? "border-2 border-primary" : ""
                } h-[100px] overflow-hidden rounded-lg`}>
                <button
                  className='h-full w-full'
                  type='button'
                  onClick={() => setActiveImageIndex(index)}>
                  <Image
                    src={shot}
                    width={100}
                    height={100}
                    alt='shoe image'
                    className='h-full w-full object-cover object-center'
                  />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ImageShowCase;
