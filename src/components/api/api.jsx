import ABI from '../../abi.json';

export default class Api {
    constructor(web3, address) {
        this.address = address;
        this.web3 = web3;
        this.contract = new this.web3.eth.Contract(ABI, '0xd00d47e7164df50b96fdd6a3971d50d0b5ed69a4')
        this.contract.setProvider(this.web3.currentProvider)
    }

    async create(metadata, collateral) {
        this.contract.methods.create(metadata, collateral).send({from: this.address})
            .on('transactionHash', function(hash) {
                console.log('Transaction hash: ');
                console.log(hash);
            })
            .on('confirmation', function(confirmationNumber, receipt) {
                console.log('confirmation');
                console.log(confirmationNumber);
                console.log(receipt);
            })
            .on('receipt', function(receipt) {
                console.log('receipt');
                console.log(receipt);
            })
            .on('error', function(error, receipt) {
                console.log('error');
                console.log(error);
                console.log(receipt);
            });


        return true;
    }

    async getAll() {
        return await this.contract.methods.getAll().call();
    }

    async get(id) {
        console.info("Api get")
        console.info(id);
        let data = await this.contract.methods.get(id).call(); // 0 => metadata, 1 => collateral, 2 => owner, 3 => tenant

        console.info(data);

        if(data[0] === null || data[0] === '') return null;

        var metadataCID = data[0];
        const res = await fetch(`https://ipfs.io/ipfs/${metadataCID}`);
        const response = await res.json();

        /*
        const apiRes = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
        const priceRes = await apiRes.json();
        const price_usd = (priceRes['USD'] * this.web3.utils.fromWei(response['price'])).toString();
        const deposit_usd = (priceRes['USD'] * this.web3.utils.fromWei(data[1])).toString();
*/

        const metadata = {
            id: id,
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
            tenant: data[3]
        };

        return metadata;
    }

    async remove(tokenId) {
        return await this.contract.methods.remove(tokenId).send();
    }
}
