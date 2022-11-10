type Spec = {
  cpu: number
  ram: number
  storage: number
  prices: {
    [key in RegionKey]?: number
  }
}

export type RegionKey =
  | "eu-west-1"
  | "us-east-2"
  | "us-west-2"
  | "ap-south-1"
  | "eu-central-1"

export type Region = {
  label: string
  specs: Array<Omit<Spec, "prices"> & { price: number }>
}

const labels: { [key in RegionKey]: string } = {
  "us-east-2": "Ohio",
  "us-west-2": "Oregon",
  "eu-west-1": "Ireland",
  "ap-south-1": "Mumbai",
  "eu-central-1": "Frankfurt",
}

const specs: Spec[] = [
  {
    cpu: 2,
    ram: 8,
    storage: 25,
    prices: {
      "us-east-2": 0.366,
      "us-west-2": 0.366,
      "eu-west-1": 0.408,
    },
  },
  {
    cpu: 2,
    ram: 8,
    storage: 100,
    prices: {
      "us-east-2": 0.431,
      "us-west-2": 0.431,
      "eu-west-1": 0.479,
    },
  },
  {
    cpu: 4,
    ram: 16,
    storage: 50,
    prices: {
      "us-east-2": 0.686,
      "us-west-2": 0.686,
      "eu-west-1": 0.768,
    },
  },
  {
    cpu: 4,
    ram: 16,
    storage: 100,
    prices: {
      "us-east-2": 0.727,
      "us-west-2": 0.727,
      "eu-west-1": 0.813,
    },
  },
  {
    cpu: 8,
    ram: 32,
    storage: 100,
    prices: {
      "us-east-2": 1.049,
      "us-west-2": 1.049,
      "eu-west-1": 1.168,
    },
  },
  {
    cpu: 8,
    ram: 32,
    storage: 250,
    prices: {
      "us-east-2": 1.169,
      "us-west-2": 1.169,
      "eu-west-1": 1.301,
    },
  },
  {
    cpu: 16,
    ram: 64,
    storage: 100,
    prices: {
      "us-east-2": 1.893,
      "us-west-2": 1.893,
      "eu-west-1": 2.108,
    },
  },
  {
    cpu: 16,
    ram: 64,
    storage: 250,
    prices: {
      "us-east-2": 2.005,
      "us-west-2": 2.005,
      "eu-west-1": 2.232,
    },
  },
  {
    cpu: 32,
    ram: 128,
    storage: 250,
    prices: {
      "us-east-2": 3.812,
      "us-west-2": 3.812,
      "eu-west-1": 4.246,
    },
  },
  {
    cpu: 32,
    ram: 128,
    storage: 500,
    prices: {
      "us-east-2": 3.989,
      "us-west-2": 3.989,
      "eu-west-1": 4.441,
    },
  },
]

export const regions = Object.fromEntries(
  Object.entries(labels).map(([region, label]) => [
    region,
    {
      label: `${label} (${region})`,
      disabled: ["ap-south-1", "eu-central-1"].includes(region),
      specs: specs.map(({ cpu, ram, storage, prices }) => ({
        cpu,
        ram,
        storage,
        price: prices[region],
      })),
    },
  ]),
)
