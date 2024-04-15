"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Slider,
  useDisclosure,
} from "@nextui-org/react";
import { ChangeEvent, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

export default function BannerPictureInput({
  setValue,
  errors,
}: {
  setValue: any;
  errors: any;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<any>(null);
  const [scale, setScale] = useState<number>(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleFileOpen = () => {
    if (inputFileRef) {
      inputFileRef.current!.click();
    }
  };

  const handleFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0];
    if (file) {
      if (file.size <= 3000000) {
        setFile(file);
        onOpen();
      } else {
        setValue(
          "image",
          { size: file.size, type: file.type },
          {
            shouldValidate: true,
          }
        );
      }
    }
  };

  const handleFileSave = () => {
    if (editorRef) {
      editorRef?.current?.getImageScaledToCanvas().toBlob((blob: any) => {
        setPreview(URL.createObjectURL(blob));
        setValue("bannerPicture", blob, {
          shouldValidate: true,
        });
      });
    }
  };

  return (
    <>
      <div
        className={`${
          errors.image ? "bg-[#310413]" : "bg-[#27272a]"
        } w-full p-4 rounded-lg`}
      >
        <p
          className={`text-sm ${
            errors.image ? "text-[#f31260]" : "text-[hsl(240,5%,65%)]"
          }`}
        >
          Banner Picture
        </p>
        <div className="flex items-center justify-between my-4">
          {preview ? (
            <img className="h-20 w-60 object-cover rounded-lg" src={preview} />
          ) : (
            <div className="h-20 w-60 bg-rich-black/50 rounded-lg" />
          )}
          {preview ? (
            <Button color="danger" size="sm" onClick={() => setPreview("")}>
              Delete
            </Button>
          ) : (
            <Button color="secondary" size="sm" onClick={handleFileOpen}>
              Upload
            </Button>
          )}
        </div>
        <input
          ref={inputFileRef}
          accept=".jpg, .avif, .webp, .jpeg, .png"
          type="file"
          className="hidden"
          onChange={handleFileOnChange}
        />
      </div>
      <div className="flex items-start w-full">
        {errors.image && (
          <p className="text-[13px] -mt-3 text-[#f31260]">
            {errors.image.message}
          </p>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Banner Picture</ModalHeader>
              <ModalBody>
                <div className="my-4 flex flex-col items-center justify-center">
                  <AvatarEditor
                    ref={editorRef}
                    image={URL.createObjectURL(file)}
                    width={240}
                    height={80}
                    border={8}
                    color={[255, 255, 255, 0.6]}
                    scale={scale}
                    rotate={0}
                  />
                  <p className="text-xs mt-2">
                    Try drag the image to position you like!
                  </p>
                  <Slider
                    label="Scale"
                    step={0.1}
                    maxValue={2}
                    minValue={1}
                    onChange={(value: any) => setScale(value[0])}
                  />
                </div>
                <div className="flex justify-end my-4">
                  <Button
                    color="success"
                    onClick={() => {
                      handleFileSave();
                      onClose();
                    }}
                  >
                    Save
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
