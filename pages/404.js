import Link from "next/link";

export default function Custom404() {
    return (
      <div className="text-center flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-6xl font-bold">Oops...</h1>
        <p className="mt-4 text-base lg:text-2xl">Looks like you got lost in the cloud!</p>
        <p className="mt-2 text-gray-600 text-sm">
          The page you're looking for doesn't seem to exist.
        </p>
        <Link href="/">
          <p className="mt-6 px-4 py-2 text-white bg-blue-300 rounded-lg hover:bg-blue-500">
            Go back home
          </p>
        </Link>
      </div>
    );
}
