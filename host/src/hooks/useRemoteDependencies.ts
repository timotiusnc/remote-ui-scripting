import Head from "next/head";
import React, { useEffect } from "react";
import * as NivoCore from "@nivo/core";
import { ResponsiveRadar } from "@nivo/radar";

export const useRemoteDependencies = () => {
  useEffect(() => {
    window["React"] = React;
    window["NextHead"] = Head;
    window["NivoCore"] = NivoCore;
    window["NivoRadar"] = { ResponsiveRadar };
  }, []);
};
