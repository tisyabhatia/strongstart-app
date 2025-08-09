'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestPage() {
  const [connected, setConnected] = useState(false)
  
  useEffect(() => {
    async function testConnection() {
      try {
        // Try querying user_profiles table to check connection
        const { data, error } = await supabase
          .from('user_profiles')
          .select('count')
          .limit(1)
        
        if (!error) {
          setConnected(true)
        }
      } catch (err) {
        console.error('Connection failed:', err)
      }
    }
    
    testConnection()
  }, [])
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Connection Test</h1>
      <p>Supabase: {connected ? '✅ Connected' : '❌ Failed'}</p>
    </div>
  )
}