import React, { useEffect, useState } from 'react'
import { GetContries, IpAddress, SendEmail } from './API'
import InlineError from './components/InlineError'
import Loading from './components/Loading'
import DatePicker from 'react-date-picker';

import {
  validateEmail,
  validateFullName,
  
  validatePhone,
} from './components/Validation'
import { toast } from 'react-toastify'
import Toast from './components/Toast'

const InputClass =
  'w-full py-4 placeholder:text-gray px-6 text-main border-2 mt-2 border-border rounded-md'

function App() {
  const [value, onChange] = useState(new Date());
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState()
  const [message, setMessage] = useState('')
  const [fullNameError, setFullNameError] = useState()
  const [emailError, setEmailError] = useState()
  const [phoneError, setPhoneError] = useState()
  const [messageError, setMessageError] = useState()
  const [loading, setLoading] = useState(true)
  const [ipData, setIpData] = useState()
  const [countries, setCountries] = useState()
  const [country, setCountry] = useState('Tanzania')
  const [buttonLoading, setButtonLoading] = useState(false)
  const [send, setSend] = useState()

  let result = countries && Object.keys(countries).map((key) => countries[key])
  let output = result && result.find((x) => x.country_name === country)
  let outputResult = output && output.dialling_code
  let phoneFull = outputResult && outputResult.concat(phone)

  useEffect(() => {
    if (!ipData & !countries) {
      IpAddress({ setLoading, setIpData })
      GetContries({ setLoading, setCountries })
    }
    // *********** VALIDATION **********
    validateFullName({ fullName, setFullNameError })
    validateEmail({ email, setEmailError })
    validatePhone({ phone, setPhoneError })
    // validateMessage({ message, setMessageError })

    // ***********
    if (send) {
      toast.success(send.msg)
      setFullName('')
      setEmail('')
      // setMessage('')
      setSend()
      setPhone('')
    }
  }, [fullName, email, phone, send, ipData, countries])

  const submitHandler = (e) => {
    e.preventDefault()
    setButtonLoading(true)
    if (!fullNameError & !emailError & !phoneError ) {
      SendEmail({ fullName, email, phone: phoneFull, setSend }).then(
        () => {
          setButtonLoading(false)
        },
      )
    }
  }

  return (
    <>
      <Toast />
      <div className="container flex-colo py-12 mx-auto min-h-screen sm:py-2 px-4 ">
        {loading ? (
          <Loading />
        ) : (
          <div className="main-box lg:w-3/4 w-full flex box-shadow rounded-lg overflow-hidden">
            <div className="box-1 bg-main flex-colo py-6 sm:py-0">
              <img
                src="https://media.licdn.com/dms/image/C4D0BAQH-FQzJ9rdnFQ/company-logo_200_200/0/1581591584189?e=1686787200&v=beta&t=cZpOvZsgRCBJYTZrF3BLbPJhQ5XX9goWZxuqmXGupi8"
                className="w-16 h-16 object-cover"
                alt="logo"
              />
              <h1 className="my-4 text-xl">Stackfusion </h1>
              <h3>By Riyaz Ansari</h3>
            </div>
            <form
              onSubmit={submitHandler}
              className="box-2 bg-white pt-12 pb-6 sm:px-12 px-6"
            >
              <h2 className="sm:text-2xl text-xl text-center mb-12 font-semibold">
                Users Form
              </h2>
              {/* fullName */}
              <div className="my-6">
                <label>FullName</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  type="text"
                  placeholder="User Name"
                  className={InputClass}
                />
                {fullNameError && <InlineError error={fullNameError} />}
              </div>
              {/* email */}
              <div className="my-6">
                <label>Email</label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="example@gmail.com"
                  className={InputClass}
                />
                {emailError && <InlineError error={emailError} />}
              </div>
              

              {/* phone */}
              <div className="my-6">
                <label>Phone</label>
                <div className="grid gap-3 grid-cols-12 border-2 mt-2 border-border rounded-md w-full px-2">
                  {/* <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="col-span-3 bg-main py-3 px-2 my-2 text-sm rounded"
                  >
                    {result &&
                      result.map((e, index) => (
                        <option key={index} value={e.country_name}>
                          {e.country_name}
                        </option>
                      ))}
                  </select> */}
                  <div className="tracking-widest col-span-2 border-x-2 border-border flex-colo">
                    {outputResult}
                  </div>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="number"
                    placeholder="0765452312"
                    className="placeholder:text-gray text-main col-span-8 px-555"
                  />
                </div>
                {phoneError && <InlineError error={phoneError} />}
              </div>
              {/* message */}
              {/* <div className="my-6">
                <label>Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can help you"
                  rows={3}
                  className="mt-2 w-full border-2 border-border py-4 placeholder:text-gray px-6 text-main rounded-md"
                />
                {messageError && <InlineError error={messageError} />}
              </div> */}
              {/* submit */}
              {/* Date of Birth  */}
              {/* <Input name='dob' label='DOB' type='date' defaultValue='2017-05-24' errorMsg={errors.dob} onChange={handleInputChange} /> */}
              <div className="my-6">
                <label>DOB</label>
                <br />
                <DatePicker onChange={onChange} value={value} />
              </div>
      
   
              {/* Date of Birth  */}
              <button
                type="submit"
                disabled={buttonLoading && true}
                className="w-full border-2 border-main hover:bg-white trans bg-main mt-6 rounded-md tracking-widest py-4 font-subMain font-bold"
              >
                {buttonLoading ? 'Loading..' : 'SUBMIT'}
              </button>
              
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default App
