import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";

import Dashboard from "../../pages/dashboard";
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";
import LoggedInUserContext from "../../context/logged-in-user";
import { getPhotos, getSuggestedProfiles } from "../../services/firebase";
import useUser from "../../hooks/use-user";

import userFixture from "../../fixtures/logged-in-user";
import photosFixture from "../../fixtures/timeline-photos";
import suggestedProfilesFixture from "../../fixtures/suggested-profiles";

jest.mock("../../services/firebase");
jest.mock("../../hooks/use-user");


describe("<Dashboard/>", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the dashboard with a user profile and follows a user from the suggested profile sidebar",
        async () => {
            await act(async () => {
                getPhotos.mockImplementation(() => photosFixture);
                getSuggestedProfiles.mockImplementation(() => suggestedProfilesFixture);
                useUser.mockImplementation(() => ({ user: userFixture }));

                const firebase = {
                    firebase: jest.fn(() => ({
                        collection: jest.fn(() => ({
                            doc: jest.fn(() => ({
                                update: jest.fn(() => Promise.resolve("User added"))
                            }))
                        }))
                    }))
                };

                const { getByText } = render(
                    <Router>
                        <FirebaseContext.Provider value={{ firebase }}>
                            <UserContext.Provider
                                value={{ user: { uid: "BKBRWdiULzS3fDtSMnG9raHrFNo2", displayName: "karl" } }}>
                                <LoggedInUserContext.Provider
                                    value={{ user: userFixture }}>
                                    <Dashboard
                                        user={{ uid: "BKBRWdiULzS3fDtSMnG9raHrFNo2", displayName: "karl" }}
                                    />
                                </LoggedInUserContext.Provider>
                            </UserContext.Provider>
                        </FirebaseContext.Provider>
                    </Router>
                );
            });
        });
});