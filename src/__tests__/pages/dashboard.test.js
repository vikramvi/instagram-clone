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
                    firestore: jest.fn(() => ({
                        collection: jest.fn(() => ({
                            doc: jest.fn(() => ({
                                update: jest.fn(() => Promise.resolve("User added"))
                            }))
                        }))
                    }))
                };

                const fieldValues = {
                    arrayUnion: jest.fn(),
                    arrayRemove: jest.fn()
                }

                const { getByText, getByTestId, getByTitle, getAllByText, getByAltText } = render(
                    <Router>
                        <FirebaseContext.Provider value={{ firebase, FieldValue: fieldValues }}>
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

                await waitFor(() => {
                    expect(document.title).toEqual("Instagram");
                    expect(getByTitle("Sign Out")).toBeTruthy();
                    expect(getAllByText("raphael")).toBeTruthy();
                    expect(getByAltText("Instagram")).toBeTruthy();
                    expect(getByAltText("karl profile")).toBeTruthy();
                    expect(getAllByText("Saint George and the Dragon")).toBeTruthy();
                    expect(getByText("Suggestions for you")).toBeTruthy();

                    fireEvent.click(getByText("follow"));

                    fireEvent.click(getByTestId("like-photo-siWZDSB7IhihVBVE3cj9"));

                    fireEvent.click(getByTestId("focus-input-H9NsQq2PIidbMjvgvoyj"));
                    fireEvent.change(getByTestId("add-comment-H9NsQq2PIidbMjvgvoyj"), {
                        target: { value: "Wonderbar" }
                    })
                    fireEvent.submit(getByTestId("add-comment-submit-H9NsQq2PIidbMjvgvoyj"));

                    //coverage for event.preventDefault() 
                    fireEvent.change(getByTestId("add-comment-H9NsQq2PIidbMjvgvoyj"), {
                        target: { value: "" }
                    })
                    fireEvent.submit(getByTestId("add-comment-submit-H9NsQq2PIidbMjvgvoyj"));
                });
            });
        });

    it("renders the dashboard with a user profile of undefined", async () => {
        await act(async () => {
            getPhotos.mockImplementation(() => photosFixture);
            getSuggestedProfiles.mockImplementation(() => suggestedProfilesFixture);
            useUser.mockImplementation(() => ({ user: undefined }));

            const firebase = {
                firestore: jest.fn(() => ({
                    collection: jest.fn(() => ({
                        doc: jest.fn(() => ({
                            update: jest.fn(() => Promise.resolve({}))
                        }))
                    }))
                }))
            };


            const { getByText, queryByText } = render(
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

            expect(getByText("Login")).toBeTruthy();
            expect(getByText("Sign Up")).toBeTruthy();
            expect(queryByText("Suggestions for you")).toBeFalsy();
        });
    });
});