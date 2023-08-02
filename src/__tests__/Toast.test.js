import '@testing-library/jest-dom';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/dom';
import { getExampleDom } from '../test-utils';

afterEach(() => {
  document.body.innerHTML = "";
});

test('Display success toast on `Trigger Success Toast` button click', async () => {
  const { user } = getExampleDom();
  user.click(screen.getByRole("button", { name: /Trigger success toast/i }));
  const successToast = await screen.findByRole("alert", { name: /spawned a success toast/i });

  expect(successToast).toBeInTheDocument();
  expect(successToast).toHaveClass('toast__success');
});

test('Display error toast on `Trigger Error Toast` button click', async () => {
  const { user } = getExampleDom();
  user.click(screen.getByRole("button", { name: /Trigger error toast/i }));
  const errorToast = await screen.findByRole("alert", { name: /spawned an error toast/i });

  expect(errorToast).toBeInTheDocument();
  expect(errorToast).toHaveClass('toast__error');
});

test('\`n\` toasts appear on \`n\` button clicks', async () => {
  const { user } = getExampleDom();
  const succesBtn = screen.getByRole("button", { name: /Trigger success toast/i });

  for(let i = 0; i < 3; i++) {
    user.click(succesBtn);
  }
  
  await waitFor(() => {
    expect(screen.getAllByRole("alert")).toHaveLength(3);
    /**
     * Below test also passes unexpectedly ???
     */
    //expect(screen.getAllByRole("alert")).toHaveLength(2);
  });
});


test('`x` icon hidden for non-closable toast', async () => {
  const { user } = getExampleDom({ closable: false });
  user.click(screen.getByRole("button", { name: /Trigger success toast/i }));

  const successToast = await screen.findByRole("alert", { name: /spawned a success toast/i });
  expect(successToast.querySelector('.toast-dismiss')).not.toBeInTheDocument();
});

test('`x` click closes the Toast', async () => {
  const { user } = getExampleDom();
  user.click(screen.getByRole("button", { name: /Trigger success toast/i }));

  const successToast = await screen.findByRole("alert", { name: /spawned a success toast/i });
  user.click(successToast.querySelector('.toast-dismiss'));

  await waitForElementToBeRemoved(() => screen.queryByRole("alert"));
});