import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#2b2929] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2b2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to Dropbox. <br />
            <br />
            Storing everything for you and your business needs. <br />
            All in one place.
          </h1>
          <p>
            Enhance your personal storage with Dropbox, offering a simple and
            efficient way to upload, organize and access files from anywhere.
            Securely store important documents and media and experience the
            convenience of easy file management and sharing in One solution.
          </p>

          <Link
            href="/dashboard"
            className="flex cursor-pointer bg-blue-500 w-fit p-5"
          >
            Try It For Free!
            <ArrowRight className="ml-10" />
          </Link>
        </div>
        <div className="bg-[#1e1919] dark:bg-slate-800 h-full p-10">
          <video
            autoPlay
            loop
            muted
            className="rounded-lg"
          >
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
      <p className="text-center font-light p-2">
        These website is made for information and educational purpose only.
        <br />
        We do not own or affiliate the Dropbox or any of its subsidiaries in any
        form.
        <br />
        Copyright disclaimer under section 107 of the Copyright Act 1976,
        Allowance is made for &quot;fair use&quot; of the video for educational
        purpose
      </p>
    </main>
  );
}
