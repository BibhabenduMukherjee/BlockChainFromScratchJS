const { GENESIS_DATA } = require("./config");

// Start up code 
class Block {
    constructor({timestamp, lastHash , hash , data}){
        this.hash = hash;
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.data = data;
    }

    static genesis(){
        
           return new Block(GENESIS_DATA)
        
    }

}

module.exports = Block

