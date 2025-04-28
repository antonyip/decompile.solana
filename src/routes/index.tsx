import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { default as axios } from 'axios'
import { default as bs58 } from 'bs58'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {

  const [firstVar, setFirstVar] = useState("")
  const [tokenAddress, setTokenAddress] = useState("6xmki5RtGNHrfhTiHFfp9k3RQ9t8qgL1cYP2YCG2h179")
  const [tokenAddressTrigger, setTokenAddressTrigger] = useState("")
  const [programDump, setProgramDump] = useState("Decompiled Program appears here...")
  const [firstRun, setFirstRun] = useState(false)
  const [flipsideAPIKey, setFlipsideAPIKey] = useState("")


  useEffect(() => {
    axios.get("https://decompile.solana.home.antonyip.com").then(resp => {
      setFirstVar(resp.data)
    })
  }, [])

  useEffect(() => {
    //axios.get(`https://decompile.solana.home.antonyip.com/get_program_dump/${tokenAddressTrigger}`).then(resp => {
    axios.get(`https://decompile.solana.home.antonyip.com`).then(resp => {
      if (firstRun) {
        var uuid = crypto.randomUUID()
        setProgramDump(uuid)
        console.log(resp)
      }
    })
  }, [tokenAddressTrigger])


  const updateProgramAddress = (e: any) => {
    setTokenAddress(e.target.value)
  }

  const submitTokenAddress = (e: any) => {
    setFirstRun(true)
    setTokenAddressTrigger(tokenAddress)
    console.log(e.target.value)
  }

  const updateFlipsideKey = (e: any) => {
    setFlipsideAPIKey(e.target.value)
  }

  const uint8ArrayToHex = (uint8Array: Uint8Array)  => {
    let hex = '';
    for (const byte of uint8Array) {
      hex += byte.toString(16).padStart(2, '0'); // Convert to 2-digit hex
    }
    return hex;
  }

  const convertBase58ToHex = () => {
    const buffer = bs58.decode("2TDMjY92zstsN9CoCAhAbtPUwhCJNSnJdhDybThtdfFzFJjsy8pLBfcd6Nzyu")
    const rv = uint8ArrayToHex(buffer)
    console.log(rv)
    return rv
  }

  // Convert hex string to Uint8Array
  const hexToUint8Array = (hex: String) => {
    // Remove any '0x' prefix if present
    const cleanHex = hex.replace(/^0x/, '');
    if (!/^[0-9a-fA-F]+$/.test(cleanHex) || cleanHex.length % 2 !== 0) {
      throw new Error('Invalid hex string');
    }
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
    }
    return bytes;
  };

  const convertHexToBase58 = () => {
    const hex = hexToUint8Array("010301f4190e00000000000a640001066401021b6402030010640300521f00000000000077e2a2c7700e1b40c0")
    const buffer = bs58.encode(hex)
    console.log(buffer.toString())
    return buffer.toString()
  }

  if (firstVar === "")
    return <>Loading...</>

  console.log(flipsideAPIKey)

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
            <li className="nav-item">
              <a href="#tabs-settings-ex1" className="nav-link"
                data-bs-toggle="tab">Settings</a>
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
            </div>
            <div className="tab-pane" id="tabs-decompile-ex1">
              <div className="card">
                <div className="card-body">
                  <input type="text" className="form-control" onChange={updateProgramAddress} placeholder="Program Address" />
                  <input type="submit" className="btn btn-primary" value="Decompile!" onClick={submitTokenAddress} />
                </div>
              </div>
              <div className="card">
                <textarea className="w-full card-body" id="tinymce-default" name="tinymce-default" value={programDump} />
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
                  <input type="submit" className="btn btn-primary" value="Decompile!" onClick={submitTokenAddress} />
                </div>
                <div className="card">
                  <textarea className="w-full card-body" id="tinymce-default" name="tinymce-default" value={programDump} />
                </div>
              </div>
            </div>
            <div className="tab-pane" id="tabs-flipside-ex1">
              <div className='card'>
                <div className="card-body">
                  <input type="text" className="form-control" onChange={updateProgramAddress} placeholder="Program Address" />
                  <input type="submit" className="btn btn-primary" value="Get Last 20 Transactions..." onClick={submitTokenAddress} />
                </div>
              </div>
            </div>
            <div className="tab-pane" id="tabs-converter-ex1">
              <div className='card'>
                <div className='card-header'>
                  base58 to hex
                </div>
                <div className='card-body'>
                  <input type="text" className="form-control" onChange={updateFlipsideKey} placeholder="xxxx" />
                  <button type="button" className="btn btn-primary" onClick={convertBase58ToHex} value="Convert!"/>
                </div>
              </div>
              <div className='card'>
                <div className='card-header'>
                  hex to base58
                </div>
                <div className='card-body'>
                  <input type="text" className="form-control" onChange={updateFlipsideKey} placeholder="xxxx" />
                  <button type="button" className="btn btn-primary" onClick={convertHexToBase58} value="Convert!"/>
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
