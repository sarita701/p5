var homeHtmlUrl = "home-snippet.html";  // URL of the home snippet
var allCategoriesUrl = "categories.json";  // URL for categories (or API endpoint)

// Function to load the home page
$dc.loadHomePage = function () {
    // Load the home snippet HTML
    $ajaxUtils.sendGetRequest(
        homeHtmlUrl,
        function (homeHtml) {
            // After loading the home page, load categories from the server
            $ajaxUtils.sendGetRequest(
                allCategoriesUrl,
                function (categories) {
                    // Pick a random category from the categories array
                    var chosenCategoryShortName = chooseRandomCategory(categories);
                    // Replace the placeholder with the random category short name
                    var homeHtmlToInsertIntoMainPage = insertProperty(homeHtml, "randomCategoryShortName", "'" + chosenCategoryShortName + "'");
                    // Insert the modified HTML into the main content area of the page
                    insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
                });
        },
        false);
};

// Function to choose a random category from the array of categories
function chooseRandomCategory(categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);  // Random index
    return categories[randomIndex].short_name;  // Return the short name of the randomly selected category
}

// Function to replace placeholders in HTML with actual values
function insertProperty(html, propertyName, propertyValue) {
    var replacePattern = new RegExp("{{" + propertyName + "}}", "g");
    return html.replace(replacePattern, propertyValue);
}

// Function to insert HTML into an element
function insertHtml(selector, html) {
    var element = document.querySelector(selector);
    element.innerHTML = html;
}
