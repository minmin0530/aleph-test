import { useData } from "runtime/react";
import { Head, Link } from "aleph/react";
import{ MongoClient } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
const client = new MongoClient();
await client.connect(
  "mongodb://mongo:password@49.212.141.64:27017/?authSource=bigaru111&readPreference=primary&ssl=false&directConnection=true",
);
interface Post {
  _id: ObjectId;
  auth: string;
  title: string;
  article: string;
  date: string;
}
const externalLinks = [
  ["Get Started", "https://alephjs.org/docs/get-started"],
  ["Docs", "https://alephjs.org/docs"],
  ["Github", "https://github.com/alephjs/aleph.js"],
];

export default function Index() {

  const article = useData(async () => {
    const db = client.database("bigaru111");
    const account = db.collection<Post>("Post");
    return await account.find({ auth: { $ne: null } });


  });



  return (
    <div
      className="w-screen flex flex-col items-center justify-center"
      style={{
        height: "calc(100vh - 2 * 80px)",
      }}
    >
      <Head>
        <title>Aleph.js</title>
        <meta name="description" content="The Fullstack Framework in Deno." />
      </Head>
      <p className="logo">
        <img src="./assets/logo.svg" width="75" height="75" title="Aleph.js" />
      </p>
      <h1 className="text-3xl font-bold mt-2">
        The Fullstack {article.auth}
        1111
      </h1>

      <p className="text-center text-md text-gray-800">
        <strong>Aleph.js</strong> gives you the best developer experience for building web applications<br />{" "}
        with modern toolings.
      </p>
      <div className="flex gap-4 mt-2">
        {externalLinks.map(([text, href]) => (
          <a
            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900"
            href={href}
            target="_blank"
            key={href}
          >
            {text}
            <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 5C13.4477 5 13 4.55228 13 4C13 3.44772 13.4477 3 14 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4L21 10C21 10.5523 20.5523 11 20 11C19.4477 11 19 10.5523 19 10L19 6.41422L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L17.5858 5H14ZM3 7C3 5.89543 3.89543 5 5 5H10C10.5523 5 11 5.44772 11 6C11 6.55228 10.5523 7 10 7H5V19H17V14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V19C19 20.1046 18.1046 21 17 21H5C3.89543 21 3 20.1046 3 19V7Z"
                fill="#aaa"
              />
            </svg>
          </a>
        ))}
      </div>
      <nav className="mt-8">
        <Link
          className="inline-flex items-center justify-center w-60 h-12 border-1 border-gray-300 rounded-full hover:border-gray-400 transition-colors duration-300"
          role="button"
          to="/todos"
        >
          Todos App Demo
        </Link>
      </nav>
    </div>
  );
}
