/*
The cool people of Lapland are bored of traditional social media and have decided to build their own app called Northagram...and they need your help!

This is how the app should work:
- It displays circular avatars of the friends who have uploaded pictures lately. These avatars have a white border.
- Underneath, it cycles through the friends' pictures displaying each for 1.5 seconds. (There's an animated snowman loading state before pictures load.)
- While a friend's pictures are being displayed, that friend's avatar gets a red border.
- This red border reverts to white when their pictures have finished being displayed.
- When all of the images have been displayed, the user should see a message "Refresh to load latest images". All avatars should have a white border at this point.

Stretch Goals for dedicated Social Media Engineers

- Add captions to the images.
- Refactor your code to use generators!
- Grey out the avatar after that friend's pictures have been displayed.
- Make it so clicking on an image pauses the timer.
- Add left and right arrow overlays to the image so users can scroll back and forth.
*/

import { feedData } from "./data.js";

const pageElements = {
    avatarsFeed: document.querySelector(".feed-avatars"),
    imagesFeed: document.querySelector(".feed-images"),
    uxLoading: document.querySelector(".ux-loading"),
};

const Avatar = (name, imageUrl) => {
    const element = document.createElement("div");
    element.classList.add("avatar");
    element.setAttribute("aria-label", `${name} Avatar`);
    element.style.backgroundImage = `url(./images/${imageUrl})`;
    return element;
};

const MainImage = (imageUrl, alt) => {
    const element = document.createElement("img");
    element.classList.add("feature-image");

    if (alt) element.setAttribute("alt", alt);

    if (imageUrl) element.src = imageUrl;

    return element;
};

const avatars = feedData.map((obj) => {
    const { avatarUrl: imageUrl, handle: name, features } = obj;
    const avatar = Avatar(name, imageUrl);
    return {
        element: avatar,
        images: features,
    };
});

const cycleImages = (avatars) => {
    const state = {
        currentAvatarCount: 1,
        currentImageCount: 1,
        intervalId: undefined,
    };

    const activeClassName = "highlight";

    const reachedImagesEnd = () => {
        clearInterval(state.intervalId);

        pageElements.mainImage.src = "";
        pageElements.mainImage.removeAttribute("alt");

        avatars.at(-1).element.classList.remove(activeClassName);

        pageElements.imagesFeed.textContent = "Refresh to load latest images.";
    };

    const toggleAvatar = (oneIndex) => {
        const zeroIndex = oneIndex - 1;
        const prevZeroIndex = oneIndex - 2;

        /* remove from previous one */
        if (prevZeroIndex >= 0) {
            const previousAvatar = avatars[prevZeroIndex].element;
            previousAvatar.classList.remove(activeClassName);
        }

        /* set on current one */
        if (oneIndex <= avatars.length) {
            avatars[zeroIndex].element.classList.add(activeClassName);
        }
    };

    state.intervalId = setInterval(() => {
        if (state.currentAvatarCount > avatars.length) {
            reachedImagesEnd();
            return;
        }
        const currentAvatarIndex = state.currentAvatarCount - 1;
        const avatar = avatars[currentAvatarIndex];
        toggleAvatar(state.currentAvatarCount);
        // console.log(avatar)

        if (state.currentImageCount > avatar.images.length) {
            state.currentAvatarCount += 1;
            state.currentImageCount = 1;
            return;
        }

        const currentImageIndex = state.currentImageCount - 1;
        const { imageUrl, alt } = avatar.images[currentImageIndex];
        pageElements.mainImage.src = `./images/${imageUrl}`;
        pageElements.mainImage.setAttribute("alt", alt);

        state.currentImageCount += 1;
    }, 1500);
};

window.addEventListener("load", (e) => {
    pageElements.uxLoading.classList.add("stop-animation");
    pageElements.avatarsFeed.append(...avatars.map((obj) => obj.element));

    pageElements.mainImage = MainImage();
    pageElements.imagesFeed.append(pageElements.mainImage);

    cycleImages(avatars);
});
