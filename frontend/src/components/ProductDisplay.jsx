import React, { useMemo, useState } from 'react'
import axios from 'axios'
import { CustomButton } from '../reusableComponents/CustomButton'
import { CustomInput } from '../reusableComponents/CustomInput'
import CategoryScroller from './CategoryScroller'
import ProductTableSection from './ProductTableSection'

const initialDraft = {
  name: '',
  description: '',
  price: '',
  brand: '',
  discountedPrice: '',
  taxIncluded: '',
  startDate: '',
  endDate: '',
  stockQuantity: '',
  stockStatus: '',
  unlimited: false,
  featured: false,
  category: '',
  productTag: '',
  sizeType: '',
  sizes: [],
}

const apparelSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']
const footwearSizes = ['5', '6', '7', '8', '9', '10', '11', '12']
const sizeAwareCategories = new Map([
  ['Fashion', 'apparel'],
  ['Clothing', 'apparel'],
  ['Socks & Gloves', 'apparel'],
  ['Shoes', 'footwear'],
  ['Sports', 'apparel'],
])

const FieldShell = ({ title, children, className = '' }) => (
  <div className={`space-y-2.5 ${className}`}>
    <label className='text-[15px] font-semibold tracking-tight text-[#0f4b4d]'>{title}</label>
    {children}
  </div>
)

const SectionCard = ({ title, children, className = '' }) => (
  <section className={`rounded-[18px] border border-[#edf0f3] bg-white p-4 shadow-none ${className}`}>
    <h2 className='text-[22px] font-semibold tracking-tight text-slate-900'>{title}</h2>
    <div className='mt-4'>{children}</div>
  </section>
)

const ChipButton = ({ active, children, ...props }) => (
  <button
    type='button'
    {...props}
    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${active ? 'border-[#53b26f] bg-[#ecf8f0] text-[#1f7a46]' : 'border-[#dbe2e8] bg-white text-[#0f4b4d] hover:bg-slate-50'}`}
  >
    {children}
  </button>
)

const ProductDisplay = () => {
  const [isCreateMode, setIsCreateMode] = useState(false)
  const [draft, setDraft] = useState(initialDraft)
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [subImagePreviews, setSubImagePreviews] = useState([])
  const [publishState, setPublishState] = useState({ loading: false, error: '', success: '' })

  const categoryOptions = useMemo(
    () => [
      'Electronics',
      'Smart Gadgets',
      'Mobile Phones',
      'Laptops',
      'Tablets',
      'Accessories',
      'Fashion',
      'Clothing',
      'Socks & Gloves',
      'Shoes',
      'Bags & Wallets',
      'Beauty & Personal Care',
      'Health & Wellness',
      'Home & Kitchen',
      'Furniture',
      'Appliances',
      'Sports',
      'Outdoor & Travel',
      'Toys & Games',
      'Books',
      'Groceries',
      'Automotive',
      'Jewelry & Watches',
      'Baby Products',
      'Pet Supplies',
      'Stationery',
    ],
    [],
  )

  const tagOptions = useMemo(
    () => ['New Arrival', 'Best Seller', 'Trending', 'Limited Offer'],
    [],
  )

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target

    if (type === 'checkbox') {
      setDraft((current) => ({ ...current, [name]: checked }))
      return
    }

    if (type === 'file') {
      const selectedFiles = Array.from(files || [])
      if (name === 'thumbnailFile') {
        const file = selectedFiles[0]
        if (file) {
          setDraft((current) => ({ ...current, thumbnailFile: file }))
          setThumbnailPreview(URL.createObjectURL(file))
        }
        return
      }

      if (name === 'subImageFiles' && selectedFiles.length > 0) {
        setDraft((current) => ({
          ...current,
          subImageFiles: [...(current.subImageFiles || []), ...selectedFiles],
        }))
        setSubImagePreviews((current) => [...current, ...selectedFiles.map((file) => URL.createObjectURL(file))])
      }
      return
    }

    setDraft((current) => ({ ...current, [name]: value }))
  }

  const handleOpenCreate = () => setIsCreateMode(true)
  const handleCloseCreate = () => setIsCreateMode(false)

  const handleCategoryChange = (event) => {
    const category = event.target.value
    const sizeType = sizeAwareCategories.get(category) || ''

    setDraft((current) => ({
      ...current,
      category,
      sizeType,
      sizes: [],
    }))
  }

  const toggleSize = (size) => {
    setDraft((current) => {
      const sizes = current.sizes || []
      const nextSizes = sizes.includes(size) ? sizes.filter((item) => item !== size) : [...sizes, size]

      return { ...current, sizes: nextSizes }
    })
  }

  const removeSubImage = (removeIndex) => {
    setDraft((current) => ({
      ...current,
      subImageFiles: (current.subImageFiles || []).filter((_, index) => index !== removeIndex),
    }))
    setSubImagePreviews((current) => current.filter((_, index) => index !== removeIndex))
  }

  const handlePublish = async () => {
    setPublishState({ loading: true, error: '', success: '' })

    try {
      if (!draft.thumbnailFile) {
        throw new Error('Please choose a thumbnail image')
      }

      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Please sign in again before creating a product')
      }

      const formData = new FormData()
      formData.append('name', draft.name)
      formData.append('brand', draft.brand)
      formData.append('category', draft.category)
      formData.append('description', draft.description)
      formData.append('price', Number.parseFloat(String(draft.price).replace(/[^0-9.]/g, '')) || 0)
      formData.append('countInStock', draft.unlimited ? 0 : Number.parseInt(draft.stockQuantity, 10) || 0)
      formData.append('rating', 0)
      formData.append('numReviews', 0)
      formData.append('discountedPrice', Number.parseFloat(String(draft.discountedPrice).replace(/[^0-9.]/g, '')) || 0)
      formData.append('taxIncluded', draft.taxIncluded)
      formData.append('startDate', draft.startDate)
      formData.append('endDate', draft.endDate)
      formData.append('stockStatus', draft.stockStatus)
      formData.append('unlimited', String(draft.unlimited))
      formData.append('featured', String(draft.featured))
      formData.append('sizeType', draft.sizeType)
      formData.append('sizes', JSON.stringify(draft.sizes || []))
      formData.append('productType', draft.productTag)
      formData.append('images', draft.thumbnailFile)
      ;(draft.subImageFiles || []).forEach((file) => {
        formData.append('images', file)
      })

      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      setPublishState({ loading: false, error: '', success: `Product created: ${response.data?.name || 'successfully'}` })
      setIsCreateMode(false)
    } catch (error) {
      setPublishState({
        loading: false,
        error: error.response?.data?.message || error.message || 'Failed to create product',
        success: '',
      })
    }
  }

  if (isCreateMode) {
    return (
      <div className='min-h-[calc(100vh-2rem)] w-full bg-[#eef0ed] p-4 text-slate-900'>
        <div className='mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[1260px] flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.04)]'>
          <div className='flex items-center justify-between border-b border-slate-100 px-6 py-5'>
            <div>
              <p className='text-sm text-slate-500'>Add Product</p>
              <h1 className='mt-1 text-xl font-semibold text-slate-900'>Add New Product</h1>
            </div>

            <div className='flex items-center gap-3'>
              <CustomButton
                title='Save to draft'
                bgcolor='white'
                textcolor='black'
                border='border'
                borderColor='gray-300'
                height={2}
                width={4}
                clickEvent={handleCloseCreate}
                icon={<i className='fa-regular fa-floppy-disk' aria-hidden='true' />}
              />

              <CustomButton
                title='Publish Product'
                bgcolor='green-500'
                textcolor='white'
                border='border'
                borderColor='green-500'
                height={2}
                width={4}
                clickEvent={handlePublish}
                icon={<i className='fa-solid fa-bag-shopping' aria-hidden='true' />}
              />
            </div>
          </div>

          <div className='flex-1 overflow-auto px-5 py-5'>
            <div className='grid gap-4 xl:grid-cols-[1.08fr_0.92fr]'>
              <div className='space-y-4'>
                <SectionCard title='Basic Details'>
                  <div className='space-y-5'>
                    <CustomInput label='Product Name' name='name' value={draft.name} onChange={handleChange} placeholder='Enter product name' />
                    <CustomInput
                      label='Product Description'
                      as='textarea'
                      name='description'
                      value={draft.description}
                      onChange={handleChange}
                      placeholder='Write the product story and key details here.'
                      inputClassName='min-h-[160px] px-4 py-3.5 leading-6 bg-[#fbfcfd]'
                    />
                  </div>
                </SectionCard>

                <SectionCard title='Pricing'>
                  <div className='space-y-4'>
                    <FieldShell title='Product Price'>
                      <div className='flex h-12 items-center overflow-hidden rounded-[12px] border border-[#dbe2e8] bg-white'>
                        <CustomInput
                          name='price'
                          value={draft.price}
                          onChange={handleChange}
                          placeholder='$0.00'
                          inputClassName='h-full rounded-none border-0 px-4 focus:ring-0'
                        />
                        <div className='flex h-full items-center gap-2 border-l border-[#dbe2e8] px-3 text-sm font-medium text-[#0f4b4d]'>
                          <span>USD</span>
                          <i className='fa-solid fa-caret-down text-[11px] text-slate-500' aria-hidden='true' />
                        </div>
                      </div>
                    </FieldShell>

                    <div className='grid gap-4 md:grid-cols-2'>
                      <CustomInput label='Discounted Price (Optional)' name='discountedPrice' value={draft.discountedPrice} onChange={handleChange} placeholder='$0.00' />
                      <FieldShell title='Tax Included'>
                        <div className='flex h-12 items-center gap-5 rounded-[12px] border border-[#dbe2e8] bg-white px-3'>
                          <label className='flex items-center gap-2 text-[14px] text-[#0f4b4d]'>
                            <input type='radio' name='taxIncluded' value='yes' checked={draft.taxIncluded === 'yes'} onChange={handleChange} className='accent-orange-500' />
                            Yes
                          </label>
                          <label className='flex items-center gap-2 text-[14px] text-[#0f4b4d]'>
                            <input type='radio' name='taxIncluded' value='no' checked={draft.taxIncluded === 'no'} onChange={handleChange} className='accent-orange-500' />
                            No
                          </label>
                        </div>
                      </FieldShell>
                    </div>

                    <div className='grid gap-4 md:grid-cols-2'>
                      <CustomInput label='Expiration' name='startDate' value={draft.startDate} onChange={handleChange} type='date' placeholder='Start' />
                      <CustomInput label='' name='endDate' value={draft.endDate} onChange={handleChange} type='date' placeholder='End' inputClassName='mt-8' />
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title='Inventory'>
                  <div className='space-y-4'>
                    <div className='grid gap-4 md:grid-cols-2'>
                      <CustomInput label='Stock Quantity' name='stockQuantity' value={draft.stockQuantity} onChange={handleChange} placeholder='Unlimited' />
                      <CustomInput label='Stock Status' as='select' name='stockStatus' value={draft.stockStatus} onChange={handleChange}>
                        <option value=''>Select stock status</option>
                        <option>In Stock</option>
                        <option>Low Stock</option>
                        <option>Out of Stock</option>
                      </CustomInput>
                    </div>

                    <label className='flex items-center gap-3 text-[14px] text-[#0f4b4d]'>
                      <input name='unlimited' checked={draft.unlimited} onChange={handleChange} type='checkbox' className='h-5 w-5 rounded border-slate-300 text-green-500 focus:ring-green-500' />
                      Unlimited
                    </label>

                    <label className='flex items-center gap-3 text-[14px] text-[#0f4b4d]'>
                      <input name='featured' checked={draft.featured} onChange={handleChange} type='checkbox' className='h-5 w-5 rounded border-slate-300 text-green-500 focus:ring-green-500' />
                      Highlight this product in a featured section.
                    </label>

                    <div className='flex items-center justify-end gap-3 pt-2'>
                      <CustomButton
                        title='Save to draft'
                        bgcolor='white'
                        textcolor='black'
                        border='border'
                        borderColor='gray-300'
                        height={2}
                        width={4}
                        clickEvent={handleCloseCreate}
                        icon={<i className='fa-regular fa-floppy-disk' aria-hidden='true' />}
                      />
                      <CustomButton
                        title='Publish Product'
                        bgcolor='green-500'
                        textcolor='white'
                        border='border'
                        borderColor='green-500'
                        height={2}
                        width={4}
                        clickEvent={handlePublish}
                        icon={<i className='fa-solid fa-bag-shopping' aria-hidden='true' />}
                      />
                    </div>
                  </div>
                </SectionCard>
              </div>

              <div className='space-y-6'>
                <SectionCard title='Upload Product Image'>
                  <div className='space-y-4'>
                    <div className='rounded-[18px] border border-[#dbe2e8] bg-white p-4'>
                      <h3 className='text-[15px] font-semibold tracking-tight text-[#0f4b4d]'>Product Image</h3>

                      <div className='mt-3 flex min-h-[280px] items-center justify-center overflow-hidden rounded-[14px] border border-[#dbe2e8] bg-white p-3'>
                        {thumbnailPreview ? (
                          <img src={thumbnailPreview} alt='Selected thumbnail preview' className='max-h-[240px] w-auto object-contain' />
                        ) : (
                          <div className='flex flex-col items-center gap-2 text-center text-slate-500'>
                            <i className='fa-regular fa-image text-4xl' aria-hidden='true' />
                            <p className='text-sm font-medium text-slate-700'>Add thumbnail image</p>
                            <p className='text-xs text-slate-500'>This will be the main product image</p>
                          </div>
                        )}
                      </div>

                      <div className='mt-4 flex items-center justify-between gap-3'>
                        <input id='thumbnail-file' name='thumbnailFile' type='file' accept='image/*' onChange={handleChange} className='hidden' />
                        <CustomButton
                          title='Browse'
                          bgcolor='white'
                          textcolor='black'
                          border='border'
                          borderColor='gray-300'
                          height={2}
                          width={4}
                          clickEvent={() => document.getElementById('thumbnail-file')?.click()}
                          icon={<i className='fa-solid fa-image' aria-hidden='true' />}
                        />

                        <CustomButton
                          title='Replace'
                          bgcolor='white'
                          textcolor='black'
                          border='border'
                          borderColor='gray-300'
                          height={2}
                          width={4}
                          clickEvent={() => document.getElementById('thumbnail-file')?.click()}
                          icon={<i className='fa-solid fa-rotate-right' aria-hidden='true' />}
                        />
                      </div>

                      <div className='mt-4 flex flex-wrap gap-3'>
                        {subImagePreviews.map((preview, index) => (
                          <div key={`${preview}-${index}`} className='relative flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-[12px] border border-[#dbe2e8] bg-white p-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)]'>
                            <button
                              type='button'
                              onClick={() => removeSubImage(index)}
                              className='absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50'
                              aria-label={`Remove sub image ${index + 1}`}
                            >
                              <i className='fa-solid fa-xmark text-[11px]' aria-hidden='true' />
                            </button>
                            <img src={preview} alt={`Sub image preview ${index + 1}`} className='h-full w-full object-contain' />
                          </div>
                        ))}

                        <input id='sub-image-files' name='subImageFiles' type='file' accept='image/*' multiple onChange={handleChange} className='hidden' />
                        <CustomButton
                          title='Add Image'
                          bgcolor='white'
                          textcolor='green-600'
                          border='border'
                          borderColor='green-500'
                          height={6}
                          width={7}
                          clickEvent={() => document.getElementById('sub-image-files')?.click()}
                          icon={<i className='fa-solid fa-circle-plus' aria-hidden='true' />}
                        />
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title='Categories'>
                  <div className='space-y-4'>
                    <CustomInput label='Brand' name='brand' value={draft.brand} onChange={handleChange} placeholder='Apple, Nike, Samsung' />

                    <CustomInput label='Product Categories' as='select' name='category' value={draft.category} onChange={handleCategoryChange}>
                        <option value=''>Select product category</option>
                        {categoryOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                    </CustomInput>

                    <CustomInput label='Product Tag' as='select' name='productTag' value={draft.productTag} onChange={handleChange}>
                        <option value=''>Select tag</option>
                        {tagOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                    </CustomInput>

                    {draft.sizeType ? (
                      <FieldShell title={draft.sizeType === 'footwear' ? 'Shoe Sizes' : 'Product Sizes'}>
                        <div className='flex flex-wrap gap-3'>
                          {(draft.sizeType === 'footwear' ? footwearSizes : apparelSizes).map((size) => (
                            <ChipButton key={size} active={(draft.sizes || []).includes(size)} onClick={() => toggleSize(size)}>
                              {size}
                            </ChipButton>
                          ))}
                        </div>
                      </FieldShell>
                    ) : null}
                  </div>
                </SectionCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='mt-5 flex h-full w-full flex-col gap-4'>
      {publishState.error ? <div className='rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>{publishState.error}</div> : null}
      {publishState.success ? <div className='rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700'>{publishState.success}</div> : null}
      <div className='flex w-full items-center justify-between gap-4'>
        <div>
          <h1 className='text-xl font-medium text-slate-900'>Discover</h1>
          <p className='mt-1 text-sm text-slate-500'>Browse categories and manage the product catalog.</p>
        </div>

        <div className='flex items-center gap-3'>
          <CustomButton clickEvent={handleOpenCreate} type='add' bgcolor='orange-500' title='Add product' height={4} />
          <CustomButton type='add' textcolor='black' bgcolor='white' border='border' height={4} borderColor='gray-300' title='More Action' />
        </div>
      </div>

      <div className='w-full'>
        <CategoryScroller />
      </div>

      <div className='w-full'>
        <ProductTableSection />
      </div>
    </div>
  )
}

export default ProductDisplay
