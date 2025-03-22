import "./style.css";
import { getEl } from "./utils";
import Toast from "./Toast";

const toast = new Toast({
  closable: true
});

getEl("#successBtn").addEventListener("click", handleSuccessBtnClick);
getEl("#errorBtn").addEventListener("click", handleErrorBtnClick);

function handleSuccessBtnClick(e) {
  toast.success("Spawned a success toast");
}

function handleErrorBtnClick(e) {
  toast.error("Spawned an error toast");
}
