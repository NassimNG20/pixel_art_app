import { useKeyPressWithCtrl } from "@/hooks/useUndoRedo";
import { ActionsTypes } from "@/store/actions/actions";

type mainPageEventsTypes = { methods: ActionsTypes["methods"] };
export const mainPageEvents = (props: mainPageEventsTypes) => {
  const { methods } = props;

  useKeyPressWithCtrl({
    key: "z",
    ifCtrl: true,
    method: () => methods.setHistoryIndex(-1),
  });
  useKeyPressWithCtrl({
    key: "y",
    ifCtrl: true,
    method: () => methods.setHistoryIndex(1),
  });
};
