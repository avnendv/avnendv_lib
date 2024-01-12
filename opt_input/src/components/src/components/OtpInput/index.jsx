import { useState } from 'react';

import AvOptInput from './AvOptInput';
import SnyInputOtp from './SnyInputOtp';

function OtpInput() {
  const [otpCode, setOtpCode] = useState('');
  const [otpCodeAv, setOtpCodeAv] = useState('');

  return (
    <div className='px-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h2>
          SnyInputOtp (
          <a
            href='https://github.com/vuluu2k/snappy-lib/blob/master/src/components/SnyInputOtp/SnyInputOtp.js'
            target='_blank'
            rel='noreferrer'
            className='italic hover:underline hover:text-sky-500'
          >
            customize form vuluu2k
          </a>
          )
        </h2>
        <SnyInputOtp value={otpCode} onChange={(e) => setOtpCode(e.target.value)} maxLength={4} autoFocus={false} />
      </div>
      <div className='flex flex-col gap-2'>
        <h2>
          AvInputOtp (
          <a
            href='https://github.com/dominicarrojado/react-typescript-otp-input/blob/main/src/components/OtpInput.tsx'
            target='_blank'
            rel='noreferrer'
            className='italic hover:underline hover:text-sky-500'
          >
            customize form vuluu2k
          </a>
          )
        </h2>
        <AvOptInput value={otpCodeAv} valueLength={4} onChange={setOtpCodeAv} />
      </div>
    </div>
  );
}

export default OtpInput;
