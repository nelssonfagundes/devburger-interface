import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import Button from '../../components/Button'
import { paths } from '../../constants/paths'
import { api } from '../../services/api'
import { FormBox, PageTitle } from './styles'

// formulário usado tanto para criar quanto para editar produto
export default function ProductForm({ product }) {
  const isEditing = Boolean(product)
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [fileName, setFileName] = useState(null)

  const schema = yup.object({
    name: yup.string().required('Digite o nome do produto'),
    price: yup
      .number()
      .typeError('Digite o preço')
      .positive('O preço deve ser maior que zero')
      .required('Digite o preço'),
    category: yup.object().nullable().required('Escolha uma categoria'),
    offer: yup.bool(),
    file: isEditing
      ? yup.mixed()
      : yup
          .mixed()
          .test('required', 'Envie uma imagem', (value) => value?.length > 0)
          .test(
            'size',
            'A imagem deve ter no máximo 3 MB',
            (value) => !value?.[0] || value[0].size <= 3 * 1024 * 1024,
          ),
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories')
      setCategories(data)

      if (isEditing) {
        reset({
          name: product.name,
          price: product.price / 100,
          category: data.find((item) => item.id === product.category?.id),
          offer: product.offer,
        })
      }
    }

    loadCategories().catch(() => toast.error('Erro ao carregar categorias'))
  }, [isEditing, product, reset])

  const onSubmit = async (formData) => {
    // o preço é digitado em reais e vai para a API em centavos
    const body = new FormData()
    body.append('name', formData.name)
    body.append('price', String(Math.round(formData.price * 100)))
    body.append('category_id', String(formData.category.id))
    body.append('offer', String(Boolean(formData.offer)))
    if (formData.file?.[0]) body.append('file', formData.file[0])

    try {
      if (isEditing) {
        await api.put(`/products/${product.id}`, body)
        toast.success('Produto atualizado!')
      } else {
        await api.post('/products', body)
        toast.success('Produto criado!')
      }
      setTimeout(() => navigate(paths.adminProducts), 1200)
    } catch {
      toast.error('Não foi possível salvar o produto')
    }
  }

  return (
    <>
      <PageTitle>{isEditing ? 'Editar produto' : 'Novo produto'}</PageTitle>

      <FormBox onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>
          Nome
          <input type="text" {...register('name')} />
          <span className="error">{errors.name?.message}</span>
        </label>

        <label>
          Preço (R$)
          <input type="number" step="0.01" {...register('price')} />
          <span className="error">{errors.price?.message}</span>
        </label>

        <label className="upload">
          📷 {fileName || (isEditing ? 'Trocar imagem (opcional)' : 'Escolher imagem')}
          <input
            type="file"
            accept="image/png, image/jpeg"
            {...register('file', {
              onChange: (event) => setFileName(event.target.files?.[0]?.name),
            })}
          />
        </label>
        <span className="error">{errors.file?.message}</span>

        <label>
          Categoria
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => String(category.id)}
                placeholder="Escolha a categoria"
              />
            )}
          />
          <span className="error">{errors.category?.message}</span>
        </label>

        <label className="check">
          <input type="checkbox" {...register('offer')} />
          Produto em oferta
        </label>

        <Button type="submit" disabled={isSubmitting}>
          {isEditing ? 'Salvar alterações' : 'Adicionar produto'}
        </Button>
      </FormBox>
    </>
  )
}
