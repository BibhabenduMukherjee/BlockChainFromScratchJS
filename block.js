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

    // static for all ref of same gen
    static genesis(){
           return new Block(GENESIS_DATA) 
    }

    // adding a new block to the existing
    // chain should require to call 
    // mineBlock() with the ref of previous block
    // and data to injected
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

