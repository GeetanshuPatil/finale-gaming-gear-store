import { Link } from "react-router-dom";
import {
  Gamepad2,
  ArrowLeft,
  Sparkles,
  Construction,
} from "lucide-react";

const ComingSoon = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="relative inline-flex mb-8">
          <div
            className="absolute inset-0 bg-green-500/20 rounded-2xl blur-xl animate-pulse"
          />

          <div
            className="relative flex items-center justify-center
                       w-20 h-20 rounded-2xl
                       bg-gray-900 dark:bg-gray-900
                       border border-gray-700
                       shadow-xl"
          >
            <Gamepad2
              className="w-10 h-10 text-green-500"
              strokeWidth={1.7}
            />

            <Sparkles
              className="absolute -top-3 -right-3 w-6 h-6 text-green-400
                         animate-pulse"
            />
          </div>
        </div>

        {/* Small Label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Construction className="w-4 h-4 text-green-500" />

          <span
            className="text-xs md:text-sm font-semibold uppercase
                       tracking-[0.25em] text-green-500"
          >
            Under Construction
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl
                     font-bold tracking-tight
                     text-gray-900 dark:text-white"
        >
          Coming{" "}
          <span className="text-green-500">
            Soon
          </span>
        </h1>

        {/* Description */}
        <p
          className="mt-6 max-w-xl mx-auto
                     text-sm sm:text-base md:text-lg
                     leading-relaxed
                     text-gray-600 dark:text-gray-400"
        >
          We're working on something awesome for your gaming setup.
          This section of{" "}
          <span className="font-semibold text-gray-900 dark:text-gray-200">
            GearZone
          </span>{" "}
          isn't ready just yet.
        </p>

        {/* Loading indicator */}
        <div className="mt-10 max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              Building experience
            </span>

            <span className="text-xs font-semibold text-green-500">
              75%
            </span>
          </div>

          <div className="h-2 rounded-full bg-gray-300 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full w-[75%] rounded-full
                         bg-green-500
                         shadow-[0_0_12px_rgba(34,197,94,0.5)]"
            />
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce" />
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>

        {/* Back Home */}
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2
                       px-6 py-3
                       rounded-xl
                       bg-green-600
                       text-white
                       font-medium
                       shadow-md
                       transition-all duration-200
                       hover:bg-green-500
                       hover:shadow-lg
                       hover:-translate-y-0.5
                       active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Bottom branding */}
        <p className="mt-12 text-xs text-gray-500">
          Gear
          <span className="text-green-500 font-semibold">
            Zone
          </span>
          {" "}· Gaming Gear Store
        </p>
      </div>
    </section>
  );
};

export default ComingSoon;