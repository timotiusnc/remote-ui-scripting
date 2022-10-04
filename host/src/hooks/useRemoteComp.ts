import { useState, useEffect } from "react";
import { mapComponents } from "../util/componentsMapper";

const useRemoteComp = (componentId: string) => {
  const [loading, setLoading] = useState(true);
  const [comp, setComp] = useState<any>();

  useEffect(() => {
    const execute = async () => {
      const url = await mapComponents(componentId);
      await import(/* webpackIgnore: true*/ url);
      const remoteComp: any = window[componentId as any];
      setComp(remoteComp);
      setLoading(false);
    };
    execute();

    return () => {
      // Reset the state after unmount so we don't accidentally use incorrect component
      setLoading(true);
      setComp(undefined);
    };
  }, [componentId]);

  return { comp, loading };
};

/**
 * Sample input: http://localhost:8080/default/dashboards/Default.js
 * Sample output: default/dashboards/Default
 * @param url URL of the remote component
 * @returns Library name to be accessed via global window object
 */
const getCompName = (url: string) => {
  const tokens = url.split("/");
  return tokens.slice(-3).join("/").replace(".js", "");
};

export { useRemoteComp };
