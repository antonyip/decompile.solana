import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { default as axios } from 'axios'
import { default as bs58 } from 'bs58'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {

  const [firstVar, setFirstVar] = useState("")
  const [tokenAddress, setTokenAddress] = useState("MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD")

  const [programDump, setProgramDump] = useState("Decompiled Program appears here...")
  const [tokenAddressTrigger, setTokenAddressTrigger] = useState("")

  const [programDump2, setProgramDump2] = useState("Decompiled Program appears here...")
  const [tokenAddressTrigger2, setTokenAddressTrigger2] = useState("")

  const [firstRun, setFirstRun] = useState(false)
  const [flipsideAPIKey, setFlipsideAPIKey] = useState("")


  const [base58String, setBase58String] = useState("")
  const [hexString, setHexString] = useState("")

  const [base58StringResult, setBase58StringResult] = useState("")
  const [hexStringResult, setHexStringResult] = useState("")


  useEffect(() => {
    axios.get("https://decompile.solana.home.antonyip.com").then(resp => {
      setFirstVar(resp.data)
    })
  }, [])

  useEffect(() => {
    console.log(tokenAddressTrigger)
    if (tokenAddressTrigger.length >= 43) {
      axios.get(`https://decompile.solana.home.antonyip.com/get_program_dump/${tokenAddressTrigger}`).then(resp => {
        if (firstRun) {
          setProgramDump(resp.data)
          //console.log(resp.data)
        }
      })
    }
  }, [tokenAddressTrigger])

  useEffect(() => {
    console.log(tokenAddressTrigger2)
    if (tokenAddressTrigger2.length >= 43) {
      axios.get(`https://decompile.solana.home.antonyip.com/idl_guesser/${tokenAddressTrigger2}`).then(resp => {
        if (firstRun) {
          setProgramDump2(JSON.stringify(resp.data, null, 2))
          //console.log(resp.data)
        }
      })
    }
  }, [tokenAddressTrigger2])


  const updateProgramAddress = (e: any) => {
    setTokenAddress(e.target.value)
  }

  const submitTokenAddress = (e: any) => {
    setFirstRun(true)
    setTokenAddressTrigger(tokenAddress)
    console.log(e.target.value)
  }

  const submitTokenAddress2 = (e: any) => {
    setFirstRun(true)
    setTokenAddressTrigger2(tokenAddress)
    console.log(e.target.value)
  }

  const updateFlipsideKey = (e: any) => {
    setFlipsideAPIKey(e.target.value)
  }

  const uint8ArrayToHex = (uint8Array: Uint8Array) => {
    let hex = '';
    for (const byte of uint8Array) {
      hex += byte.toString(16).padStart(2, '0'); // Convert to 2-digit hex
    }
    return hex;
  }

  const convertBase58ToHex = () => {
    const buffer = bs58.decode(base58String)
    const rv = uint8ArrayToHex(buffer)
    console.log(rv)
    setHexStringResult(rv)
  }

  // Convert hex string to Uint8Array
  const hexToUint8Array = (hex: string) => {
    // Remove any '0x' prefix if present
    const cleanHex = hex.replace(/^0x/, '');
    if (!/^[0-9a-fA-F]+$/.test(cleanHex) || cleanHex.length % 2 !== 0) {
      throw new Error('Invalid hex string');
    }
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
    }
    return bytes;
  };

  const convertHexToBase58 = () => {
    const hex = hexToUint8Array(hexString)
    const buffer = bs58.encode(hex)
    //console.log(buffer.toString())
    setBase58StringResult(buffer.toString())
  }

  const updateHexString = (e: any) => {
    setHexString(e.target.value)
  }

  const updateBase58String = (e: any) => {
    setBase58String(e.target.value)
  }

  if (firstVar === "")
    return <>Loading...</>

  console.log(flipsideAPIKey, base58String, hexString)

  return (
    <div><br />
      <div className="card">
        <div className="card-body">
          Solana Decompiler Toolkit - by Antonidas
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
            <li className="nav-item">
              <a href="#tabs-home-ex1" className="nav-link active"
                data-bs-toggle="tab">Home</a>
            </li>
            <li className="nav-item">
              <a href="#tabs-decompile-ex1" className="nav-link"
                data-bs-toggle="tab">Decompiler</a>
            </li>
            <li className="nav-item">
              <a href="#tabs-anchor-ex1" className="nav-link"
                data-bs-toggle="tab">Anchor IDL Guesser</a>
            </li>
            <li className="nav-item">
              <a href="#tabs-flipside-ex1" className="nav-link"
                data-bs-toggle="tab">Flipside</a>
            </li>
            <li className="nav-item">
              <a href="#tabs-converter-ex1" className="nav-link"
                data-bs-toggle="tab">Converters</a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="tab-content">
            <div className="tab-pane active show" id="tabs-home-ex1">
              <div className="card-body">
                <h4>About This...</h4>
                <li>SolDecompiler: A website focused on downloading and decompiling Solana blockchain programs.</li>
                <li>Functionality: Allows users to input a Solana program ID to fetch binary data from the blockchain.</li>
                <li>Decompilation: Converts binary data into readable Rust code using advanced reverse-engineering tools.</li>
                <li>Purpose: Assists developers and auditors in analyzing Solana smart contracts for security, functionality, or education.</li>
                <li>User Caution: Emphasizes respecting intellectual property and legal boundaries during decompilation.</li>
              </div>
              <div className="card-body">
                <h4>Credits / References</h4>
                <li>https://www.sec3.dev/blog/idl-guesser-recovering-instruction-layouts-from-closed-source-solana-programs</li>
                <li>https://github.com/anza-xyz/sbpf/tree/main</li>
                <li>https://x.com/i/grok</li>
                <li>https://releases.llvm.org/19.1.0/docs/index.html</li>
                <li>https://solana.com/docs/intro/installation</li>
              </div>
              <div className="card-body">
                <h4>Source Code</h4>
                <li>https://github.com/antonyip/decompile.solana</li>
              </div>
            </div>
            <div className="tab-pane" id="tabs-decompile-ex1">
              <div className="card">
                <div className="card-body">
                  <input type="text" className="form-control" onChange={updateProgramAddress} defaultValue={tokenAddress} placeholder="Program Address" />
                  <input type="submit" className="btn btn-primary" value="Decompile!" onClick={submitTokenAddress} />
                </div>
              </div>
              <div className="card">
                <textarea className="form-control w-full h-80 card-body" data-bs-toggle="autosize" value={programDump} />
              </div>
            </div>
            <div className="tab-pane" id="tabs-anchor-ex1">
              <div className='card'>
                <div className='card-header'>
                  <div className='card-title'>
                    IDL Guesser...
                  </div>
                  <br />
                  <div className='text-secondary'>
                    - Only works if it is compiled with Anchor...
                  </div>
                </div>
                <div className="card-body">
                  <input type="text" className="form-control" onChange={updateProgramAddress} placeholder="Program Address" />
                  <input type="submit" className="btn btn-primary" value="Decompile!" onClick={submitTokenAddress2} />
                </div>
                <div className="card">
                  <div className="card-body">
                    <textarea className="form-control w-full h-80" data-bs-toggle="autosize" value={programDump2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane" id="tabs-flipside-ex1">
              <a href="https://flipsidecrypto.xyz/Antonidas/last-20-txs-of-a-program-mpVqgj">Flipside Dashboard to get latest 20 txs</a>
            </div>
            <div className="tab-pane" id="tabs-converter-ex1">
              <div className='card'>
                <div className='card-header'>
                  Base58 to Hexadecimal
                </div>
                <div className='card-body'>
                  <input type="text" className="form-control" onChange={updateBase58String} placeholder="6xmki5RtGNHrfhTiHFfp9k3RQ9t8qgL1cYP2YCG2h179" />
                  <button type="button" className="btn btn-primary" onClick={convertBase58ToHex} value="Convert!">Convert</button>
                  <input type="text" className="form-control readonly" value={hexStringResult} placeholder="output" />
                </div>
              </div>
              <div className='card'>
                <div className='card-header'>
                  Hexadecimal to Base58
                </div>
                <div className='card-body'>
                  <input type="text" className="form-control" onChange={updateHexString} placeholder="5893fb6fe7d46c834cd4e33e42edcda984914aa9dfeff81d96f029368a804454" />
                  <button type="button" className="btn btn-primary" onClick={convertHexToBase58} value="Convert!">Convert</button>
                  <input type="text" className="form-control readonly" value={base58StringResult} placeholder="output" />
                </div>
              </div>
            </div>
            <div className="tab-pane" id="tabs-settings-ex1">
              <h4>Settings tab</h4>
              <div className='card'>
                <div className='card-header'>
                  Flipside API Key
                </div>
                <div className='card-body'>
                  <input type="password" className="form-control" onChange={updateFlipsideKey} placeholder="xxxx" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
