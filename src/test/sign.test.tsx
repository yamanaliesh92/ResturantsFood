jest.mock("../redux/api/user.api");
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Sign from "../components/sign/sign";
import { useCreateUserMutation } from "../redux/api/user.api";
import Store from "../redux/store";

describe("test sign ", () => {
  const setOpen = jest.fn();
  const emailFaker = "email@gamil.com";
  const passwordFaker = "password";
  const usernameFaker = "username";
  const img = "ddssa";

  function renderComponent() {
    return render(
      <Provider store={Store}>
        <Sign setOpen={setOpen} />
      </Provider>
    );
  }

  it("test input password", () => {
    const mutate = jest.fn();
    const isSuccess = true;
    const data = { emailFaker, passwordFaker, usernameFaker, img };

    (useCreateUserMutation as jest.Mock<any>).mockReturnValue([
      mutate,
      { data, isSuccess },
    ]);
    renderComponent();
    const password = screen.getByTestId("passwordTest");
    expect(password).toHaveAttribute("type", "password");
    fireEvent.change(password, { target: { value: passwordFaker } });
    expect(password).toHaveValue(passwordFaker);
    const labelPassword = screen.getByTestId("labelPassword");
    expect(labelPassword.innerHTML).toMatch("Password");
  });

  it("test input username", () => {
    const mutate = jest.fn();
    const isSuccess = true;
    const data = { emailFaker, passwordFaker, usernameFaker, img };

    (useCreateUserMutation as jest.Mock<any>).mockReturnValue([
      mutate,
      { data, isSuccess },
    ]);
    renderComponent();
    const username = screen.getByTestId("usernameTest");
    expect(username).toHaveAttribute("type", "text");
    fireEvent.change(username, { target: { value: usernameFaker } });
    expect(username).toHaveValue(usernameFaker);
    const labelUsername = screen.getByTestId("usernameLabel");
    expect(labelUsername.innerHTML).toMatch("User Name");
  });

  it("show Password button", () => {
    const mutate = jest.fn();
    const isSuccess = true;
    const data = { emailFaker, passwordFaker, usernameFaker, img };

    (useCreateUserMutation as jest.Mock<any>).mockReturnValue([
      mutate,
      { data, isSuccess },
    ]);
    renderComponent();
    const showPassword = screen.getByTestId("showPasswordTest");
    expect(showPassword).toBeInTheDocument();
    const password = screen.getByTestId("passwordTest");
    expect(password).toHaveAttribute("type", "password");
    fireEvent.click(showPassword);
    expect(password).toHaveAttribute("type", "text");
    const hidePassword = screen.getByTestId("hidePasswordTest");
    expect(hidePassword).toBeInTheDocument();
  });

  it("test input email", () => {
    const mutate = jest.fn();
    const isSuccess = true;
    const data = { emailFaker, passwordFaker, usernameFaker, img };

    (useCreateUserMutation as jest.Mock<any>).mockReturnValue([
      mutate,
      { data, isSuccess },
    ]);
    renderComponent();

    const email = screen.getByTestId("emailTest");
    const labelEmail = screen.getByTestId("labelEmail");
    expect(labelEmail.innerHTML).toMatch("Email addres");
    expect(email).toHaveAttribute("type", "email");
    fireEvent.change(email, { target: { value: emailFaker } });
    expect(email).toHaveValue(emailFaker);
  });

  it("test text", () => {
    const mutate = jest.fn();
    const isSuccess = true;
    const data = { emailFaker, passwordFaker, usernameFaker, img };

    (useCreateUserMutation as jest.Mock<any>).mockReturnValue([
      mutate,
      { data, isSuccess },
    ]);
    renderComponent();
    const text = screen.getByText("create a new account");
    expect(text).toBeInTheDocument();
  });

  it("test submit button", () => {
    const mutate = jest.fn();
    const isSuccess = true;
    const data = { emailFaker, passwordFaker, usernameFaker, img };

    (useCreateUserMutation as jest.Mock<any>).mockReturnValue([
      mutate,
      { data, isSuccess },
    ]);

    renderComponent();
    const submit = screen.getByTestId("submitTest");
    expect(submit.innerHTML).toMatch("submit");
    fireEvent.click(submit);
  });
});

export {};
