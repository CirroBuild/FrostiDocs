import type { PricingPlan } from "../plan"

export const plans: PricingPlan[] = [
  {
    type: "idea",
    title: "Idea",
    price: "Free",
    action: "Get Started",
    url: "/docs/get-started/homebrew/",
    specs: [
      { label: "1", value: "- 1 Member" },
      { label: "2", value: "- Unlimited Updates" },
      { label: "3", value: "- Developer Environment" },
    ],
  },
  {
    type: "beta",
    title: "Beta",
    price: "$1/month",
    action: "Sign Up",
    url: "/enterprise/",
    specs: [
      { label: "0", value: "Everything in Idea plus:" },
      { label: "1", value: "- Built in Security" },
      { label: "2", value: "- Automated CI/CD Pipeline" },
      { label: "3", value: "- Standalone Test Enviornment" },
    ],
    highlighted: true,
  },
  {
    type: "team",
    title: "Team",
    price: "Coming Soon",
    action: "Join Waiting List",
    url: "/enterprise/",
    specs: [
      { label: "0", value: "Everything in Beta plus:" },
      { label: "1", value: "- BCDR" },
      { label: "1", value: "- Up to 5 Members" },
      { label: "2", value: "- Multiple Subscriptions" },
      { label: "2", value: "- Approvals and Governance" },
    ],
  },
  {
    type: "enterprise",
    title: "Enterprise",
    price: "Custom",
    action: "Contact Us",
    url: "/cloud/",
    specs: [
      { label: "0", value: "Everything in Team plus:" },
      { label: "1", value: "- Multiple Clouds" },
      { label: "2", value: "- Zero Trust Security" },
      { label: "3", value: "- Unlimited Members" },
      { label: "4", value: "- Parallel Deployments" },
      { label: "5", value: "- 24x7 Support Inlcuded" },
    ],
  },
]
