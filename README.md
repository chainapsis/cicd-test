# Suggest Chain Information
Keplr Wallet에 체인을 등록하기 위한 기본 정보들을 모아두었습니다.

추가하고 싶은 체인이 있다면 아래 양식으로 PR을 요청해주시면 됩니다.

## Chain Registration Directory Structure
chain-identifier란 chainId 형식({identifier}-{version})의 앞 identifier를 의미합니다.

{version}은 정수로 이뤄져있습니다.
```
  `cosmoshub-4`에서 chain-identifier는 `cosmoshub`입니다.
  `crypto-org-chain-mainnet-1`에서 chain-identifier는 `crypto-org-chain-mainnet`입니다.
  `evmos_9001-2`에서 chain-identifier는 `evmos_9001`입니다.
  `shentu-2.2`에서 chain-identifier는 `shentu-2.2`입니다.
```

아래 형태의 디렉토리 구조를 갖고 있습니다.

형태에 맞춰서 정보를 입력해 주시기 바랍니다.
```
.
├── cosmos                       # 코스모스 체인들의 모음
│     ├── cosmoshub.json         # 해당 체인의 정보입니다.(파일 이름은 `{chain-identifier}.json`으로 입력해야합니다.)
│     ├── osmosis.json 
│     └── ...
└── images                       # 이미지 에셋의 모음
      ├── cosmoshub              # 코스모스 허브의 이미지 모음(디렉토리 이름은 `{chain-identifier}`으로 입력해야합니다.)
      │     └── chain.png        # 코스모스 허브 이미지(png파일, 256x256px 사이즈)      
      ├── osmosis                # 오스모시스의 이미지 모음
      └── ...
```

## Chain Registration Form
```json
{
  "chainId": "osmosis-1",
  "chainName": "Osmosis",
  "rpc": "https://rpc-osmosis.blockapsis.com",
  "rest": "https://lcd-osmosis.blockapsis.com",
  "nodeProvider": {
    "name": "Blockapsis",
    "email": "infra@blockapsis.com",
    "website":"https://blockapsis.com/"
  },
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
    "cosmwasm",
    "osmosis-txfees"
  ]
}
```

## 양식에 대한 설명
- chainId: chainId의 형태는 {identifier}-{version}의 형태로 이루어져 있습니다.(ex. cosmoshub-4)
- chainName: Keplr Wallet 유저에게 보여줄 체인 이름을 입력합니다.
- rpc: 체인의 RPC 제공자 URL을 입력합니다.
- rest: 체인의 REST 제공자 URL을 입력합니다.
- nodeProvider: 위 RPC, REST 노드를 운영하는 주체에 대한 정보를 입력합니다.
   - name: 노드 제공자의 이름을 입력합니다.
   - email: 노드 제공자의 이메일을 입력합니다.(노드의 상태가 이상이 있을 때 연락받기 위함입니다.)
   - website(optional): 노드 제공자의 홈페이지가 있으면 입력합니다.
- walletUrlForStaking(optional): Keplr Wallet에서 Staking 버튼을 누르면 이동하는 URL입니다
- bip44: BIP44 코인 타입을 입력합니다.(118을 추천합니다.)
- bech32Config: 지갑 주소를 만들기 위한 prefix bech32설정을 입력합니다.
- currencies: 보낼 수 있는 Currency 리스트를 입력합니다.
- feeCurrencies: 수수료로 사용할 수 있는 Currency 리스트를 입력합니다.
- stakeCurrency: Staking할 수 있는 Currency를 입력합니다.
- features: 체인에서 추가적으로 제공하는 기능들을 입력합니다.
   - cosmwasm: CosmWasm 스마트 컨트랙트 기능을 지원합니다.
   - secretwasm: Secret Network의 WASM 스마트 컨트랙트 기능을 지원합니다.
   - eth-address-gen: EVMOS와 같은 EVM계열의 이더리움 계정 생성 기능을 지원합니다.
   - eth-key-sign: EVMOS와 같은 EVM계열의 이더리움 서명 기능을 지원합니다.
   - axelar-evm-bridge: Axelar 체인의 EVM 브릿지 기능을 지원합니다.
   - osmosis-txfees: Osmosis에서 다른 Currency로 수수료 지원하는 기능 제공합니다.

## 확인 사항
 - 체인 정보 파일이 JSON 파일인지 확인합니다.
 - RPC URL
   - RPC 노드의 상태가 정상인지 확인합니다.
   - 입력한 chainId와 RPC 노드의 chainId가 같은지 확인합니다.
   - WebSocket이 열려있는지 확인합니다.
- REST URL
   - REST 노드의 상태가 정상인지 확인합니다.
   - 위에 입력하신 chainId와 REST 노드의 chainId가 같은지 확인합니다.

## 주의 사항
 - Keplr Wallet과의 호환이 되지 않을 경우 Chain의 문제입니다.
 - Keplr에서는 해당 이슈를 처리해주지 않습니다.
 - 해당 Chain에 연락하여 기능을 추가해야 Keplr Wallet에 추가될 수 있습니다.