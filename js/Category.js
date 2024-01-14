// Class definition for Category
class Category {
    constructor() {
        this.clientId = "";
        this.clientSecret = "";
    }
    // Method to get the list of categories
    async getCategory() {
        const url_api = "https://opentdb.com/api_category.php"
        const response = await fetch(url_api);
        const categoryList = await response.json();

        return { categoryList };
    }
}