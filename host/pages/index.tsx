import type { NextPage } from "next";
import { FallbackProps, withErrorBoundary } from "react-error-boundary";
import Head from "next/head";
import Image from "next/image";
import { useRemoteComp } from "../src/hooks/useRemoteComp";
import styles from "../styles/Home.module.css";
import { useRemoteDependencies } from "../src/hooks/useRemoteDependencies";

const Home: NextPage = () => {
  useRemoteDependencies();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Remote UI-Scripting</h1>
        <p>
          <em>
            Dynamically Import Independently-Deployed UI-Components from URLs
          </em>
        </p>
        <div className={styles.footer} style={{ width: "100%" }} />

        <RemoteComponentWithErrorBoundary componentId="Foo" />
        <RemoteComponentWithErrorBoundary componentId="Bar" />

        <div style={{ height: "500px", width: "500px" }}>
          <RemoteComponentWithErrorBoundary componentId="Radar" />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/timotiusnc/remote-ui-scripting"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            width="15"
            height="15"
          >
            <path
              fill="currentColor"
              d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
            ></path>
            <polygon
              fill="currentColor"
              points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
            ></polygon>
          </svg>
        </a>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  return (
    <>
      <div>Something went wrong:</div>
      <em>{error.message}</em>
    </>
  );
};

const RemoteComponentPicker = ({ componentId }: { componentId: string }) => {
  const RemoteComponent = useRemoteComp(componentId);
  if (!RemoteComponent.loading) {
    return <RemoteComponent.comp.default payload={{ data: radarData }} />;
  }

  return <div>Loading component {componentId}</div>;
};

const RemoteComponentWithErrorBoundary = withErrorBoundary(
  RemoteComponentPicker,
  {
    FallbackComponent: ErrorFallback,
  }
);

export const radarData = [
  {
    taste: "fruity",
    chardonay: 101,
    carmenere: 65,
    syrah: 29,
  },
  {
    taste: "bitter",
    chardonay: 36,
    carmenere: 113,
    syrah: 116,
  },
  {
    taste: "heavy",
    chardonay: 40,
    carmenere: 57,
    syrah: 92,
  },
  {
    taste: "strong",
    chardonay: 58,
    carmenere: 116,
    syrah: 118,
  },
  {
    taste: "sunny",
    chardonay: 56,
    carmenere: 79,
    syrah: 77,
  },
];

export default Home;
