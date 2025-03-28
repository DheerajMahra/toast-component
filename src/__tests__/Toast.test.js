import "@testing-library/jest-dom";
import { screen, waitFor, within } from "@testing-library/dom";
import { getExampleDom } from "../test-utils";

afterEach(() => {
  document.body.innerHTML = "";
});

test("Display success toast on `Trigger Success Toast` button click", async () => {
  const { user } = getExampleDom();
  await user.click(screen.getByRole("button", { name: /Trigger success toast/i }));
  const successToast = await screen.findByRole("alert", { name: /spawned a success toast/i });

  expect(successToast).toBeInTheDocument();
  expect(successToast).toHaveClass("toast__success");
});

test("Display error toast on `Trigger Error Toast` button click", async () => {
  const { user } = getExampleDom();
  await user.click(screen.getByRole("button", { name: /Trigger error toast/i }));
  const errorToast = await screen.findByRole("alert", { name: /spawned an error toast/i });

  expect(errorToast).toBeInTheDocument();
  expect(errorToast).toHaveClass("toast__error");
});

test("\`n\` toasts appear on \`n\` button clicks", async () => {
  const { user } = getExampleDom();
  const succesBtn = screen.getByRole("button", { name: /Trigger success toast/i });

  for (let i = 0; i < 3; i++) {
    await user.click(succesBtn);
  }

  await waitFor(() => {
    expect(screen.getAllByRole("alert")).toHaveLength(3);
  });
});

test("`x` icon hidden for non-closable toast", async () => {
  const { user } = getExampleDom({ closable: false });
  await user.click(screen.getByRole("button", { name: /Trigger success toast/i }));

  const successToast = await screen.findByRole("alert", { name: /spawned a success toast/i });
  expect(within(successToast).queryByText(/x/i)).not.toBeInTheDocument();
});

test("`x` click closes the Toast", async () => {
  const { user } = getExampleDom();
  await user.click(screen.getByRole("button", { name: /Trigger success toast/i }));

  const successToast = await screen.findByRole("alert", { name: /spawned a success toast/i });
  await user.click(within(successToast).getByText(/x/i));

  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
