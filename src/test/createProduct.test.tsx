jest.mock("../redux/api/product.api");

import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import CreateProduct from "../components/create-order/create-order";
import { useCreateOrderMutation } from "../redux/api/order.api";
import Store from "../redux/store";

describe("test login", () => {
  const nameFaker = "testNameProduct";
  const priceFaker = 121;
  const imgFaker = "imgTest";

  function renderComponent() {
    return render(
      <Provider store={Store}>
        <CreateProduct />
      </Provider>
    );
  }

  it("name input is work", () => {
    const mutate = jest.fn();

    (useCreateOrderMutation as jest.Mock<any>).mockReturnValue([mutate]);
    renderComponent();
    const name = screen.getByTestId("nameTest");
    expect(name).toHaveAttribute("type", "text");
    fireEvent.change(name, { target: { value: nameFaker } });
    expect(name).toBeInTheDocument();
    expect(name).toHaveValue(nameFaker);
  });

  it("imgProduct input is work", () => {
    const mutate = jest.fn();

    (useCreateOrderMutation as jest.Mock<any>).mockReturnValue([mutate]);
    renderComponent();

    const Gallary = screen.getByTestId("GallaryTest");
    expect(Gallary).toBeInTheDocument();
    fireEvent.click(Gallary);
    const img = screen.getByTestId("imgTest");
    expect(img).toHaveAttribute("type", "file");

    expect(img).toBeInTheDocument();
  });

  it("price input is work and show adn hide password button is work also", () => {
    const mutate = jest.fn();

    (useCreateOrderMutation as jest.Mock<any>).mockReturnValue([mutate]);
    renderComponent();
    const price = screen.getByTestId("priceTest");
    expect(price).toHaveAttribute("type", "number");
    fireEvent.change(price, { target: { value: priceFaker } });
    expect(price).toBeInTheDocument();
    expect(price).toHaveValue(priceFaker);
  });

  it("submit is done", () => {
    const mutate = jest.fn();

    (useCreateOrderMutation as jest.Mock<any>).mockReturnValue([mutate]);

    renderComponent();

    const submit = screen.getByTestId("submitTest");
    expect(submit.innerHTML).toMatch("Create");
    fireEvent.click(submit);
  });
});
