import type { PricingPlan } from "../plan"

export const plans: PricingPlan[] = [
  {
    type: "idea",
    title: "Idea",
    price: "Free",
    specs: [
      { label: "1", value: "- Use of dev env" },
      { label: "2", value: "- Built in security" },
    ],
  },
  {
    type: "beta",
    title: "Beta",
    price: "$1/month",
    specs: [
      { label: "1", value: "- Automated CI/CD pipeline" },
      { label: "2", value: "- Standalone test envs" },
    ],
    highlighted: true,
  },
  {
    type: "team",
    title: "Team",
    price: "Coming Soon",
    specs: [
      { label: "1", value: "- Up to 10 members" },
      { label: "2", value: "- Multiple subscriptions" },
      { label: "1", value: "- BCDR prod envs" },
      { label: "2", value: "- Governance" },
    ],
  },
  {
    type: "enterprise",
    title: "Enterprise",
    price: "Custom",
    specs: [
      { label: "1", value: "- Zero Trust" },
    ],
  },
]
