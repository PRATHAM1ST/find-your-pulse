"use client";

import { Dispatch, SetStateAction } from "react";

import { useMediaQuery } from "@uidotdev/usehooks";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

import { IsDragOffBoundary } from "@/types/app";

type Props = {
  id: string; // Assuming 'walletAddress' or unique identifier is a string
  data: UserInfo; // The data type based on your user structure
  setCardDrivenProps: Dispatch<
    SetStateAction<{
      cardWrapperX: number;
      buttonScaleBadAnswer: number;
      buttonScaleGoodAnswer: number;
    }>
  >;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  isDragging: boolean;
  setIsDragOffBoundary: Dispatch<SetStateAction<IsDragOffBoundary>>;
  setDirection: Dispatch<SetStateAction<"left" | "right" | "">>;
};

const UserCard = ({
  id,
  data,
  setCardDrivenProps,
  setIsDragging,
  isDragging,
  setIsDragOffBoundary,
  setDirection,
}: Props) => {
  const x = useMotionValue(0);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const offsetBoundary = 50;

  // Motion transforms
  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-200, 0, 200];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];
  const outputActionScaleLeft = [3, 1, 0.3];
  const outputActionScaleRight = [0.3, 1, 3];

  const drivenX = useTransform(x, inputX, outputX);
  const drivenY = useTransform(x, inputX, outputY);
  const drivenRotation = useTransform(x, inputX, outputRotate);
  const drivenScaleLeft = useTransform(x, inputX, outputActionScaleLeft);
  const drivenScaleRight = useTransform(x, inputX, outputActionScaleRight);

  useMotionValueEvent(x, "change", (latest) => {
    //eslint-disable-next-line
    setCardDrivenProps((state: any) => ({
      ...state,
      cardWrapperX: latest,
      buttonScaleBadAnswer: drivenScaleLeft,
      buttonScaleGoodAnswer: drivenScaleRight,
    }));
  });

  return (
    <>
      <motion.div
        id={`cardContent-${id}`}
        className="pointer-events-none absolute aspect-[100/150] w-full select-none rounded-lg bg-white p-2 shadow-card"
        style={{
          x: drivenX,
          y: drivenY,
          rotate: drivenRotation,
        }}
      >
        <img
          src={data.picturesUrl[0]} // Adjust path based on image structure
          alt="User"
          className={
            "aspect-square h-auto w-auto rounded-lg object-cover transition-opacity duration-500"
          }
        />
        <div className="relative mx-auto mt-2 grid w-full grid-flow-col gap-2">
          {data.picturesUrl.slice(1).map((url) => (
            <img
              key={id + url + Math.random()}
              src={url} // Adjust path based on image structure
              alt="User"
              className={
                "aspect-square h-auto w-auto rounded-lg object-cover transition-opacity duration-500"
              }
            />
          ))}
        </div>
        <div className="flex w-full flex-col items-baseline justify-between gap-2">
          <h1 className="text-[24px] font-bold">{data.name}</h1>
          <p className="text-[16px]">{data.bio}</p>
        </div>

        {/* Add relevant data fields */}
      </motion.div>
      <motion.div
        id={`cardDriverWrapper-${id}`}
        className={`absolute aspect-[100/150] w-full ${
          !isDragging ? "hover:cursor-grab" : ""
        }`}
        drag="x"
        dragSnapToOrigin
        dragElastic={isMobile ? 0.2 : 0.06}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        onDrag={(_, info) => {
          const offset = info.offset.x;

          if (offset < 0 && offset < offsetBoundary * -1) {
            setIsDragOffBoundary("left");
          } else if (offset > 0 && offset > offsetBoundary) {
            setIsDragOffBoundary("right");
          } else {
            setIsDragOffBoundary(null);
          }
        }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        onDragEnd={(_, info) => {
          setIsDragging(false);
          setIsDragOffBoundary(null);
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
          const direction = info.offset.x > 0 ? "right" : "left";

          if (isOffBoundary) {
            setDirection(direction);
          }
        }}
        style={{ x }}
      ></motion.div>
    </>
  );
};

export default UserCard;
