import ABI from '../../abi.json';
import Contract from 'web3-eth-contract';

export default class Api {
    constructor(web3) {
        this.web3 = web3;
        this.contract = new this.web3.eth.Contract(ABI, '0x1dE9993Be1Fe26712b2C2ade4a3bA7E044591E90')
        this.contract.setProvider(this.web3.currentProvider)
    }

    async create(metadata, collateral) {
        return await this.contract.methods.create(metadata, collateral).send();
    }

    async getAll() {
        return await this.contract.methods.getAll().call();
    }

    async get(id) {
        let data = await this.contract.methods.get(id).call();

        var metadataCID = data[0];
        const res = await fetch(`https://ipfs.io/ipfs/${metadataCID}`);
        const response = await res.json();

        const metadata = {
            latitude: response['latitude'],
            longitude: response['longitude'],
            country: response['country'],
            region: response['region'],
            zip: response['zip'],
            title: response['title'],
            description: response['description'],
            surface: response['surface'],
            price: response['price'],
            deposit: data[1],
            image: `https://ipfs.io/ipfs/${response['image']}`,
            owner: data[2],
            rentee: data[3]
        };

        return metadata;
    }

    async remove(tokenId) {
        return await this.contract.methods.remove(tokenId).send();
    }
}
