import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";

import * as ROUTES from '../../constants/routes';
import Profile from "../../pages/profile";
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";
import LoggedInUserContext from "../../context/logged-in-user";
import { getPhotos, getSuggestedProfiles, getUserByUsername, getUserPhotosByUsername } from "../../services/firebase";
import useUser from "../../hooks/use-user";

import userFixture from "../../fixtures/logged-in-user";
import photosFixture from "../../fixtures/timeline-photos";
import suggestedProfilesFixture from "../../fixtures/suggested-profiles";
import profileThatIsFollowedByTheLoggedInUser from "../../fixtures/profile-followed-by-logged-in-user";
import profileThatIsNotFollowedByTheLoggedInUser from "../../fixtures/profile-not-followed-by-logged-in-user";


const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ username: "orwell" }),
    useHistory: () => ({
        push: mockHistoryPush
    })
}))

jest.mock("../../services/firebase");
jest.mock("../../hooks/use-user");


describe("<Profile />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("render the profile page with a user profile", async () => {
        await act(async () => {
            getUserByUsername.mockImplementation(() => [userFixture]);
            getUserPhotosByUsername.mockImplementation(() => photosFixture);
            useUser.mockImplementation(() => ({ user: userFixture }));

            const { getByText, getByTitle } = render(
                <Router>
                    {/* <FirebaseContext.Provider value={{
                        auth: jest.fn(() => ({
                            signOut: jest.fn(() => Promise.resolve({}))
                        }))
                    }}> */}
                    <FirebaseContext.Provider
                        value={{
                            firebase: {
                                auth: jest.fn(() => ({
                                    signOut: jest.fn(() => ({
                                        updateProfile: jest.fn(() => Promise.resolve({}))
                                    }))
                                }))
                            }
                        }}
                    >
                        <UserContext.Provider
                            value={{ user: { uid: "BKBRWdiULzS3fDtSMnG9raHrFNo2", displayName: "karl" } }}>
                            <Profile />
                        </UserContext.Provider>
                    </FirebaseContext.Provider>
                </Router>
            );

            await waitFor(() => {
                expect(mockHistoryPush).not.toHaveBeenCalled();
                expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.NOT_FOUND);
                expect(getUserByUsername).toHaveBeenCalledWith("orwell");
                expect(getByTitle("Sign Out")).toBeTruthy();
                expect(getByText("karl")).toBeTruthy();
                expect(getByText("Karl Hadwen")).toBeTruthy();

                fireEvent.click(getByTitle("Sign Out"));
            }

            )
        })
    })
})