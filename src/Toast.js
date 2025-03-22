import { getEl, createEl } from "./utils";
import { ID, CLASS } from "./constants";

class Toast {
  constructor(options) {
    this.$toastContainer = createEl("div", { id: ID.TOAST_CONTAINER });
    this.$timeout = options?.timeout ?? 13000;
    this.closable = options?.closable ?? false;
    this.timeoutIds = {};
    this.init();
    this.bindEvents();
  }

  init() {
    getEl("body").append(this.$toastContainer);
  }

  createToast(msg) {
    const dataId = Object.keys(this.timeoutIds).length++;
    const $toast = createEl("div", {
      role: "alert",
      class: CLASS.TOAST,
      "data-id": dataId,
      "aria-label": msg
    });
    $toast.textContent = msg;

    if (this.closable) {
      const $closeIcon = createEl("span", {
        class: CLASS.TOAST_DISMISS,
        "data-close-id": dataId
      });
      $closeIcon.textContent = "x";
      $toast.append($closeIcon);
    }

    this.timeoutIds[dataId] = null;
    return { $toast, dataId };
  }

  removeToast({ $toast, dataId }) {
    const timeoutId = setTimeout(() => {
      this.$toastContainer.removeChild($toast);
      delete this.timeoutIds[dataId];
    }, this.$timeout);

    this.timeoutIds[dataId] = timeoutId;
  }

  bindEvents() {
    this.$toastContainer.addEventListener("click", this.handleToastClick.bind(this));
  }

  handleToastClick(e) {
    const closeToastId = e.target.dataset.closeId;
    if (!closeToastId) return;

    if (this.timeoutIds[closeToastId]) {
      //clearTimeout as toast manually removed by clicking `x`
      clearTimeout(this.timeoutIds[closeToastId]);
      //remove toast from the dom
      const $toast = getEl(`div[data-id="${closeToastId}"]`);
      this.$toastContainer.removeChild($toast);
      //remove timeoutId
      delete this.timeoutIds[closeToastId];
    }
  }

  success(msg) {
    const { $toast, dataId } = this.createToast(msg);
    $toast.classList.add(CLASS.TOAST_SUCCESS);
    this.$toastContainer.append($toast);
    this.removeToast({ $toast, dataId });
  }

  error(msg) {
    const { $toast, dataId } = this.createToast(msg);
    $toast.classList.add(CLASS.TOAST_ERROR);
    this.$toastContainer.append($toast);
    this.removeToast({ $toast, dataId });
  }
}

export default Toast;
