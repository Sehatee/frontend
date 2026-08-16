import Link from "next/link";

const NotFoundCom = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-4">
      <h1 className="text-main text-[8rem] font-bold drop-shadow-lg animate-float">404</h1>

      <h2 className=" text-3xl md:text-4xl font-semibold mb-4">
        Oops! Page Not Found
      </h2>

      <p className="text-textSecondary text-center max-w-lg mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        href={"/"}
        className="btn-primary animate-pop"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundCom;
