import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";

import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import NotFound from "../../pages/not-found";
import { getUserByUserId } from "../../services/firebase";
import userFixture from "../../fixtures/logged-in-user";

jest.mock("../../services/firebase");

describe("<NotFound />", () => {

    it("renders the not found page with logged in user", async () => {
        await act(async () => {

            await getUserByUserId.mockImplementation(() => [userFixture]);

            const { queryByText, debug } = render(
                <Router>
                    <FirebaseContext.Provider value={{}}>
                        <UserContext.Provider value={{ user: { uid: 1 } }}>
                            <NotFound />
                        </UserContext.Provider>
                    </FirebaseContext.Provider>
                </Router>
            );

            //debug();

            await waitFor(() => {
                //debug();
                expect(queryByText("Login")).toBeFalsy();
                expect(queryByText("Not Found!")).toBeTruthy();
            });
        });
    });

    /* it("renders the not found page with anonymous user", async () => {
        await act(async () => {

            await getUserByUserId.mockImplementation(() => []);

            const { queryByText, debug } = render(
                <Router>
                    <FirebaseContext.Provider value={{}}>
                        <UserContext.Provider value={{ user: {} }}>
                            <NotFound />
                        </UserContext.Provider>
                    </FirebaseContext.Provider>
                </Router>
            );

            //debug();

            await waitFor(() => {
                //debug();
                expect(queryByText("Login")).toBeTruthy();
                expect(queryByText("Not Found!")).toBeTruthy();
            });
        });
    }); */
});