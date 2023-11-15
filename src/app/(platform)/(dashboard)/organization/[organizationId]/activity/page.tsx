import { Suspense } from "react";

import { Separator } from "@/components/ui";

import { Info } from "../_components";

import { ActivityList } from "./_components";

const ActivityPage = async () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;