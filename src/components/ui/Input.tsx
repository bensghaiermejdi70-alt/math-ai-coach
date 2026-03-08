'use client'
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; error?: string; prefix?: string; suffix?: string; mono?: boolean
}
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string; error?: string; mono?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefix, suffix, mono, style, ...props }, ref) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</label>}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {prefix && <span style={{ position: 'absolute', left: 14, color: 'var(--muted)', fontSize: 14, fontFamily: 'var(--font-mono)' }}>{prefix}</span>}
        <input
          ref={ref}
          {...props}
          style={{
            width: '100%', background: 'var(--bg2)', border: `1px solid ${error ? 'var(--red)' : 'var(--border)'}`,
            borderRadius: 10, padding: `12px ${suffix ? '44px' : '16px'} 12px ${prefix ? '44px' : '16px'}`,
            color: 'var(--text)', fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
            fontSize: 15, outline: 'none', transition: 'border-color 0.2s',
            ...style,
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
          onBlur={e => { e.currentTarget.style.borderColor = error ? 'var(--red)' : 'var(--border)' }}
        />
        {suffix && <span style={{ position: 'absolute', right: 14, color: 'var(--muted)', fontSize: 14 }}>{suffix}</span>}
      </div>
      {error && <span style={{ fontSize: 12, color: 'var(--red)' }}>{error}</span>}
    </div>
  )
)
Input.displayName = 'Input'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, mono, style, ...props }, ref) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</label>}
      <textarea
        ref={ref}
        {...props}
        style={{
          width: '100%', background: 'var(--bg2)', border: `1px solid ${error ? 'var(--red)' : 'var(--border)'}`,
          borderRadius: 10, padding: '12px 16px', color: 'var(--text)',
          fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
          fontSize: 15, outline: 'none', resize: 'vertical', minHeight: 100,
          transition: 'border-color 0.2s', ...style,
        }}
        onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
        onBlur={e => { e.currentTarget.style.borderColor = error ? 'var(--red)' : 'var(--border)' }}
      />
      {error && <span style={{ fontSize: 12, color: 'var(--red)' }}>{error}</span>}
    </div>
  )
)
Textarea.displayName = 'Textarea'
