"use client";
import { faSpinner, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useRef, useState } from "react";

export const ImageUpload = ({
  name,
  icon,
  defaultValue = "",
}: {
  name: string;
  icon: IconDefinition;
  defaultValue: string;
}) => {
  const [url, seturl] = useState(defaultValue);
  const [isUploading, setisUploading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const input = ev.target as HTMLInputElement;
    if (input && input.files?.length && input.files?.length > 0) {
      setisUploading(true);
      const file = input.files[0];
      const data = new FormData();
      data.set("file", file);
      try {
        const response = await axios.post("/api/upload", data);
        if (response.data.url) {
          seturl(response.data.url);
          setisUploading(false);
          setIsImageLoading(true);
        }
      } catch (error) {}
    }
  };

  const imgLoading = isUploading || isImageLoading;
  return (
    <>
      <div className="bg-gray-100 rounded-md inline-flex content-center justify-center items-center size-24">
        {imgLoading && (
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-gray-400 animate-spin"
          />
        )}
        {!isUploading && url && (
          <Image
            src={url}
            alt={"uploaded image"}
            width={1024}
            height={1024}
            onLoad={() => setIsImageLoading(false)}
            className="w-auto h-auto max-w-24 max-h-24"
            loading="lazy"
          />
        )}
        {!isImageLoading && !url && (
          <FontAwesomeIcon icon={icon} className="text-gray-400" />
        )}
      </div>
      <input type="hidden" value={url} name={name} />
      <div className="mt-2">
        <input
          onChange={handleFileUpload}
          type="file"
          ref={fileInputRef}
          className="hidden"
        />
        <Button
          type="button"
          variant="soft"
          onClick={() => fileInputRef.current?.click()}
        >
          Select File
        </Button>
      </div>
    </>
  );
};
