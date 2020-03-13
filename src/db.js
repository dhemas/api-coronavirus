const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const KEY_CORONAVIRUS_COUNTRIES = "corona_virus_countries"

class DatabaseHelper {
    constructor() {
        this.adapter = new FileSync('db.json')
        this.db = low(this.adapter)

        // set default for empty JSON
        this.db.defaults({ corona_virus_countries : []})
            .write()
    }

    clear() {
        this.db.get(KEY_CORONAVIRUS_COUNTRIES)
            .remove()
            .write()

        console.log("Database cleared")
    }

    insert(data) {
        this.db.get(KEY_CORONAVIRUS_COUNTRIES)
            .push(data)
            .write()
            
        console.log(`[${data['Country,Other']}] inserted`)
    }

    getAll() {
        return this.db.get(KEY_CORONAVIRUS_COUNTRIES)
            .value()
    }
}

module.exports = DatabaseHelper