"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const brokeragesImages = Array.from(
  { length: 16 },
  (_, i) => `/clients/${i + 1}.svg`
);

export const Marqueeline = () => {
  return (
    <Marquee className="py-4">
      {[...brokeragesImages, ...brokeragesImages, ...brokeragesImages].map(
        (item, index) => (
          <Image
            key={item + index}
            src={item}
            width={112}
            height={50}
            alt="logo"
            className="mx-12 w-[112px] h-[50px]"
          />
        )
      )}
    </Marquee>
  );
};
