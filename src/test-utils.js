import userEvent from "@testing-library/user-event";
import Toast from "./Toast";
import { getEl } from "./utils";

export function getExampleDom(config = { closable: true }) {
  document.body.innerHTML = `
    <div id="controller">
      <button id="successBtn">Trigger Success Toast</button>
      <button id="errorBtn">Trigger Error Toast</button>
    </div>
  `;
  /**
   * Test behaves unexpectedly after requiring index file
   * -> First test passes
   * -> Subsequent test fails
   * -> TODO: need to mock style, comment style import from index.js meanwhile.
   */
  //require("./index");

  /** require("../index"); not working correctly, writing js logic manually below*/
  const toast = new Toast(config);

  getEl("#successBtn").addEventListener("click", function handleSuccessBtnClick(e) {
    toast.success("Spawned a success toast");
  });

  getEl("#errorBtn").addEventListener("click", function handleErrorBtnClick(e) {
    toast.error("Spawned an error toast");
  });

  return { user: userEvent.setup() };
}
