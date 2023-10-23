import { useEffect } from 'react'
import { Input } from '@gear-js/ui'
import { Icons } from '@/components/ui/icons'
import { useApp } from '@/app/context/ctx-app'
import { useForm } from '@mantine/form'
import { initialRegister, IBet } from '@/app/consts'
import { containsValidCharacters, hexRequired, validateLength } from '@/app/utils/form-validations'
import { useGameMessage } from '@/app/hooks/use-game'
import { useAccount } from '@gear-js/react-hooks'
import { cn } from '@/app/utils'

const validate: Record<string, (value: string) => string | null> = {
  wallet: hexRequired,
  encrypted_bet_data: (value) => {
    const lengthError = validateLength(value, 3, 20);
    if (lengthError) {
      return lengthError;
    }

    const charactersError = containsValidCharacters(value);
    if (charactersError) {
      return charactersError;
    }

    return null;
  },
  
  nickname: (value) => {
    const lengthError = validateLength(value, 3, 20);
    if (lengthError) {
      return lengthError;
    }

    const charactersError = containsValidCharacters(value);
    if (charactersError) {
      return charactersError;
    }

    return null;
  },
};

export function HomeRegisterForm() {
  const { isPending, setIsPending } = useApp()

  // (alias) useGameMessage(): (payload: AnyJson, options?: SendMessageOptions | undefined) => void
  // 调用智能合约的方式
  const handleMessage = useGameMessage()
  const { account } = useAccount()

  const form = useForm({
    initialValues: initialRegister,
    validate,
    validateInputOnChange: true,
  })
  const { getInputProps, errors, reset } = form

  const onSuccess = () => {
    setIsPending(false)
    reset()
  }
  const onError = () => {
    setIsPending(false)
  }

  useEffect(() => {
    if (account) {
      form.setFieldValue('wallet', account.decodedAddress);
    }
  }, [account, form])

  const handleSubmit = form.onSubmit((values) => {
    setIsPending(true)

    handleMessage(
      {
        // function name: {args1: args1's types, args2: args2's types}
        RegisterPlayer: {
          name: values.nickname,
          player_address: values.wallet,
        },
      },
      { onSuccess, onError }
    )

    handleMessage(
      {
        // function name: {args1: args1's types, args2: args2's types}
        Bet: {
          encrypted_bet_data: values.nickname,

        },
      },
      { onSuccess, onError }
    )

  })

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 w-full max-w-[400px] mx-auto"
    >
      <div className="">
        <Input
          placeholder="Nickname"
          direction="y"
          {...getInputProps('nickname')}
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || isPending}
          className={cn(
            'btn btn--primary w-full max-w-[205px]',
            isPending && 'btn--loading'
          )}
        >
          {!isPending && <Icons.gameJoystick className="w-5 h-5 mr-2.5" />}

          <span>Start game</span>
        </button>
      </div>
    </form>
  )
}
