import React from "react";
import { render, mount } from "@testing-library/react";
import Router from "react-router-dom";
import PodcastDetails from "../PodcastDetails";

export const myPodcastDetails = {
    "id": "1535809341",
    "title": "The Joe Rogan Experience",
    "author": "Joe Rogan",
    "image": "https://is5-ssl.mzstatic.com/image/thumb/Podcasts123/v4/7b/7b/7b/7b7b7b7b-7b7b-7b7b-7b7b-7b7b7b7b7b7b/mza_14600000000000000000.jpg/600x600bb.jpg",
    "thumbnail": "https://is5-ssl.mzstatic.com/image/thumb/Podcasts123/v4/7b/7b/7b/7b7b7b7b-7b7b-7b7b-7b7b-7b7b7b7b7b7b/mza_14600000000000000000.jpg/600x600bb.jpg",
    "link": "https://podcasts.apple.com/us/podcast/the-joe-rogan-experience/id360084272",
    "description": "The Joe Rogan Experience is a long-form conversation hosted by comedian, UFC color commentator, and actor Joe Rogan with friends and guests that have included actors, comedians, politicians, musicians, authors, and athletes. The show was originally distributed as a podcast and later became a video series on YouTube. The show is known for its open conversation format, which often includes discussions of controversial topics such as politics, religion, and conspiracy theories. The show is also known for Rogan's frequent use of profanity and his tendency to interrupt guests and make personal comments.",
    "language": "en-us",
    "country": "USA",
    "category": "Comedy",
    "type": "episodic",
    "episodes": [
        {
            "id": "1535809341",
            "title": "Joe Rogan Experience #1535 - Joey Diaz"
        },
        {
            "id": "1535809341",
            "title": "Joe Rogan Experience #1534 - Joey Diaz"
        },
        {
            "id": "1535809341",
            "title": "Joe Rogan Experience #1533 - Joey Diaz"
        },

    ]
};

jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));

const createWrapper = () => {
 return render(<PodcastDetails />);
};

describe("PodcastDetails", () => {
    describe("Rendering", () => {
        it("should render cases container", () => {
            jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1535809341' })
            const wrapper = createWrapper();
            expect(wrapper).toMatchSnapshot();
        });
    });
});