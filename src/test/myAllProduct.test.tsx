jest.mock("../redux/api/product.api");
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { useGetAllOrdersByUserIdQuery } from "../redux/api/order.api";

import Store from "../redux/store";

describe("my all Product test", () => {
  const data = [
    {
      userId: 1,
      id: 1,
      name: "todo 1",
      imgProduct: "dsaa",
      price: 121,
    },
    {
      userId: 1,
      id: 2,
      name: "todo 2",
      imgProduct: "dsaa",
      price: 121,
    },
    {
      userId: 1,
      id: 3,
      name: "todo 3",
      imgProduct: "dsaa",
      price: 121,
    },
  ];

  function renderComponent() {
    return render(<Provider store={Store}>{/* <AllProducts /> */}</Provider>);
  }

  it("test component", async () => {
    (useGetAllOrdersByUserIdQuery as jest.Mock<any>).mockReturnValue({ data });
    renderComponent();
    const todoList = await waitFor(() => screen.findAllByTestId("todo"));

    expect(todoList).toHaveLength(3);
    expect(data[0].name).toEqual("todo 1");
    expect(data[1].price).toEqual(121);
  });
});

export {};
