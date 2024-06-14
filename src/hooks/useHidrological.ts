import { useState } from 'react'
import { fetchInfoHidro } from '@/api'
import { IDataHidro } from '@/types'

export const useHidrological = () => {
  const [data, setData] = useState<IDataHidro | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getHidroData = async () => {
    setLoading(true)
    const res = await fetchInfoHidro()
    if (res) {
      const data: IDataHidro = (await res.json()) as IDataHidro
      setData(data)
    } else {
      setData(null)
    }
    setLoading(false)
  }

  return {
    data,
    getHidroData,
    loading,
  }
}
