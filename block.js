class Block {
    constructor(timestamp, lastHash , hash , data){
        this.hash = hash;
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.data = data;
    }

}
const block1 = new Block('01/10/2012','foo-lasthash','foo-hash','foo-data');



