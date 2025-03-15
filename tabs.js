// Simulating retrieve a dynamic amount of tabs from a CMS
const tabContentFromCMS = [
    {
        label: 'Lorem ipsum',
        title: 'Title',
        panelContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra magna in gravida iaculis. Vivamus ut tempus nunc. In in mi at nibh scelerisque vestibulum. Aenean at tortor leo. Duis sodales porta arcu. Sed at magna vulputate, venenatis nunc ac, ullamcorper dolor.\n' +
            'In hac habitasse platea dictumst. Vivamus et erat diam. Pellentesque dui augue, molestie at rhoncus vel, iaculis vitae eros. Sed posuere ipsum a elementum ultrices. Etiam et ipsum dignissim, tincidunt nulla quis, vestibulum felis.',
    },
    {
        label: 'Viverra met',
        title: 'Title 2',
        panelContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra magna in gravida iaculis. Vivamus ut tempus nunc. In in mi at nibh scelerisque vestibulum. Aenean at tortor leo. Duis sodales porta arcu. Sed at magna vulputate, venenatis nunc ac, ullamcorper dolor.\n' +
            'In hac habitasse platea dictumst. Vivamus et erat diam. Pellentesque dui augue, molestie at rhoncus vel, iaculis vitae eros. Sed posuere ipsum a elementum ultrices. Etiam et ipsum dignissim, tincidunt nulla quis, vestibulum felis.',
    },
    {
        label: 'Pellentesque',
        title: 'Title 3',
        panelContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra magna in gravida iaculis. Vivamus ut tempus nunc. In in mi at nibh scelerisque vestibulum. Aenean at tortor leo. Duis sodales porta arcu. Sed at magna vulputate, venenatis nunc ac, ullamcorper dolor.\n' +
            'In hac habitasse platea dictumst. Vivamus et erat diam. Pellentesque dui augue, molestie at rhoncus vel, iaculis vitae eros. Sed posuere ipsum a elementum ultrices. Etiam et ipsum dignissim, tincidunt nulla quis, vestibulum felis.',
    },
];

// Wait for the page to load before creating the HTML and rendering it.
document.addEventListener('DOMContentLoaded', () => {

    // Find the HTML parent elements where we will insert the HTML for our tabs later.
    // We do this outside of the loop for performance reasons. Loops are expensive!
    const tabsContentContainer = document.querySelector('.tabs__container')
    const tabsListContainer = document.querySelector('.tabs__list');

    // Main loop to create the HTML for each tab that's been received from the CMS dynamically rather than being hardcoded.
    tabContentFromCMS.forEach((tabContent, index) => {

        // Create a button element for the tab.
        // We're using a button element over anything else to make sure we get all the accessible keyboard navigation controls.
        const newTabButton = document.createElement('button');

        // Add CSS classes, a label and an ID to the button's HTML.
        newTabButton.textContent = tabContent.label;
        newTabButton.classList.add('tabs__button');
        newTabButton.id = `tab-button-${index}`;
        newTabButton.setAttribute('role', 'tab');
        newTabButton.setAttribute('aria-selected', 'false');
        newTabButton.setAttribute('aria-controls', `tab-${index}`);

        // Now we need to create the actual content panel for the tab.
        const newTabContentPanel = document.createElement('div');

        // Here we add all the HTML attributes that we need to the content panel such as classes, content and ARIA roles.
        newTabContentPanel.setAttribute('id', `tab-${index}`);
        newTabContentPanel.classList.add('tabs__panel');
        newTabContentPanel.innerHTML = `<h3 class='tabs__title'>${tabContent.title}</h3>
                                        <p class='tabs__content'>${tabContent.panelContent}</p>`;

        newTabContentPanel.setAttribute('role', 'tabpanel');
        newTabContentPanel.setAttribute('aria-labelledby', `tab-button-${index}`);

        // Set the first tab & panel to be active by default for a better UX. Otherwise it would look a little bit strange!
        if (index === 0) {
            newTabButton.classList.add('tabs__button--active');
            newTabContentPanel.classList.add('tabs__panel--active');
            newTabButton.setAttribute('aria-selected', 'true');
        } else {
            newTabButton.setAttribute('aria-selected', 'false');
        }

        // Actually append this html to the DOM now so we can see it!
        // We're appending it to a specific container rather than the body for performance reasons.
        tabsListContainer.appendChild(newTabButton);
        tabsContentContainer.appendChild(newTabContentPanel);
    });
});