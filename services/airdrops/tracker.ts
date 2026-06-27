import type { AirdropItem } from "@/services/pipeline/types";

const AIRDROPS: AirdropItem[] = [
  {
    id: "layerzero-ecosystem",
    project: "LayerZero ecosystem",
    category: "Interoperability",
    status: "active",
    action: "Track ecosystem campaigns, bridge history, and official announcements.",
    url: "https://layerzero.network/",
    risk: "medium",
  },
  {
    id: "zksync-ecosystem",
    project: "ZKsync ecosystem",
    category: "Layer 2",
    status: "active",
    action: "Use official ecosystem apps and avoid unofficial claim links.",
    url: "https://zksync.io/",
    risk: "medium",
  },
  {
    id: "starknet-ecosystem",
    project: "Starknet ecosystem",
    category: "Layer 2",
    status: "confirmed",
    action: "Follow governance and ecosystem campaigns from official channels.",
    url: "https://www.starknet.io/",
    risk: "low",
  },
  {
    id: "base-ecosystem",
    project: "Base ecosystem",
    category: "Layer 2",
    status: "rumored",
    action: "Explore official Base apps; no token has been confirmed.",
    url: "https://www.base.org/",
    risk: "high",
  },
];

export async function getAirdrops() {
  return AIRDROPS;
}
