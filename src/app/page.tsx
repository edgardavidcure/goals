import Image from "next/image";
import Head from "next/head";
import clientPromise from "./lib/mongodb";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getConnection = (async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}) 

export default async function Page() {
  const isConnected = await getConnection()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Home Page</p>
      {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
            for instructions.
          </h2>
        )}
    </main>
  );
}
