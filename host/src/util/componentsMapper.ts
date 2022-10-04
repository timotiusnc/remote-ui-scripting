const mapComponents = async (id: string) => {
  const map = await getMap();
  return map[id];
};

const getMap = async () => {
  let COMPONENTS_MAP = LOCAL_COMPONENTS_MAP_JSON;
  const remoteComponentsMap = process.env.NEXT_PUBLIC_COMPONENTS_MAP_JSON;
  if (remoteComponentsMap) {
    const resp = await fetch(remoteComponentsMap);
    if (!resp.ok) {
      const text = await resp.text();
      throw text;
    }
    COMPONENTS_MAP = await resp.json();
  }

  return COMPONENTS_MAP;
};

const LOCAL_COMPONENTS_MAP_JSON: { [key: string]: string } = {
  Foo: "http://localhost:8080/Foo.js",
  Bar: "http://localhost:8080/Bar.js",
  Radar: "http://localhost:8080/Radar.js",
};

export { mapComponents };
