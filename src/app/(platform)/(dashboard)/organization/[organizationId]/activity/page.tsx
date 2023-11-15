import { Suspense } from "react";

import { Separator } from "@/components/ui";

import { Info } from "../_components";

import { ActivityList } from "./_components";
import { checkSubscription } from "@/lib/subscription";

const ActivityPage = async () => {
  

  return (
    <div className="w-full">
      <Info isPro={false} />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;