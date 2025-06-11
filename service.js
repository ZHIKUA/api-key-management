require("dotenv").config();

class DBService{

    constructor() {
        this.developerId = 1;
        this.apiKeyId = 1;
        this.developers = []
        this.apiKeys = [];
    }

    addDeveloper(name, email) {
        if (!name || !email) {
            message = "Please provide name and email"; 
        }
        this.developers.push({ id: this.developerId, name, email})
        this.developerId ++;
        console.log(this.developers)
        return "Developer registered successfully. "
    }

    addApiKey(apiKeyString, developer_id) {
        if (!this.developers.map(developer=>developer.id).includes(developer_id)) {
            return "Developer id does not exist. ";
        }
        this.developers.push({ 
            id: this.apiKeyId, 
            keyString: apiKeyString, 
            usageToday: 0,
            developerId: developer_id
        })
        console.log(apiKeyString);
        this.apiKeyId ++;
        return "Key Added Successfully"; 
    }

    getApiKeyByString(apiKeyString) {
        let apiKey = this.apiKeys.find(apiKey=>apiKey.apiKeyString===apiKeyString);
        if (!apiKey) {
            return "Wrong API Key. "; 
        } else if (apiKey.dailyUsageCount > process.env.DAILY_LIMIT) {
            return "API Key Usage Exceeded. ";
        } else {
            this.apiKeys[this.apiKeys.indexOf(apiKey)].usageToday ++;
            return "Successful"; 
        }
    }

    getSummaryByDeveloperId(developer_id) {
        let apiKeys = this.apiKeys.filter(apiKey=>apiKey.developerId==developer_id);
        return apiKeys.map(apiKey=>({
            apiKeyString: apiKey.apiKeyString, 
            usageCount: apiKey.usageToday,
            usageBalance: process.env.DAILY_LIMIT - apiKey.usageToday
        }));
    }

    resetDailyUsage() {

    }

}



module.exports = new DBService();