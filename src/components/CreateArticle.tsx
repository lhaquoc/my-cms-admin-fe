import { TextareaAutosize, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import React, { useState } from 'react'

interface IArticleForm {
  title: string
  content: string
  description: string
  images: File[]
  category: string
  slug: string
  id: string
}

const CreateArticle: React.FC = () => {
  const [category, setCategory] = React.useState('')
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IArticleForm>({
    defaultValues: { images: [] }
  })
  const onSubmit = (data: IArticleForm) => {
    alert(JSON.stringify(data))
    // Convert FileList to an array of files for easier manipulation
    const files = Array.from(data.images)

    // Process or upload the files
    console.log('Files to upload:', files)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const imageFiles = Array.from(files)
      const newPreviews = imageFiles.map((file) => URL.createObjectURL(file))
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews])
    }
  }

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index))
  }

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <TextField
        fullWidth
        sx={{ maxWidth: 600 }}
        label='title'
        {...register('title', {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i
        })}
      />
      {errors?.title?.type === 'required' && <p>This field is required</p>}
      {errors?.title?.type === 'maxLength' && <p>First name cannot exceed 20 characters</p>}
      {errors?.title?.type === 'pattern' && <p>Alphabetical characters only</p>}
      <label>Content</label>
      <TextareaAutosize
        aria-label='content'
        {...register('content', {
          required: true,
          maxLength: 1200,
          pattern: /^[A-Za-z]+$/i
        })}
      />
      <br />
      <TextField
        fullWidth
        sx={{ maxWidth: 600 }}
        label='description'
        {...register('description', {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i
        })}
      />

      <InputLabel id='demo-simple-select-label'>Category</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={category}
        label='Category'
        onChange={handleChange}
      >
        <MenuItem value={'technology'}>Technology</MenuItem>
        <MenuItem value={'programming'}>Programming</MenuItem>
        <MenuItem value={'website'}>Website</MenuItem>
      </Select>

      <TextField
        fullWidth
        sx={{ maxWidth: 600 }}
        label='slug'
        {...register('slug', {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i
        })}
      />
      <input
        type='file'
        id='files'
        multiple
        {...register('images', { required: 'Files are required' })}
        onChange={handleImageChange}
      />
      {errors.images && <p>{errors.images.message}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
        {imagePreviews.map((preview, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img
              src={preview}
              alt={`preview-${index}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <button
              type='button'
              onClick={() => handleRemoveImage(index)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                padding: '2px'
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <Button
        type='submit'
        variant='contained'
        fullWidth
        sx={{
          maxWidth: '600px',
          padding: '10px',
          backgroundColor: '#67BE23',
          color: 'white',
          marginTop: '5px'
        }}
      >
        Submit
      </Button>
    </form>
  )
}

export default CreateArticle
