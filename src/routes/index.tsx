import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { default as axios } from 'axios';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {

  const [firstVar, setFirstVar] = useState("")
  useEffect(() => {
    axios.get("https://decompile.solana.home.antonyip.com").then(resp => {
      setFirstVar(resp.data)
    })
  }, [])

  if (firstVar === "")
    return <>Loading...</>

  //console.log(firstVar)

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
              <a href="#tabs-program-ex1" className="nav-link"
                data-bs-toggle="tab">Program</a>
            </li>
            <li className="nav-item">
              <a href="#tabs-anchor-ex1" className="nav-link"
                data-bs-toggle="tab">Anchor</a>
            </li>
            <li className="nav-item">
              <a href="#tabs-sbpf-ex1" className="nav-link"
                data-bs-toggle="tab">sBPF</a>
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
            <div className="tab-pane" id="tabs-program-ex1">
              <h4>Program ID</h4>
              <div>
                Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique
                enim at diam, sem nunc
                amet, pellentesque id egestas velit sed
              </div>
            </div>
            <div className="tab-pane" id="tabs-anchor-ex1">
              <h4>Anchor Program?</h4>
              <div>
                Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique
                enim at diam, sem nunc
                amet, pellentesque id egestas velit sed
              </div>
            </div>
            <div className="tab-pane" id="tabs-sbpf-ex1">
              <h4>eBPF OpCodes</h4>
              <div>
                Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique
                enim at diam, sem nunc
                amet, pellentesque id egestas velit sed
              </div>
            </div>
            <div className="tab-pane" id="tabs-settings-ex1">
              <h4>Settings tab</h4>
              <div>
                API Keys
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
