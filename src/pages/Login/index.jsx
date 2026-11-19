import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { useUser } from '../../hooks/UserContext'
import { api } from '../../services/api'
import {
  Container,
  Footer,
  Form,
  InputContainer,
  LeftContainer,
  Link,
  RightContainer,
  Title,
} from './styles'

const schema = yup.object({
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Digite uma senha'),
})

export default function Login() {
  const navigate = useNavigate()
  const { putUserData } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (formData) => {
    try {
      const { data } = await toast.promise(
        api.post('/session', {
          email: formData.email,
          password: formData.password,
        }),
        {
          pending: 'Verificando seus dados...',
          success: 'Seja bem-vindo(a)! 👌',
          error: {
            render({ data: err }) {
              return err.response
                ? 'E-mail ou senha incorretos 🤯'
                : 'Não foi possível conectar à API. Ela está ligada?'
            },
          },
        },
      )

      putUserData(data)
      setTimeout(() => navigate('/'), 1500)
    } catch {
      // a mensagem de erro já foi mostrada pelo toast
    }
  }

  return (
    <Container>
      <LeftContainer>
        <Logo size={240} />
      </LeftContainer>

      <RightContainer>
        <Title>
          Olá, seja bem-vindo ao <span>Dev Burger!</span>
          <br />
          Acesse com seu login e senha.
        </Title>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputContainer>
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" {...register('email')} />
            <p>{errors.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" {...register('password')} />
            <p>{errors.password?.message}</p>
          </InputContainer>

          <Button type="submit" disabled={isSubmitting}>
            Entrar
          </Button>

          <Footer>
            Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
          </Footer>
        </Form>
      </RightContainer>
    </Container>
  )
}
