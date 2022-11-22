# Suggest Chain Information
Keplr Wallet에 체인을 등록하기 위한 기본 정보들을 모아두었습니다.
추가하고 싶은 체인이 있다면 아래 양식으로 PR을 요청해주시면 됩니다.

## 필수 사항
 - 체인 정보가 정확해야합니다.(chainId, rpc url, rest url 등)
 - 체인 이미지가 필요합니다.(png 파일, 256x256 size)

## Chain Registration Form
```typescript
interface ChainInfo {
    readonly rpc: string;
    readonly rest: string;
    readonly chainId: string;
    readonly chainName: string;
    /**
    * This indicates the type of coin that can be used for stake.
    * You can get actual currency information from Currencies.
    */
    readonly stakeCurrency: Currency;
    readonly walletUrlForStaking?: string;
    readonly bip44: {
        coinType: number;
    };
    readonly alternativeBIP44s?: BIP44[];
    readonly bech32Config: Bech32Config;
    
    readonly currencies: AppCurrency[];
    /**
    * This indicates which coin or token can be used for fee to send transaction.
    * You can get actual currency information from Currencies.
    */
    readonly feeCurrencies: FeeCurrency[];
    
    /**
    * Indicate the features supported by this chain. Ex) cosmwasm, secretwasm ...
    */
    readonly features?: string[];
}

/**
 * The currency that is supported on the chain natively.
 */
interface Currency {
    readonly coinDenom: string;
    readonly coinMinimalDenom: string;
    readonly coinDecimals: number;
    /**
     * This is used to fetch asset's fiat value from coingecko.
     * You can get id from https://api.coingecko.com/api/v3/coins/list.
     */
    readonly coinGeckoId?: string;
    readonly coinImageUrl?: string;
}

interface BIP44 {
    readonly coinType: number;
}

interface Bech32Config {
    readonly bech32PrefixAccAddr: string;
    readonly bech32PrefixAccPub: string;
    readonly bech32PrefixValAddr: string;
    readonly bech32PrefixValPub: string;
    readonly bech32PrefixConsAddr: string;
    readonly bech32PrefixConsPub: string;
}
```

```json
{
  "chainId": "osmosis-1",
  "chainName": "Osmosis Test",
  "rpc": "https://rpc-osmosis.keplr.app",
  "rest": "https://lcd-osmosis.keplr.app",
  "walletUrlForStaking": "https://wallet.keplr.app/chains/osmosis",
  "bip44": {
    "coinType": 118
  },
  "bech32Config": {
    "bech32PrefixAccAddr": "osmosis",
    "bech32PrefixAccPub": "osmosispub",
    "bech32PrefixValAddr": "osmosisvaloper",
    "bech32PrefixValPub": "osmosisvaloperpub",
    "bech32PrefixConsAddr": "osmosisvalcons",
    "bech32PrefixConsPub": "osmosisvalconspub"
  },
  "currencies": [
    {
      "coinDenom": "OSMO",
      "coinMinimalDenom": "uosmo",
      "coinDecimals": 6,
      "coinGeckoId": "osmosis"
    }
  ],
  "feeCurrencies": [
    {
      "coinDenom": "OSMO",
      "coinMinimalDenom": "uosmo",
      "coinDecimals": 6,
      "coinGeckoId": "osmosis",
      "gasPriceStep": {
        "low": 0.01,
        "average": 0.025,
        "high": 0.03
      }
    }
  ],
  "stakeCurrency": {
    "coinDenom": "OSMO",
    "coinMinimalDenom": "uosmo",
    "coinDecimals": 6,
    "coinGeckoId": "osmosis"
  },
  "features": [
    "ibc-go",
    "ibc-transfer",
    "cosmwasm",
    "wasmd_0.24+",
    "osmosis-txfees"
  ]
}

```

## Schedule Validator
 - 10분마다 등록된 체인들의 유효성 체크를 진행합니다.