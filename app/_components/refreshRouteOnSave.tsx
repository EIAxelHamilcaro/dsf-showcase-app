"use client";
import { RefreshRouteOnSave as Refresh } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation.js";
import type React from "react";

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter();

  return (
    <Refresh
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}
    />
  );
};
