"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const brokeragesImages = [
  "/samsung.svg",
  "/apple.svg",
  "/facebook.svg",
  "/quora.svg",
  "/sass.svg",
  "/airbnb.svg",
];

export const Marqueeline = () => {
  return (
    <Marquee className=" py-4 ">
      {[...brokeragesImages, ...brokeragesImages, ...brokeragesImages].map(
        (item) => (
          <Image
            key={item + Math.random()}
            src={item}
            width={item.includes("sass") ? 64 : 112}
            height={50}
            alt="logo"
            className="mx-12"
          />
        )
      )}
    </Marquee>
  );
};
