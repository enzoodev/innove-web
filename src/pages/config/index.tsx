import { useCallback } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { useAuth } from '@/hooks/auth/useAuth'
import { useLogout } from '@/hooks/auth/useLogout'

import { Routes } from '@/enums/Routes'

import { FileConverter } from '@/utils/FileConverter'

import { LayoutApp } from '@/components/layout/LayoutApp'
import { Button } from '@/components/elements/Button'

const Config: NextPage = () => {
  const { auth, isLoadingUser } = useAuth()
  const { handleLogout, isLoadingLogout } = useLogout()
  const router = useRouter()

  const [firstName, secondName] = auth?.name?.split(' ') ?? ['', '']
  const clientLogo = FileConverter.formatUri(auth?.client_logo_icon)

  const handleUpdatePassword = useCallback(() => {
    router.push(Routes.UPDATE_PASSWORD)
  }, [router])

  return (
    <LayoutApp
      title="Configurações"
      headTitle="Configurações - Innove"
      hasHeader={false}
    >
      <div className="flex flex-col items-center gap-4 py-16">
        <div className="flex flex-col items-center gap-4">
          {isLoadingUser ? (
            <div className="bg-gray-300 rounded-full animate-pulse w-44 h-44" />
          ) : (
            <Image
              src={clientLogo}
              alt="Client_logo"
              width="180"
              height="180"
              className="rounded-full"
            />
          )}
          <span className="text-lg font-semibold text-gray-800 break-words">
            {firstName} {secondName}
          </span>
        </div>
        <div className="w-80 flex flex-col gap-4 my-12">
          <div className="flex flex-col items-start">
            <span className="text-base text-gray-600">Login</span>
            <span className="text-base font-semibold text-gray-700 break-words w-full">
              {auth?.login}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-base text-gray-600">Email</span>
            <span className="text-base font-semibold text-gray-700 break-words w-full">
              {auth?.email}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-base text-gray-600">Telefone</span>
            <span className="text-base font-semibold text-gray-700 break-words w-full">
              {auth?.phone}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button
            title="Alterar senha"
            normalText
            additionalClasses="w-80 bg-red-700 hover:bg-red-800 active:bg-red-900"
            color="text-white"
            onClick={handleUpdatePassword}
          />
          <Button
            title="Sair da conta"
            normalText
            additionalClasses="w-80 bg-zinc-700 hover:bg-zinc-800 active:bg-zinc-900"
            color="text-white"
            isLoading={isLoadingLogout}
            onClick={handleLogout}
          />
        </div>
      </div>
    </LayoutApp>
  )
}

export default Config
