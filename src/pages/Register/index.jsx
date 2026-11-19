import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import Button from '../../components/Button'
import Logo from '../../components/Logo'
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
} from '../Login/styles'

const schema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Digite uma senha'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
    .required('Confirme sua senha'),
})

export default function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (formData) => {
    try {
      await api.post('/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      toast.success('Conta criada com sucesso! Faça seu login.')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error('E-mail já cadastrado! Faça login para continuar.')
      } else if (!err.response) {
        toast.error('Não foi possível conectar à API. Ela está ligada?')
      } else {
        toast.error('Falha no sistema! Tente novamente.')
      }
    }
  }

  return (
    <Container>
      <LeftContainer>
        <Logo size={240} />
      </LeftContainer>

      <RightContainer>
        <Title>
          <span>Criar conta</span>
        </Title>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputContainer>
            <label htmlFor="name">Nome</label>
            <input id="name" type="text" {...register('name')} />
            <p>{errors.name?.message}</p>
          </InputContainer>

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

          <InputContainer>
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
            />
            <p>{errors.confirmPassword?.message}</p>
          </InputContainer>

          <Button type="submit" disabled={isSubmitting}>
            Criar conta
          </Button>

          <Footer>
            Já possui conta? <Link to="/login">Clique aqui.</Link>
          </Footer>
        </Form>
      </RightContainer>
    </Container>
  )
}
