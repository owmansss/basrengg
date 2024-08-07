import React, { useState, useEffect, useRef } from 'react'
import axios from '../api/axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function MaterialNewForm() {
  const [namaMaterial, setNamaMaterial] = useState('')
  const [jumlah, setJumlah] = useState('')
  const [message, setMessage] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [role, setRole] = useState('')
  const initialized = useRef(false)

  const tempDataUser = async () => {
    try {
      const result = await axios.get('user/temp')
      setRole(result.data[0]?.role) // Assuming role is in the first element of data array
    } catch (err) {
      console.log(err)
    }
  }

  const postMaterial = async () => {
    try {
      const result = await axios.post('material/stck', {
        namaMaterial,
        jumlah,
        deskripsi,
      })
      setMessage(result.data.message)
      alert(result.data.message)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    postMaterial()
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      tempDataUser()
    }
  }, [])

  return (
    <>
      {role == 'admin' ? (
        <div>
          <TabsContent
            value='MaterialNewForm'
            className='h-screen flex flex-col ml-12 gap-5 mr-12'
          >
            <div className='w-full h-[20%] flex justify-between items-end'>
              <h1 className='text-2xl font-bold'>New Material</h1>
              <div className='flex justify-end w-1/2'>
                <TabsList>
                  <TabsTrigger value='Material'>
                    Material Management
                  </TabsTrigger>
                  <TabsTrigger value='MaterialNewForm'>
                    Add New Material
                  </TabsTrigger>
                  <TabsTrigger value='MaterialReqForm'>
                    Request Material
                  </TabsTrigger>
                  <TabsTrigger value='MaterialEditForm'>
                    Edit Material
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <div className='w-full h-screen gap-5 flex flex-col'>
              <form onSubmit={handleSubmit} className='w-full'>
                <div className='mb-6 md:flex md:gap-6'>
                  <div className='md:w-1/2 mb-6 md:mb-0'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                      Nama Material
                    </label>
                    <Input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      placeholder='Fill Nama'
                      required
                      onChange={(e) => {
                        setNamaMaterial(e.target.value)
                      }}
                    />
                  </div>
                  <div className='md:w-1/2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                      Jumlah
                    </label>
                    <Input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      placeholder='Fill Jumlah Material'
                      onChange={(e) => {
                        setJumlah(e.target.value)
                      }}
                      required
                    />
                  </div>
                </div>
                <div className='mb-6 w-1/2'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Detail
                  </label>
                  <textarea
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none'
                    placeholder='Fill Detail New Material...'
                    required
                    onChange={(e) => {
                      setDeskripsi(e.target.value)
                    }}
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <Button type='submit' variant={'destructive'} size={'search'}>
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </div>
      ) : (
        <div className='flex justify-center items-center w-full h-screen  mt-2'>
          <h1 className='text-black text-4xl font-bold'>403 - Forbidden</h1>
        </div>
      )}
    </>
  )
}
