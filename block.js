const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

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


    static mineBlock({lastBlock , data}){
        const timestamp = Date.now()
        const lastHash = lastBlock.hash
        return new this({
            timestamp : Date.now(),
            lastHash : lastBlock.hash,
            data,
            hash : cryptoHash(timestamp,lastHash , data)
        })
    }
}

module.exports = Block

