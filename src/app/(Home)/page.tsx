import Image from "next/image";
// import { signIn, auth, signOut } from "@/auth";
// import { redirect } from "next/dist/server/api-utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import RetroGrid from "@/components/ui/retro-grid";
import { FeaturesSectionDemo } from "@/src/components/Feature";
import Testimonials from "@/src/components/Testimonials";
import Img1 from "@/public/images/img1.png";
import Img2 from "@/public/images/img2.png";
import Particles from "@/components/ui/particles";
import HowWorks from "@/src/components/HowWoks";
import BoxImage from "@/public/images/box.avif";
import Pattern from "@/public/images/pattern.avif";
import PulsatingButton from "@/components/ui/pulsating-button";
import Price from "@/src/components/Price";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Img3 from "@/public/images/img3.png";
import Img4 from "@/public/images/bgbelow.png";
import { CheckIcon } from "lucide-react";
import Img5 from "@/public/images/realtime.avif";
import FAQ from "@/src/components/Faq";
import Img6 from "@/public/images/background.png";
import Footer from "@/src/components/Footer";
import { BorderBeam } from "@/components/ui/border-beam";
import {MoveRight} from "lucide-react";
export default async function Home() {
  // const session = await auth();
  // console.log(session);
  return (
    <>
      <section className="w-full h-full section px-6 sm:px-8 tracking-wide pt-10">
        <div className=" bg-blue-gradient w-full h-2/3 rounded-b-3xl relative max-w-full mx-auto z-1">
          <RetroGrid className="rounded-b-3xl" />

          <div className="flex flex-col items-center mt-24">
            <h2 className="sm:text-5xl text-4xl tracking-wide font-bold tex-center flex justify-center flex-col bg-clip-text bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] text-transparent  mx-auto md:text-7xl">
              Transform How You{" "}
              <span className="text-transparent bg-clip-text  text-center bg-gradient-to-r from-purple-300 to-orange-200">
                Collect Data
              </span>
            </h2>
            <p className="text-gradient  text-center max-w-prose  text-lg sm:text-xl font-light mt-4 px-8">
              Launch your own custom form page in minutes. Build, collect, and
              analyze data with our intuitive drag-and-drop builder.
            </p>

            <div className="mt-16 flex gap-8 items-center justify-center flex-col md:flex-row">
              <Button
                className="bg-richblue-100 hover:bg-richblue-100/70 text-lg"
                size="lg"
              >
                Get Started for Free
              </Button>
              <div className="text-white font-regular flex text-lg underline cursor-pointer">
                See How it Works <ArrowRight className="ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section max-w-screen ">
        
        <div className="relative w-full h-full flex items-center justify-center  ">
          {/* <div className="absolute -top-4 -left-4 w-96 h-96 bg-purple-600/20 rounded-full blur-xl"></div> */}

          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl  w-[80%]">
            <div className="bg-neutral-800 rounded-xl ">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse opacity-20"></div>
                <div className="relative animate-pulse p-4">
                  <div className="bg-neutral-700 h-24 w-3/4 rounded mb-4"></div>
                  <div className="bg-neutral-700 h-10 w-full rounded mb-2"></div>
                  <div className="bg-neutral-700 h-10 w-5/6 rounded mb-4"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-700 h-80 rounded"></div>
                    <div className="bg-neutral-700 h-80 rounded"></div>
                  </div>
                </div>
                <BorderBeam size={250} duration={12} delay={9}  />

              </div>

            </div>
            
          </div>
          {/* <div className="absolute -bottom-4 right-4 w-80 h-80 bg-blue-600/20 rounded-full blur-xl"></div> */}
        </div>
      </section>

      <section className="section flex-col gap-20">
        <div className="mx-auto flex flex-col justify-center items-center max-w-3xl md:text-center">
          <h2 className=" text-3xl  font-bold mb-4  tracking-wide  tex-center flex justify-center flex-col bg-clip-text bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] text-transparent  mx-auto md:text-5xl">
            Powerful Features for Seamless Data Collection
          </h2>
          <p className="text-gradient text-xl">
            Everything you need to create, manage, and analyze your forms in one
            place.
          </p>
        </div>

        <div>
          <FeaturesSectionDemo />
        </div>
      </section>

      <section className="section flex flex-col mt-48 relative ">
        <div className="flex flex-col w-full">
          <div className="mx-auto flex flex-col justify-center items-center max-w-3xl z-10 md:text-center mb-16">
            <h2 className="text-3xl  font-bold mb-4  tracking-wide  tex-center flex justify-center flex-col bg-clip-text bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] text-transparent  mx-auto md:text-5xl">
              How It Works
            </h2>
            <p className="text-gradient text-xl">
              Get started with three simple steps and transform your data
              collection process
            </p>
          </div>

          <div className="w-full flex justify-center items-center mt-8 absolute -top-48 z-0">
            <div className="absolute z-10 w-full flex top-48 justify-center">
              <Particles />
            </div>

            <div className="relative max-w-7xl w-full flex justify-center ">
              <Image src={Img1} alt="Image1" className="w-full" priority />

              <Image
                src={BoxImage}
                alt="Image1"
                className="w-28 animate-bounce absolute  top-96 "
              />
            </div>
          </div>
        </div>

        <div className="min-h-full z-10 relative top-52">
          <Image
            src={Pattern}
            alt="Image1"
            className="w-32 absolute -bottom-20 left-0 z-0 "
          />

          <HowWorks />
          <div className="flex justify-center items-center mt-10 ">
            <PulsatingButton className="px-14 py-3  items-center text-lg">
              Build Your Form

              <MoveRight className="ml-2 inline w-4 h-4" />
            </PulsatingButton>
          </div>
        </div>
      </section>

      <section className="mt-60 relative">
        <div className="absolute flex justify-center items-center w-full -top-80">
          <Image src={Img2} alt="Image1" className="max-w-4xl" priority />
        </div>
        <BackgroundBeamsWithCollision>
          <Testimonials />
        </BackgroundBeamsWithCollision>
      </section>

      <section className="relative flex flex-col items-center justify-center mt-80">
        <Image
          src={Img3}
          alt="Image3"
          className="max-w-3xl absolute -top-56 z-0"
        />

        <BackgroundBeamsWithCollision className="z-10">
          <Price />
        </BackgroundBeamsWithCollision>
      </section>

      <section className="section relative">
        <Particles className="absolute top-10 z-0 w-screen" />

        <Image
          src={Img4}
          alt="Image1"
          className="max-w-5xl absolute z-0"
          priority={true}
        />

        <Image
          src={Img5}
          alt="Image1"
          className="w-48 absolute animate-bounce top-20 right-48 z-0"
          priority={true}
        />

        <div className="absolute flex flex-col gap-4 justify-center items-center w-full ">
          <div className="section-header-badge">
            <p className="section-header-badge-text">Data Form</p>
          </div>

          <div className="mx-auto flex flex-col mt-10 justify-center items-center max-w-3xl z-10 md:text-center mb-16">
            <h2 className="text-3xl  font-bold mb-4  tracking-wide  tex-center flex justify-center flex-col bg-clip-text bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] text-transparent  mx-auto md:text-5xl">
              Ready to Transform Your Data Collection?
            </h2>
            <p className="text-gradient text-xl max-w-lg">
              Join thousands of businesses already streamlining their data
              collection process. Start your free trial today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <div className="button button-secondary">Get Started for Free</div>
            <p className="section-header-badge-text cursor-pointer">
              Schedule Demo
            </p>
          </div>

          <div className="flex items-center flex-col justify-center gap-8 mt-10 sm:flex-row ">
            <div className="flex items-center gap-2">
              <div className="text-white/80 w-6 h-6 text-sm rounded-full bg-white/10 flex justify-center items-center ">
                <CheckIcon className="w-4" />
              </div>
              <p className="text-white/80 font-ligh text-sm">
                14 day free trial
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-white/80 w-6 h-6 text-sm rounded-full bg-white/10 flex justify-center items-center ">
                <CheckIcon className="w-4" />
              </div>
              <p className="text-white/80 font-ligh text-sm">
                No credit card required
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-white/80 w-6 h-6 text-sm rounded-full bg-white/10 flex justify-center items-center ">
                <CheckIcon className="w-4" />
              </div>
              <p className="text-white/80 font-ligh text-sm">Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section mt-32 flex relative flex-col justify-center items-center">
        <BackgroundBeamsWithCollision>
          <div className="absolute flex justify-center w-full -top-28">
            <Image src={Img6} alt="Image1" className="max-w-4xl" priority />
          </div>
          <FAQ />
        </BackgroundBeamsWithCollision>
      </section>
      <section className="section flex flex-col justify-start">
        <Footer />

      </section>
    </>
  );
}
