import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, waitFor, getAllByPlaceholderText } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Login from "../../pages/login";
import FirebaseContext from "../../context/firebase";
import * as ROUTES from "../../constants/routes";

//mock the data
//don't hit server for testing purpose

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockHistoryPush
    })
})
);

describe('<Login />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("renders the login page with a form submission and logs the user in", async () => {
        const succeedToLogin = jest.fn(() => Promise.resolve("I am signed in!"));

        const firebase = {
            auth: jest.fn(() => ({
                signInWithEmailAndPassword: succeedToLogin
            }))
        }

        const { getByTestId, getByPlaceholderText, queryByTestId } = render(
            <Router>
                <FirebaseContext.Provider value={{ firebase }}>
                    <Login />
                </FirebaseContext.Provider>
            </Router>
        );

        await act(async () => {
            expect(document.title).toEqual("Login - Instagram");

            await fireEvent.change(getByPlaceholderText("Email address"), {
                target: { value: "karl@gmail.com" }
            });

            await fireEvent.change(getByPlaceholderText("Password"), {
                target: { value: "test123" }
            });

            fireEvent.submit(getByTestId("login"));

            expect(succeedToLogin).toHaveBeenCalled();
            expect(succeedToLogin).toHaveBeenCalledWith("karl@gmail.com", "test123");

            await waitFor(() => {
                expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
                expect(getByPlaceholderText("Email address").value).toBe("karl@gmail.com");
                expect(getByPlaceholderText("Password").value).toBe("test123");
                expect(queryByTestId("error")).toBeFalsy();
            })


        })

    });


    it("renders the login page with a form submission and fails to login the user", async () => {
        const failedToLogin = jest.fn(() => Promise.reject(new Error("Can not sign in")));

        const firebase = {
            auth: jest.fn(() => ({
                signInWithEmailAndPassword: failedToLogin
            }))
        }

        const { getByTestId, getByPlaceholderText, queryByTestId } = render(
            <Router>
                <FirebaseContext.Provider value={{ firebase }}>
                    <Login />
                </FirebaseContext.Provider>
            </Router>
        );

        await act(async () => {
            expect(document.title).toEqual("Login - Instagram");

            await fireEvent.change(getByPlaceholderText("Email address"), {
                target: { value: "karl.com" }
            });

            await fireEvent.change(getByPlaceholderText("Password"), {
                target: { value: "test123" }
            });

            fireEvent.submit(getByTestId("login"));

            expect(failedToLogin).toHaveBeenCalled();
            expect(failedToLogin).toHaveBeenCalledWith("karl.com", "test123");

            await waitFor(() => {
                expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
                expect(getByPlaceholderText("Email address").value).toBe("");
                expect(getByPlaceholderText("Password").value).toBe("");
                expect(queryByTestId("error")).toBeTruthy();
            })


        })

    });
});