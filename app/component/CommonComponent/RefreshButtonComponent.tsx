import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import React from "react";

interface Props {
    onRefrehBtnHandler: () => void
}

function RefreshButtonComponent(props: Readonly<Props>) {
  const {onRefrehBtnHandler} = props;

  return (
    <Button variant="outline" size="icon" onClick={onRefrehBtnHandler}>
      <RefreshCwIcon className="h-4 w-4" />
    </Button>
  );
}

export default RefreshButtonComponent;
