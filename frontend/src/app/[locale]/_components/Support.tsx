"use client";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

const Support = () => {
  //hooks
  const t = useTranslations("HomePage.Support");

  return (
    <div className="py-[80px] homeSectionSize flex flex-col items-center">
      {/*---Header---*/}
      <div className="homeHeaderFont">{t("header")}</div>
      {/*---Content---*/}
      <div className="text-xl desktop:text-lg mt-10 w-full xl:max-w-[810px]">{t("body")}</div>
    </div>
  );
};

export default Support;
