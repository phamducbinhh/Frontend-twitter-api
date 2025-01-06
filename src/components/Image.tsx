"use client";

import { IKImage } from "imagekitio-next";

type ImageType = {
  path: string;
  w?: number;
  h?: number;
  alt: string;
  className?: string;
  tr?: boolean;
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

if (!urlEndpoint) {
  throw new Error("Error: Please add urlEndpoint to .env or .env.local");
}

if (process.env.NODE_ENV === "development") {
  const originalWarn = console.warn;
  console.warn = (message, ...args) => {
    if (
      message.includes(
        "In [imagekitio-next], loading is set to eager when LQIP is used"
      )
    ) {
      return; // Suppress the specific warning
    }
    originalWarn(message, ...args);
  };
}

const Image = ({ path, w, h, alt, className, tr }: ImageType) => {
  return (
    <IKImage
      urlEndpoint={urlEndpoint}
      path={path}
      {...(tr
        ? { transformation: [{ width: `${w}`, height: `${h}` }] }
        : { width: w, height: h })}
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      className={className}
    />
  );
};

export default Image;
