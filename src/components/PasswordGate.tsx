import { useState } from 'react';
import { verifyPassword } from '../utils/contentStore';

interface PasswordGateProps {
  siteTitle: string;
  expectedPassword: string;
  onUnlocked: () => void;
}

export function PasswordGate({
  siteTitle,
  expectedPassword,
  onUnlocked
}: PasswordGateProps) {
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPassword(inputVal, expectedPassword)) {
      setErrorMsg('');
      onUnlocked();
    } else {
      setErrorMsg('Wrong password.');
      setInputVal('');
    }
  };

  return (
    <div
      id="auth-gate"
      className="fixed inset-0 z-50 bg-black flex items-center justify-center p-6 text-center select-none"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[380px] p-8 ub-frame"
      >
        <div className="text-[34px] text-[#8B2635] underline italic tracking-[2px] mb-2 leading-tight">
          {siteTitle}
        </div>
        <div className="text-[#F5A623] text-[15px] mb-6">
          Enter password to continue
        </div>

        <input
          type="password"
          autoFocus
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="••••••••"
          className="w-full p-2.5 text-lg text-center bg-black text-[#FFFF00] ub-input-inset"
        />

        <div className="text-[#A93341] text-[13px] mt-2.5 min-h-[20px] font-sans">
          {errorMsg}
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-[#2a2a2a] text-[#F5A623] text-base ub-btn-beveled cursor-pointer"
        >
          Enter
        </button>

        <div className="mt-6 text-xs text-[#666666]">
          Hint: Default archive passcode is <span className="text-[#F5A623]">{expectedPassword}</span>
        </div>
      </form>
    </div>
  );
}
