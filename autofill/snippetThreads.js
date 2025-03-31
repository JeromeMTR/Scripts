function trackList() {
    let arr = Array.from(document.querySelectorAll('span[class="x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft"]')) // Replace with the actual class
        .map(el => el.textContent.trim());

    return arr
}

function removeFollowings() {
    followersList = [
    ]
    followingsList = trackList()

    followingsList = followingsList.filter(f => !followersList.includes(f))

    for (const name of followingsList) {
        // Find the span element with the name
        const nameElement = Array.from(document.querySelectorAll('span[class="x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft"]')) // Replace with the actual class
            .find(el => el.textContent.trim() === name);

        if (nameElement) {
            // Find the parent element of the name
            const parentElement = nameElement.closest('div[class="x6s0dn4 x78zum5 x1q0g3np x1iyjqo2 x1qughib x64yxkv"]'); // Adjust the parent selector if needed

            if (parentElement) {
                // Find the "Following" button within the parent element
                const followingButton = Array.from(parentElement.querySelectorAll('div')) // Get all buttons
                    .find(button => button.textContent.trim() === 'Following'); // Adjust the button selector if needed

                if (followingButton && followingButton.textContent.includes('Following')) {
                    // Click the "Following" button
                    followingButton.click();
                    // Wait for the "Unfollow" confirmation button and click it
                    setTimeout(() => {
                        const unfollowButton = document.querySelector('div[class="x1sxyh0 xurb0ha x1vjfegm"]'); // Replace with the actual class
                        if (unfollowButton) {
                            unfollowButton.click();
                            console.log(`Unfollowed: ${name}`);
                        }
                    }, 500); // Adjust the timeout if needed
                }
            }
        }
    }

    return filter
}
