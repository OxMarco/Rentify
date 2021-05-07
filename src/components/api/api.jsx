import ABI from '../../abi.json';
import Contract from 'web3-eth-contract';

export default class Api {
    constructor(web3) {
        this.web3 = web3;
        this.contract = new this.web3.eth.Contract(ABI, '0x1dE9993Be1Fe26712b2C2ade4a3bA7E044591E90')
        this.contract.setProvider(this.web3.currentProvider)
    }

    async get(id) {
        try {
            let res = await this.contract.methods.get(id).call();
            console.log("[API] Contract result:");
            console.log(res);

            var metadataCID = res[0];

            /*
            console.log(collateral);
            console.log(rentee);
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
                deposit: res[1],
                image: `https://ipfs.io/ipfs/${response['image']}`,
                rentee: res[2]
            };

            return metadata;
            */
        } catch(e) {
            console.error(e);
            return '';
        }
    }

    async create(metadata, collateral) {
        try {
            const tokenId = await this.contract.methods.create(metadata, collateral).send();

            return tokenId;
        } catch(e) {
            console.error(e);
            return '';
        }
    }

    async remove(tokenId) {
        try {
            await this.contract.methods.remove(tokenId).send();

            return true;
        } catch(e) {
            console.error(e);
            return false;
        }
    }
}
