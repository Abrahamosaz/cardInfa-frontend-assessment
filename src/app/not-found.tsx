import Image from "next/image";
import Link from "next/link";
import NotFoundImage from "@/public/icons/404.svg";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Image */}
        <div className="mb-8 select-none">
          <Image
            src={NotFoundImage}
            alt="404 Illustration"
            width={400}
            height={400}
            priority
            className="w-full h-auto"
          />
        </div>

        {/* Text Content */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#014DAF] hover:bg-[#013D8F] transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
