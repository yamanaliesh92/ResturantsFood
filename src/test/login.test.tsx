jest.mock("../redux/api/user.api");

import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Login from "../components/login/login";
import { useLoginUserMutation } from "../redux/api/user.api";
import Store from "../redux/store";

describe("test login", () => {
  const emailFaker = "email@gamil.com";
  const passwordFaker = "password";

  function renderComponent() {
    return render(
      <Provider store={Store}>
        <Login setOpen={jest.fn()} />
      </Provider>
    );
  }

  it("email input is work", () => {
    const mutate = jest.fn();

    (useLoginUserMutation as jest.Mock<any>).mockReturnValue([mutate]);
    renderComponent();
    const email = screen.getByTestId("emailTest");
    expect(email).toHaveAttribute("type", "email");
    fireEvent.change(email, { target: { value: emailFaker } });
    expect(email).toBeInTheDocument();
    expect(email).toHaveValue(emailFaker);
  });

  it("password input is work and show adn hide password button is work also", () => {
    const mutate = jest.fn();

    (useLoginUserMutation as jest.Mock<any>).mockReturnValue([mutate]);
    renderComponent();
    const password = screen.getByTestId("passwordTest");
    expect(password).toHaveAttribute("type", "password");
    fireEvent.change(password, { target: { value: passwordFaker } });
    expect(password).toBeInTheDocument();
    expect(password).toHaveValue(passwordFaker);
    const showPassword = screen.getByTestId("showPasswordTest");
    expect(showPassword).toBeInTheDocument();
    fireEvent.click(showPassword);
    const hidePassword = screen.getByTestId("hidePasswordTest");
    expect(hidePassword).toBeInTheDocument();
    expect(password).toHaveAttribute("type", "text");
  });

  it("submit is done", () => {
    const mutate = jest.fn();
    const data = { emailFaker, passwordFaker };

    (useLoginUserMutation as jest.Mock<any>).mockReturnValue([mutate]);

    renderComponent();

    const submit = screen.getByTestId("submitTest");
    expect(submit.innerHTML).toMatch("Login");
    fireEvent.click(submit);
  });

  it("test text is exist", () => {
    const mutate = jest.fn();

    (useLoginUserMutation as jest.Mock<any>).mockReturnValue([mutate]);
    renderComponent();
    const text = screen.getByText("Login to your account");
    expect(text).toBeInTheDocument();
  });
});
