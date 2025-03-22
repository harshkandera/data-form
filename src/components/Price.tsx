
import { CheckIcon } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";

const tiers = [
  {
    name: "Free",
    id: "tier-hobby",
    href: "#",
    priceMonthly: "$0",
    description:
      "Forever",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
  },
  {
    name: "Pro",
    id: "tier-team",
    href: "#",
    priceMonthly: "$19",
    description:
      "per month",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
    ],
  },
  {
    name: "Enterprise",
    id: "tier-company",
    href: "#",
    priceMonthly: "Custom",
    description:
      "Custom , contact us for pricing",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
    ],
  },
];

export default function FUIPricingWithSpecialTwo() {
  return (
    <div className="isolate relative overflow-hidden bg-transparent ">

      <div className="absolute -z-1 inset-0  h-full w-full bg-transparent opacity-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-lg font-semibold leading-7 text-richblue-100 ">
            Pricing
          </h2>
          <p className="mt-2 text-3xl  font-bold mb-4  tracking-wide  tex-center flex justify-center flex-col bg-clip-text bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] text-transparent  mx-auto md:text-5xl">
            The right price for you,{" "}
            <br className="hidden sm:inline lg:hidden" />
            whoever you are
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-gradient text-xl">
          Choose the perfect plan for your needs. No hidden fees.

          </p>
          <svg
            viewBox="0 0 1208 1024"
            className="absolute opacity-70 -top-10 left-1/2 -z-8 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse
              cx={604}
              cy={512}
              fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)"
              rx={604}
              ry={512}
            />
        
          </svg>
        </div>
      </div>
      <div className="flow-root z-20 bg-transparent pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-7xl lg:grid-cols-3">
              {tiers.map((tier,index) => (
                <MagicCard key={tier.id}>
  <div
                  className={`flex z-10 flex-col justify-between rounded-xl bg-transparent/10 p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] `}
                >
                  <div>
                    <h3
                      id={tier.id}
                      className="text-base font-semibold leading-7 text-richblue-100"
                    >
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-100">
                        {tier.priceMonthly}
                      </span>
                      <span className="text-base font-semibold leading-7 text-gray-200">
                        /month
                      </span>
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-200">
                      {tier.description}
                    </p>
                    <ul
                      role="list"
                      className="mt-10 space-y-4 text-sm leading-6 text-gray-200"
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            className="h-6 w-5 flex-none text-pink-600/90"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={`mt-8 ${index ===1 && 'bg-richblue-100 hover:bg-richblue-100/90'} block border-2 border-richblue-100 rounded-md   px-3.5 py-3 text-center text-lg font-regular leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600/90`}
                  >
                    Get started today
                  </a>
                  {index == 1 && <BorderBeam size={250} duration={12} delay={9}/>
                }
                </div>
                
                </MagicCard>
              
              ))}
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

            