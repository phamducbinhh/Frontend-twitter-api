"use client";
import Image from "next/image";
import React, { useState } from "react";

interface CustomImageProps {
  src: string;
  width: number;
  height: number;
  quality?: number;
  priority?: boolean;
  alt: string;
  loading?: "eager" | "lazy";
  darkMode?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  width,
  height,
  priority = false,
  quality = 80,
  loading,
  alt,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleOnLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    if (target.complete) {
      setIsLoading(false);
    }
  };

  const handleOnError = () => {
    setIsLoading(true);
  };

  return (
    <>
      <Image
        src={src}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        onLoad={handleOnLoad}
        onError={handleOnError}
        style={{ objectFit: "cover" }}
        loading={loading}
        alt={alt}
      />
    </>
  );
};

export default CustomImage;
