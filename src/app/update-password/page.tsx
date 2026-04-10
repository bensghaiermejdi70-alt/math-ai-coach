'use client'

import { useState } from 'react'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')

  return (
    <div style={{ padding: 20 }}>
      <h1>Update Password</h1>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={() => alert('Password updated')}
        style={{ marginLeft: 10 }}
      >
        Save
      </button>
    </div>
  )
}