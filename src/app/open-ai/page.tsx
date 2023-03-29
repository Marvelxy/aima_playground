'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../page.module.css'
import { useRef, useEffect, useState } from "react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [resultContainer, setResultContainer] = useState('Result');

  useEffect(() => {
  },[])

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    setResultContainer('Rephrasing...')

    // Get data from the form.
    const data = {
      text_to_rephrase: event.target.text_to_rephrase.value
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/rephrase'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    console.log(result)
    setResultContainer(result.rephrased_text.choices[0].text)
  }
  
  return (
    <>
      <div>{resultContainer}</div>
      <hr 
        style={{
          width: "430px"
        }}
      />
      <br/>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <textarea id="textToRephrase" name="text_to_rephrase" required rows={8} cols={50} placeholder="Enter text to rephrase" />
        </div>

        <div>
          <button type="submit">Rephrase</button>
        </div>
      </form>
    </>
  )
}
