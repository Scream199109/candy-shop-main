'use client'

//Хук для того чтобы не  ьыло ошибки "Documnet is not defined in NEXT.JS"
import {useEffect, useState} from 'react'

export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
