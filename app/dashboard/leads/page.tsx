import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  return (
    <div className="p-5 w-full">
      <h1 className="text-xl font-semibold mb-4">Leads</h1>
      <div className="flex flex-wrap gap-2 mb-4 w-full ">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[400px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[500px] rounded-xl" />
          <div className="space-y-2">
              <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
