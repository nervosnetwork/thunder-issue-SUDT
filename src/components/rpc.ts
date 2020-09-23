import Const from './const'

const requestAuth = async (description: any): Promise<any> => {
  try {
    const response = await fetch(Const.KEYPERING_URL, {
      method: 'POST',
      body: JSON.stringify({
        id: 2,
        jsonrpc: '2.0',
        method: 'auth',
        params: {
          description
        }
      })
    })
    const data = await response.json()
    return data.result.token
  } catch (error) {
    console.error('error', error)
  }
}

const queryAddresses = async (token: string): Promise<any> => {
  try {
    const response = await fetch(Const.KEYPERING_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id: 3,
        jsonrpc: '2.0',
        method: 'query_addresses'
      })
    })
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('error', error)
  }
}

const getCells = async (lockArgs: string): Promise<any> => {
  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'get_cells',
    params: [
      {
        script: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          code_hash: Const.SECP256K1_BLAKE160_CODE_HASH,
          hash_type: 'type', // eslint-disable-line @typescript-eslint/camelcase
          args: lockArgs
        },
        script_type: 'lock' // eslint-disable-line @typescript-eslint/camelcase
      },
      'asc',
      '0x3e8'
    ]
  }
  const body = JSON.stringify(payload, null, '  ')
  try {
    const response = await fetch(Const.RICH_NODE_INDEXER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    const data = await response.json()
    return data.result.objects
  } catch (error) {
    console.error('error', error)
  }
}

export default {
  requestAuth: requestAuth,
  queryAddresses: queryAddresses,
  getCells: getCells
}
