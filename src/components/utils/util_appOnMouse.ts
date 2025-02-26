//
//
//
//
//
//
//
//

import { ActionsTypes } from "@/store/actions";

export const onMouseDown = (settings: {
  event: React.MouseEvent;
  methods: ActionsTypes["methods"];
}) => {
  const { event, methods } = settings;

  if (event.button === 0) {
    methods.setClient("click", { x: event.clientX, y: event.clientY });
  }
};
export const onMouseUp = (_settings: {
  event: React.MouseEvent;
  methods: ActionsTypes["methods"];
}) => {
  // const { methods, event } = settings;
};
